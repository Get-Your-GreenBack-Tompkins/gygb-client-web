import React from "react";

import { IonPage, IonButton, IonContent, IonImg, IonGrid, IonRow, IonCol } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import RedLines from "../assets/redLines.svg";

interface Props extends RouteComponentProps {
  questionNum: number;
  setQuestionNum: Function;
  answer: number;
  quiz: any;
  answerIDs: Array<number>;
  setAnswerIDs: Function;
}

const generateSkipButton = (
  questionNum: number,
  setQuestionNum: Function,
  quiz: any,
  answer: number,
  answerIDs: Array<number>,
  setAnswerIDs: Function
) => {
  const total = quiz && quiz.questions.length;
  if (questionNum === total) {
    return (
      <IonButton
        className="skip"
        color="medium"
        onClick={() => setAnswerIDs(answerIDs.concat(answer))}
        routerLink="/quiz/result"
      >
        Skip
      </IonButton>
    );
  } else {
    return (
      <IonButton
        className="skip"
        color="medium"
        onClick={() => {
          setQuestionNum(questionNum + 1);
          setAnswerIDs(answerIDs.concat(answer));
        }}
        routerLink="/quiz/question"
      >
        Skip
      </IonButton>
    );
  }
};

const Incorrect: React.FC<Props> = ({
  questionNum,
  setQuestionNum,
  answer,
  quiz,
  answerIDs,
  setAnswerIDs
}) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg className="grid-lines" src={RedLines}></IonImg>
        <IonGrid className="line-grid">
          <IonRow>
            <IonCol size="12">
              <h1 className="title">Not Quite</h1>

              <p>
                Here we will insert the reasoning why this <b className="wrong">answer</b> is incorrect.{" "}
              </p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton class="skip" routerLink="/quiz/question">
                Try Again
              </IonButton>
            </IonCol>
            <IonCol>
              {generateSkipButton(questionNum, setQuestionNum, quiz, answer, answerIDs, setAnswerIDs)}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Incorrect;
