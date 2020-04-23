import React from 'react';
import { 
  IonPage,
  IonButton,
  IonContent,
  IonToolbar,
  IonIcon,
  IonImg,
  IonGrid,
  IonRow,
  IonTitle } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import GreenLines from "../assets/greenLines.svg";
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
      <IonButton className = "correct-button" onClick={() => { setAnswerIDs(answerIDs.concat(answer)); }} routerLink="/quiz/end">Continue</IonButton>
    );
  } else {
    return (
      <IonButton className = "correct-button" onClick={() => { setQuestionNum(questionNum + 1); setAnswerIDs(answerIDs.concat(answer)); }} routerLink="/quiz/question">Continue</IonButton>
    );
  }
}

const Correct: React.FC<Props> = ({ questionNum, setQuestionNum, quiz, answer, answerIDs, setAnswerIDs }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonToolbar>
          <IonImg className="correctLines" src={GreenLines}></IonImg>
          <IonGrid>
            <IonRow>
              <h1 className="title">Correct</h1>
            </IonRow>
            <IonRow>
              <p>Here we will insert the reasoning why this <b>answer</b> is correct. </p>
            </IonRow>
            <IonRow>
              {generateContinueButton(questionNum, setQuestionNum, quiz, answer, answerIDs, setAnswerIDs)}
            </IonRow>
          </IonGrid>
         
        </IonToolbar>
      </IonContent>
    </IonPage >
  );
};

export default Correct;