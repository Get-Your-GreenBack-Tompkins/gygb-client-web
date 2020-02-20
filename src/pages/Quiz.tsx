import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {
  data: any;
}

const Quiz: React.FC<Props> = ({ data }) => {
  console.log("DATA");
  console.log(data);
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle class="title">{data.name}</IonTitle>
          <IonButton routerLink="/quiz/question">Start Quiz</IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage >
  );
};

export default Quiz;