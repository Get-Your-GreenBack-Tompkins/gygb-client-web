import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import data from '../questions.json';

interface Props extends RouteComponentProps {
  questionNum: number;
  setQuestionNum: Function;
}

const end = (questionNum: number) => {
  const total = Object.keys(data).length;
  if (questionNum === total) {
    return "/quiz/end";
  }
  else {
    return "/quiz/question";
  }
}

const Incorrect: React.FC<Props> = ({ questionNum, setQuestionNum }) => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle size="large" class="title">Whoops!</IonTitle>
          <IonTitle class="subtitle">That isn't quite right...</IonTitle>
          <IonButton color="medium" onClick={() => setQuestionNum(questionNum + 1)} routerLink={end(questionNum)}>Skip</IonButton>
          <IonButton routerLink="/quiz/question">Try Again</IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Incorrect;