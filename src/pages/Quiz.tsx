import React from "react";
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

interface Props extends RouteComponentProps {
  quiz: any;
}

const Quiz: React.FC<Props> = ({ quiz }) => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonGrid className="welcome-content">
          <IonRow>
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
