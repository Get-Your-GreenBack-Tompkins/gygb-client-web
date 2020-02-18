import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import data from '../questions.json';

interface Props extends RouteComponentProps {
  questionNum: number;
  setQuestionNum: Function;
}

const generateSkipButton = (questionNum: number, setQuestionNum: Function) => {
  const total = Object.keys(data).length;
  if (questionNum === total) {
    return (
      <IonButton color="medium" routerLink="/quiz/end">Skip</IonButton>
      );
  } else {
    return (
    <IonButton color="medium" onClick={() => setQuestionNum(questionNum + 1)} routerLink="/quiz/question">Skip</IonButton>
    );
  }
}

const Incorrect: React.FC<Props> = ({ questionNum, setQuestionNum }) => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle size="large" class="title">Whoops!</IonTitle>
          <IonTitle class="subtitle">That isn't quite right...</IonTitle>
          {generateSkipButton(questionNum, setQuestionNum)}
          <IonButton routerLink="/quiz/question">Try Again</IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Incorrect;