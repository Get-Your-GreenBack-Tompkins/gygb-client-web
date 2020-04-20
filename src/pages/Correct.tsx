import React from 'react';
import { 
  IonPage,
  IonButton,
  IonContent,
  IonToolbar,
  IonIcon,
  IonImg,
  IonTitle } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import greenLines from "../assets/greenLines.svg";
import '../theme/style.scss'

interface Props extends RouteComponentProps {
  questionNum: number;
  setQuestionNum: Function;
  quiz: any;
  answer: number;
  answerIDs: Array<number>;
  setAnswerIDs: Function;
}

const generateContinueButton = (questionNum: number, setQuestionNum: Function, quiz: any, answer:number, answerIDs: Array<number>,
  setAnswerIDs: Function) => {
  const total = quiz && quiz.questions.length;
  console.log(total);
  if (questionNum === total) {
    return (
      <IonButton onClick={() => { setAnswerIDs(answerIDs.concat(answer)); }} routerLink="/quiz/end">Continue</IonButton>
    );
  } else {
    return (
      <IonButton onClick={() => { setQuestionNum(questionNum + 1); setAnswerIDs(answerIDs.concat(answer)); }} routerLink="/quiz/question">Continue</IonButton>
    );
  }
}

const Correct: React.FC<Props> = ({ questionNum, setQuestionNum, quiz, answer, answerIDs, setAnswerIDs }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonToolbar>
          <IonImg src={greenLines}></IonImg>
          <IonTitle size="large" class="title">Correct</IonTitle>
          {generateContinueButton(questionNum, setQuestionNum, quiz, answer, answerIDs, setAnswerIDs)}
        </IonToolbar>
      </IonContent>
    </IonPage >
  );
};

export default Correct;