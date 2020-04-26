import React, { useEffect, useState } from "react";
import { IonPage, IonButton, IonContent, IonImg, IonRow, IonGrid, IonCol } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import api from "../api";
import TutorialLines from "../assets/tL.svg";

interface Props extends RouteComponentProps {
  quiz: any;
}

const Quiz: React.FC<Props> = ({ quiz }) => {
  const sendGetTutorialRequest = () => {
    return api.get(`/quiz/${quiz.id}/tutorial`);
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
      <IonContent fullscreen>
        <IonImg className="tutorial-lines" src={TutorialLines}></IonImg>
        <IonGrid className="welcome-content">
          <IonRow className = "tutorial-info">
            <IonCol size="12" size-sm>
              <h1> Thanks for coming!</h1>
            </IonCol>
            <IonCol size="12" size-sm>
              <p>Test your knowledge of how to make your home more energy efficient, pollution free and comfortable--and save money.</p>
              <b>Find the answers in the Powerhouse!</b>
            </IonCol>
            <IonCol size="12" size-sm>
              <p> Get {String(Number(totalQuestions) * 0.6)} out of {totalQuestions} questions and you could win a..</p>
            </IonCol>
            <IonCol size="12" size-sm>
              <b> A Lux Geo Thermostat</b>
            </IonCol>
            <IonCol size="12" size-sm>
              <p className = "small"> Drawings are done monthly</p>
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
