import React from "react";
import { IonPage, IonButton, IonImg, IonRow, IonGrid, IonCol } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import Tutorial from "../assets/tutorial.svg";

interface Props extends RouteComponentProps {
  quiz: any;
}

const Quiz: React.FC<Props> = ({ quiz }) => {
  return (
    <IonPage>
      <IonGrid className="welcome-content">
        <IonRow>
          <IonCol>
            <IonImg className="tutorial-lines" src={Tutorial}></IonImg>
          </IonCol>
        </IonRow>

        <IonRow>
          <h1 className="subtitle">{quiz && quiz.name}</h1>
        </IonRow>

        <IonRow>
          <IonButton size="large" className="welcome-button" routerLink="/quiz/question">
            welcome
          </IonButton>
        </IonRow>

        <IonRow>{/* <IonImg className="home-lines-2" src={H2}></IonImg> */}</IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default Quiz;
