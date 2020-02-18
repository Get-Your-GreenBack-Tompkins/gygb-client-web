import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import data from '../questions.json';

interface Props extends RouteComponentProps {
  questionNum: number;
  setQuestionNum: Function;
  numCorrect: number;
  setNumCorrect: Function;
}

const generateContinueButton = (questionNum: number, setQuestionNum: Function, numCorrect: number, setNumCorrect: Function) => {
  const total = Object.keys(data).length;
  if (questionNum === total) {
    return (
      <IonButton onClick={() => { setNumCorrect(numCorrect + 1); }} color="medium" routerLink="/quiz/end">Continue</IonButton>
      );
  } else {
    return (
    <IonButton onClick={() => { setQuestionNum(questionNum + 1); setNumCorrect(numCorrect + 1); }} routerLink="/quiz/question">Continue</IonButton>
    );
  }
}

const Correct: React.FC<Props> = ({ questionNum, setQuestionNum, numCorrect, setNumCorrect }) => {
  const val = (data as any)[questionNum];
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle size="large" class="title">Correct!</IonTitle>
          <IonTitle class="subtitle">{val.correct_text}!</IonTitle>
          {generateContinueButton(questionNum, setQuestionNum, numCorrect, setNumCorrect)}
        </IonToolbar>
      </IonContent>
    </IonPage >
  );
};

export default Correct;