import { IonPage, IonButton, IonContent, IonToolbar, IonTitle, IonRow, IonCol } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import api from "../api";
import React, { useEffect, useState } from "react";

interface Props extends RouteComponentProps {
  quiz: any;
}

const Quiz: React.FC<Props> = ({ quiz }) => {
  const sendGetTutorialRequest = () => {
    return api.get(
      `/quiz/${quiz.id}/tutorial`
    );
  };

  const [header, setHeader] = useState();
  const [body, setBody] = useState();
  const [totalQuestions, setTotalQuestions] = useState();

  useEffect(() => {
    sendGetTutorialRequest().then(res => {
      setHeader(res.data.header);
      setBody(res.data.body);
      setTotalQuestions(res.data.totalQuestions);
    });
  }, [quiz]);

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonCol size="12" size-sm>
            <div>
              <b>{header}</b>
            </div>
          </IonCol>
          <IonCol size="12" size-sm>
            <div>
              <b>{body}</b>
            </div>
          </IonCol>
          <IonCol size="12" size-sm>
            <div>
              <b>Complete {(String)((Number)(totalQuestions) * 0.6)} out {totalQuestions} questions to win FLIR camera</b>
            </div>
          </IonCol>
          <IonTitle class="title">{quiz && quiz.name}</IonTitle>
          <IonButton routerLink="/quiz/question">Start Quiz</IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Quiz;
