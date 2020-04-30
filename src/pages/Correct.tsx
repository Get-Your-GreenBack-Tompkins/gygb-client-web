import React from "react";

import { IonPage, IonButton, IonContent, IonImg, IonGrid, IonRow, IonCol } from "@ionic/react";
import { RouteComponentProps, withRouter, useLocation } from "react-router";

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
  setAnswerIDs: Function,
  history: any
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
          history.replace("/quiz/result");
        }}
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
          history.replace("/quiz/question");
        }}
      >
        Continue
      </IonButton>
    );
  }
};

const Correct: React.FC<Props> = ({
  questionNum,
  setQuestionNum,
  quiz,
  answer,
  answerIDs,
  setAnswerIDs,
  history
}) => {
  const location = useLocation();
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg className="grid-lines" src={GreenLines}></IonImg>
        <IonGrid className="line-grid">
          <IonRow>
            <IonCol size="12">
              <h1 className="title">Correct</h1>
              <p className="q-response">{(location && location.state && (location.state as any)["message"])  || "That was correct!"}</p>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol className="correct">
              {generateContinueButton(
                questionNum,
                setQuestionNum,
                quiz,
                answer,
                answerIDs,
                setAnswerIDs,
                history
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Correct);
