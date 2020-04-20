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
// import WelcomePath from "../assets/welcome-path.svg";
import Logo from "../assets/logo.svg";
import Try from "../assets/try.svg";

interface Props extends RouteComponentProps {
  quiz: any;
}

const Quiz: React.FC<Props> = ({ quiz }) => {
  return (
    <IonPage>
        
        <IonImg className="home-lines" src={Try}></IonImg>
        <IonImg className="logo" src={Logo}></IonImg>
        <IonButton size="large" className="welcome-button" routerLink="/quiz/question">
                WELCOME
              </IonButton>
     
       
        <IonGrid className="welcome-content">
          <IonRow>
            <IonCol>
              <h1 className="subtitle">{quiz && quiz.name}</h1>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
             
            </IonCol>
          </IonRow>
        </IonGrid>
    </IonPage>
  );
};

export default Quiz;
