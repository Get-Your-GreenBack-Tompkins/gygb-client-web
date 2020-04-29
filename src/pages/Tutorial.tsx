import React, { useEffect, useState } from "react";
import { IonPage, IonButton, IonContent, IonImg, IonRow, IonGrid, IonCol } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import api from "../api";
import TutorialLines from "../assets/tLines.svg";

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
        <IonGrid>
          <IonRow className = "tutorial-info ion-align-items-start">
            <IonCol size="12" size-sm>
              <h1 className="tutorial-title"> Thanks for coming!</h1>
            </IonCol>
            <IonCol size="12">
              <p>Test your knowledge of how to make your home more energy efficient, pollution free and comfortable--and save money.</p>
            </IonCol>
            <IonCol size="12" className ="tutorial-emphasis">
              <p>Find the answers in the Powerhouse!</p>
            </IonCol>
            <IonCol size="12">
              <p> Get {String(Number(totalQuestions) * 0.6)} out of {totalQuestions} questions and you could win a..</p>
            </IonCol>
            <IonCol className ="tutorial-emphasis prize" size="12" size-sm>
              {/* <p>{quiz.raffle.prize}</p>*/}<p>Lux Geo Thermostat</p> 
            </IonCol>
            <IonCol size="12" className = "small" size-sm>
              <p> Drawings are done monthly</p>
            </IonCol>
            
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton size="large" className="correct-button" routerLink="/quiz/question">
                Start Quiz
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Quiz;
