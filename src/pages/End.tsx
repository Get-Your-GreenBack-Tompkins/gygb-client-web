import React from "react";

import { IonPage, IonContent, IonButton, IonImg, IonCol, IonRow, IonGrid } from "@ionic/react";
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

const End: React.FC<Props> = ({ raffle, history }) => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonGrid className="center-grid">
          <IonRow>
            <IonCol size="12">
              <h1 className="end-title">Success!</h1>
            </IonCol>
            <IonCol>
              <h3 className="end-sub">{subtitle(raffle)}</h3>
            </IonCol>
            <IonCol size="12">
              <IonImg className="end-img" src={Checkmark}></IonImg>
            </IonCol>
            <IonCol size="12">
              <IonButton
                className="end-button"
                onClick={() => {
                  history.replace("/quiz");
                }}
              >
                Try Again
              </IonButton>
            </IonCol>
            <IonCol size="12">
              <IonButton className="end-button" href="tinypowerhouse.org">
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
