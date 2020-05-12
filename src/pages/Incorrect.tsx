import React from "react";

import { IonPage, IonButton, IonContent, IonImg, IonGrid, IonRow, IonCol } from "@ionic/react";
import { RouteComponentProps, withRouter, useLocation } from "react-router";

import RedLines from "../assets/redLines.svg";

interface Props extends RouteComponentProps {
  questionNum: number;
  setQuestionNum: Function;
  answer: number;
  quiz: any;
  setAnswerID: (questionNum: number, answerId: number) => void,
  setAnswer: (answer: number | null) => void;
}

const generateSkipButton = (
  questionNum: number,
  setQuestionNum: Function,
  quiz: any,
  answer: number,
  setAnswerID: (questionNum: number, answerId: number) => void,
  history: any
) => {
  const total = quiz && quiz.questions.length;
  if (questionNum === total) {
    return (
      <IonButton
        size="large"
        className="skip"
        color="medium"
        onClick={() => {
          setAnswerID(questionNum, answer);
          history.replace("/quiz/result");
        }}
      >
        Finish
      </IonButton>
    );
  } else {
    return (
      <IonButton
        size="large"
        className="skip"
        color="medium"
        onClick={() => {
          setAnswerID(questionNum, answer);
          setQuestionNum(questionNum + 1);
          history.replace("/quiz/question");
        }}
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
  setAnswerID,
  setAnswer,
  history
}) => {
  const location = useLocation();

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg className="grid-lines" src={RedLines}></IonImg>
        <IonGrid className="line-grid vh-50">
          <IonRow className="vh-25 incorrect-button-container ion-align-items-start">
            <IonCol size="12">
              <h1 className="ic-title">Not Quite</h1>
              <p className = "correctP">
                {(location && location.state && (location.state as any)["message"]) ||
                  "That wasn't the right answer!"}
              </p>
            </IonCol>

            <IonCol size="12" className="correct">
              <IonButton
                size="large"
                className="skip"
                onClick={() => {
                  setAnswer(null);
                  history.replace("/quiz/question");
                }}
              >
                Try Again
              </IonButton>
              {generateSkipButton(
                questionNum,
                setQuestionNum,
                quiz,
                answer,
                setAnswerID,
                history
              )}
            </IonCol>
            
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Incorrect);
