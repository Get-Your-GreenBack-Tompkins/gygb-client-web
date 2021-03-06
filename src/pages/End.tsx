import React from "react";

import { IonPage, IonContent, IonButton, IonImg, IonCol, IonRow, IonGrid } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import Checkmark from "../assets/checkMark.svg";

interface Props extends RouteComponentProps {
  raffle: boolean;
  setStarted: (started: boolean) => void;
}

const subtitle = (raffle: boolean) => {
  if (raffle) {
    return "Raffle drawings are done once a month at the end of each month, and winners are notified over email.";
  } else {
    return "You’ll get periodic updates on amazing new green technologies you can use for your home!";
  }
};

const End: React.FC<Props> = ({ raffle, history, setStarted }) => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonGrid className="center-grid">
          <IonRow>
            <IonCol size="12">
              <h1 className="end-title">Success!</h1>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <IonImg className="end-img" src={Checkmark}></IonImg>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <h3 className="end-sub">{subtitle(raffle)}</h3>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <IonButton
                size="large"
                color="medium"
                className="end-button"
                onClick={() => {
                  setStarted(false);
                  history.replace("/quiz");
                }}
              >
                Restart Quiz
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton size="large" className="end-button" href="https://tinypowerhouse.org">
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
