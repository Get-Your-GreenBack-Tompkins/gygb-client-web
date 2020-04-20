import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle, IonImg } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import redLines from "../assets/redLines.svg";

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
      <IonButton class="skip" color="medium" onClick={() => setAnswerIDs(answerIDs.concat(answer))} routerLink="/quiz/end">Skip</IonButton>
    );
  } else {
    return (
    <IonButton class="skip" color="medium" onClick={() => { setQuestionNum(questionNum + 1); setAnswerIDs(answerIDs.concat(answer)); }} routerLink="/quiz/question">Skip</IonButton>
    );
  }
}

const Incorrect: React.FC<Props> = ({ questionNum, setQuestionNum, answer, quiz, answerIDs, setAnswerIDs }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonToolbar>
          <IonImg class="home-lines" src={redLines}></IonImg>
          <IonTitle size="large" class="title">NOT QUITE</IonTitle>
          <IonButton class ="skip" routerLink="/quiz/question">Try Again</IonButton>
          {generateSkipButton(questionNum, setQuestionNum, quiz, answer, answerIDs, setAnswerIDs)}
          
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Incorrect;