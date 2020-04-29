import React from "react";

import { IonPage, IonButton, IonContent, IonImg, IonGrid, IonRow, IonCol } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import GreenLines from "../assets/greenLines.svg";

import "../theme/style.scss";

interface Props extends RouteComponentProps {
  questionNum: number;
  setQuestionNum: Function;
  quiz: any;
  answer: number;
  answerIDs: Array<number>;
  setAnswerIDs: Function;
}

const generateContinueButton = (
  questionNum: number,
  setQuestionNum: Function,
  quiz: any,
  answer: number,
  answerIDs: Array<number>,
  setAnswerIDs: Function
) => {
  const total = quiz && quiz.questions.length;
  console.log(total);
  if (questionNum === total) {
    return (
      <IonButton
        size="large"
        className="correct-button"
        onClick={() => {
          setAnswerIDs(answerIDs.concat(answer));
        }}
        routerLink="/quiz/result"
      >
        Continue
      </IonButton>
    );
  } else {
    return (
      <IonButton
        size="large"
        className="correct-button"
        onClick={() => {
          setQuestionNum(questionNum + 1);
          setAnswerIDs(answerIDs.concat(answer));
        }}
        routerLink="/quiz/question"
      >
        Continue
      </IonButton>
    );
  }
};

const Correct: React.FC<Props> = ({ questionNum, setQuestionNum, quiz, answer, answerIDs, setAnswerIDs }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg className="grid-lines" src={GreenLines}></IonImg>
        <IonGrid className="line-grid">
          <IonRow>
            <IonCol size="12">
              <h1 className="title">Correct</h1>
              <p>
                Here we will insert the reasoning why this <b className="right">answer</b> is correct.{" "}
              </p>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol className="correct">
              {generateContinueButton(questionNum, setQuestionNum, quiz, answer, answerIDs, setAnswerIDs)}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Correct;
