import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {
  questionNum: number;
  setQuestionNum: Function;
  numCorrect: number;
  setNumCorrect: Function;
  quiz: any;
  answer: string;
}

const generateContinueButton = (questionNum: number, setQuestionNum: Function, numCorrect: number, setNumCorrect: Function, quiz: any) => {
  const total = quiz && quiz.questions.length;
  console.log(total);
  if (questionNum === total) {
    return (
      <IonButton onClick={() => { setNumCorrect(numCorrect + 1); }} routerLink="/quiz/end">Continue</IonButton>
    );
  } else {
    return (
      <IonButton onClick={() => { setQuestionNum(questionNum + 1); setNumCorrect(numCorrect + 1); }} routerLink="/quiz/question">Continue</IonButton>
    );
  }
}

const Correct: React.FC<Props> = ({ questionNum, setQuestionNum, numCorrect, setNumCorrect, quiz, answer }) => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle size="large" class="title">Correct!</IonTitle>
          <IonTitle class="subtitle">{answer}!</IonTitle>
          {generateContinueButton(questionNum, setQuestionNum, numCorrect, setNumCorrect, quiz)}
        </IonToolbar>
      </IonContent>
    </IonPage >
  );
};

export default Correct;