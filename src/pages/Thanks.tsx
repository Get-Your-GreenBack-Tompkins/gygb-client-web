import React from 'react';
import { IonPage, IonContent, IonToolbar, IonTitle } from '@ionic/react';

const Thanks: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle size="large" class="title">Thank you for submitting!</IonTitle>
        </IonToolbar>
      </IonContent>
    </IonPage >
  );
};

export default Thanks;