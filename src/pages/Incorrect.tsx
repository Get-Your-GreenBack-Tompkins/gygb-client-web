import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle } from '@ionic/react';

const Incorrect: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle size="large" class="title">Whoops!</IonTitle>
          <IonTitle class="subtitle">That isn't quite right...</IonTitle>
          <IonButton routerLink="/quiz/question">Skip</IonButton><br />
          <IonButton routerLink="/quiz/question">Try Again</IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Incorrect;