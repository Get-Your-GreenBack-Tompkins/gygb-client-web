import {
  IonPage,
  IonButton,
  IonContent,
  IonImg,
  IonRow,
  IonGrid,
  IonCol
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import WelcomePath from "../assets/welcome-path.svg";
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
        <IonGrid className="welcome-content">
          <IonRow>
            <IonCol size="12" size-sm>
                <b>{header}</b>
            </IonCol>
            <IonCol size="12" size-sm>
                <b>{body}</b>
            </IonCol>
            <IonCol size="12" size-sm>
                <b>Complete {(String)((Number)(totalQuestions) * 0.6)} out {totalQuestions} questions to win FLIR camera</b>
            </IonCol>
            <IonCol>
              <IonImg src="/assets/logo.png" />
              <h1 className="subtitle">{quiz && quiz.name}</h1>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton size="large" className="welcome-button" routerLink="/quiz/question">
                Start Quiz!
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonImg className="welcome-path" src={WelcomePath}></IonImg>
      </IonContent>
    </IonPage>
  );
};

export default Quiz;
