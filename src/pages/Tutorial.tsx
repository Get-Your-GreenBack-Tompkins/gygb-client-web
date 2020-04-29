import React, { useEffect, useState } from "react";
import { IonPage, IonButton, IonContent, IonRow, IonGrid, IonCol, IonImg } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import api from "../api";
import TutorialLines from "../assets/tLines.svg";

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
        <IonImg className="tutorial-lines" src={TutorialLines}></IonImg>
      <IonGrid className="welcome-content">
        <IonRow className = "tutorial-info ion-align-items-start">
            <IonCol className="tutorial-title" size="12" size-sm>
              <p>{header}</p>
            </IonCol>
            <IonCol size="12" size-sm>
              <p>{body}</p>
            </IonCol>
            <IonCol size="12" className ="tutorial-emphasis">
              <p>Find the answers in the Powerhouse!</p>
            </IonCol>
            <IonCol size="12" size-sm>
              <p>
                Complete {questionRequirement} out {totalQuestions} questions to win a
              </p>
            </IonCol>
            <IonCol className ="tutorial-emphasis prize" size="12" size-sm>
              <p>{prize}</p>
            </IonCol>
            <IonCol size="12" className = "small" size-sm>
              <p> Drawings are done monthly</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton size="large" className="welcome-button" routerLink="/quiz/question">
                Start Quiz! 
              </IonButton>
              {/* Correct button styling */}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Quiz;
