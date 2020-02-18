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

const end = (questionNum: number) => {
  console.log("CORRECT questionNum")
  console.log(questionNum);
  const total = Object.keys(data).length;
  console.log("TOTAL");
  console.log(total);
  if (questionNum === total) {
    console.log("EQUAL");
    return "/quiz/end";
  }
  else {
    console.log("NOT EQUAL");
    return "/quiz/question";
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
          <IonButton onClick={() => { setQuestionNum(questionNum + 1); setNumCorrect(numCorrect + 1); }} routerLink={end(questionNum)}>Continue</IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage >
  );
};

export default Correct;