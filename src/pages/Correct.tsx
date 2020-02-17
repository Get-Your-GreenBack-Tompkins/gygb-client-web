import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import data from '../questions.json';

interface Props extends RouteComponentProps<{
  num: string;
}> { }

const Correct: React.FC<Props> = ({ match }) => {
  const val = (data as any)[match.params.num];
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle size="large" class="title">Correct!</IonTitle>
          <IonTitle class="subtitle">{val.correct_text}!</IonTitle>
          <IonButton routerLink={`/quiz/question/${parseInt(match.params.num) + 1}`}>Continue</IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Correct;