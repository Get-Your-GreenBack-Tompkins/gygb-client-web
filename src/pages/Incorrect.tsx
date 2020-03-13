import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {
  questionNum: number;
  setQuestionNum: Function;
  answer: number;
  quiz: any;
  answerIDs: Array<number>;
  setAnswerIDs: Function;
}

const generateSkipButton = (questionNum: number, setQuestionNum: Function, quiz: any, answer:number, answerIDs: Array<number>, setAnswerIDs: Function) => {
  const total = quiz && quiz.questions.length;
  if (questionNum === total) {
    return (
      <IonButton color="medium" onClick={() => setAnswerIDs(answerIDs.concat(answer))} routerLink="/quiz/end">Skip</IonButton>
    );
  } else {
    return (
    <IonButton color="medium" onClick={() => { setQuestionNum(questionNum + 1); setAnswerIDs(answerIDs.concat(answer)); }} routerLink="/quiz/question">Skip</IonButton>
    );
  }
}

const Incorrect: React.FC<Props> = ({ questionNum, setQuestionNum, answer, quiz, answerIDs, setAnswerIDs }) => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle size="large" class="title">Whoops!</IonTitle>
          {generateSkipButton(questionNum, setQuestionNum, quiz, answer, answerIDs, setAnswerIDs)}
          <IonButton routerLink="/quiz/question">Try Again</IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Incorrect;