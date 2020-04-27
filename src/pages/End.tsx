import React from "react";

import { IonPage, IonContent, IonButton,IonImg, IonCol, IonRow, IonGrid } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import Checkmark from "../assets/checkMark.svg"; 

interface Props extends RouteComponentProps {
  raffle: boolean;
}

const subtitle = (raffle: boolean) => {
  if (raffle) {
    return "Raffle drawings are done once a month at the end of each month, and winners are notified over email.";
  } else {
    return "You’ll get periodic updates on amazing new green technologies you can use for your home!";
  }
};

const End: React.FC<Props> = ({ raffle }) => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonGrid className="center-grid">
          <IonRow>
            <IonCol size="12">
              <h1 className="title end-title">Success!</h1>
              <h3 className="subtitle">{subtitle(raffle)}</h3>
              </IonCol>
              <IonCol>
                <IonImg className ="end-img" src={Checkmark}></IonImg>
              <IonButton size="large" className="blue-button end-button" routerLink="/quiz">
                Try Again
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton size="large" className="blue-button end-button" href="tinypowerhouse.org">
                Return Home
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default End;
