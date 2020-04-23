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
import H1 from "../assets/homelines.svg";
import H2 from "../assets/h1.svg";

interface Props extends RouteComponentProps {
  quiz: any;
}

const Quiz: React.FC<Props> = ({ quiz }) => {
  return (
    <IonPage>
     
        <IonImg className="home-lines home-lines-top" src={H1}></IonImg>
        <IonImg className="home-lines home-lines-bottom" src={H2}></IonImg> 

        <IonGrid className="welcome-content">
        
          <IonRow>
            <IonCol className ="col">
              <IonImg className="logo" src={Logo} alt="Powerhouse"></IonImg>
              <h1 className="subtitle">{quiz && quiz.name}</h1>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonButton size="large" className="start-button" routerLink="/quiz/question">enter quiz</IonButton>
            </IonRow>
          
        </IonGrid>
    </IonPage>
  );
};

export default Quiz;
