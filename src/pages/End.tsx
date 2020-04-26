import React from "react";

import { IonPage, IonContent, IonButton, IonCol, IonRow, IonGrid } from "@ionic/react";
import { RouteComponentProps } from "react-router";

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
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <h1 className="title">Success!</h1>
              <h3 className="subtitle">{subtitle(raffle)}</h3>
              <IonButton className="blue-button" routerLink="/quiz">
                Try Again
              </IonButton>
            </IonCol>
            
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton className="blue-button" href="tinypowerhouse.org">
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
