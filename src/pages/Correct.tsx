import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle } from '@ionic/react';

const Correct: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle size="large" class="title">Correct!</IonTitle>
          <IonTitle class="subtitle">It does take a massive amount of woodchucks!</IonTitle>
          <IonButton routerLink="/quiz/question">Continue</IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Correct;