import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps<{
  num: string;
}> { }

const Incorrect: React.FC<Props> = ({ match }) => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle size="large" class="title">Whoops!</IonTitle>
          <IonTitle class="subtitle">That isn't quite right...</IonTitle>
          <IonButton routerLink={`/quiz/question/${match.params.num}`}>Try Again</IonButton><br />
          <IonButton routerLink={`/quiz/question/${parseInt(match.params.num) + 1}`}>Skip</IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Incorrect;