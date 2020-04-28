import React, { useEffect, useState } from "react";
import { IonPage, IonButton, IonContent, IonRow, IonGrid, IonCol } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import api from "../api";

interface Props extends RouteComponentProps {
  quiz: any;
}

const sendGetTutorialRequest = (quiz: any) => {
  return api.get(`/quiz/${quiz.id}/tutorial`);
};

const sendGetRaffleRequest = (quiz: any) => {
  return api.get(`/quiz/${quiz.id}/raffle`);
};

const Quiz: React.FC<Props> = ({ quiz }) => {

  const [header, setHeader] = useState();
  const [body, setBody] = useState();
  const [totalQuestions, setTotalQuestions] = useState();
  const [questionRequirement, setQuestionRequirement] = useState();
  const [prize, setPrize] = useState();

  useEffect(() => {
    sendGetTutorialRequest(quiz).then(res => {
      setHeader(res.data.header);
      setBody(res.data.body);
      setTotalQuestions(res.data.totalQuestions);
    });
  }, [quiz]);

  useEffect(() => {
    sendGetRaffleRequest(quiz).then(res => {
      setQuestionRequirement(res.data.questionRequirement);
      setPrize(res.data.prize);
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
              <b>
                Complete {questionRequirement} out {totalQuestions} questions to win {prize}
              </b>
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
      </IonContent>
    </IonPage>
  );
};

export default Quiz;
