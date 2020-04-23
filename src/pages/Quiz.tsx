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
import Logo from "../assets/logo.svg";
import Homelines from "../assets/homelines.svg";

interface Props extends RouteComponentProps {
  quiz: any;
}

const Quiz: React.FC<Props> = ({ quiz }) => {
  return (
    <IonPage>
        <IonGrid className="welcome-content">
        
          <IonRow>
            <IonImg className="home-lines" src={Homelines}></IonImg>
          </IonRow>

          <IonRow>
            <IonImg className="logo" src={Logo} alt="Powerhouse"></IonImg>
            <h1 className="subtitle">{quiz && quiz.name}</h1>
          </IonRow>

          <IonRow>
            <IonButton size="large" className="welcome-button" routerLink="/quiz/question">welcome</IonButton>
          </IonRow>

        </IonGrid>
    </IonPage>
  );
};

export default Quiz;
