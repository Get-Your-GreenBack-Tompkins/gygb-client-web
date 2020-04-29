import React, { useState, useEffect, useCallback } from "react";
import { IonPage, IonContent, IonButton, IonCol, IonRow, IonImg, IonGrid, IonLoading } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import api from "../api";

import Confetti from "../assets/confetti.svg";
import HatsOff from "../assets/hatsoff.svg";
import House from "../assets/house.svg";

interface Props extends RouteComponentProps {
  answerIDs: Array<number>;
  quiz: any;
  setRaffle: Function;
}

const Result: React.FC<Props> = ({ answerIDs, quiz, setRaffle, history }) => {
  const [numCorrect, setNumCorrect] = useState(null as { total: number; correct: number } | null);
  const [questionRequirement, setQuestionRequirement] = useState(null as number | null);

  console.log(
    `${!numCorrect || numCorrect.correct} / ${questionRequirement} (${!numCorrect || numCorrect.total})`
  );

  const getNumCorrect = useCallback(() => {
    const obj = {} as { [key: string]: any };

    for (let i = 0; i < answerIDs.length; i++) {
      obj[quiz.questions[i].id] = answerIDs[i];
    }

    return api.post(`/quiz/web-client/verify/`, {
      answers: obj
    });
  }, [answerIDs, quiz]);

  const sendGetRaffleRequest = useCallback(() => {
    return api.get(`/quiz/${quiz.id}/raffle`);
  }, [quiz]);

  useEffect(() => {
    sendGetRaffleRequest().then(res => {
      setQuestionRequirement(res.data.questionRequirement);
    });
  }, [sendGetRaffleRequest]);

  useEffect(() => {
    getNumCorrect().then(res => {
      setNumCorrect(res.data);
    });
  }, [getNumCorrect]);

  const imageReturn = useCallback(() => {
    if (!numCorrect || questionRequirement === null) {
      return "";
    } else if (numCorrect.correct === numCorrect.total) {
      return <IonImg className="result-img" src={Confetti}></IonImg>;
    } else if (numCorrect.correct >= questionRequirement) {
      return <IonImg className="result-img" src={HatsOff}></IonImg>;
    } else {
      return <IonImg src={House}></IonImg>;
    }
  }, [numCorrect, questionRequirement]);

  const title = useCallback(() => {
    if (!numCorrect || questionRequirement === null) {
      return "";
    } else if (numCorrect.correct === numCorrect.total) {
      return "Congratulations";
    } else if (numCorrect.correct >= questionRequirement) {
      return "Well Done";
    } else {
      return "You didn't get enough questions right";
    }
  }, [numCorrect, questionRequirement]);

  const subtitle = useCallback(() => {
    if (!numCorrect || questionRequirement === null) {
      return "";
    } else if (numCorrect.correct === numCorrect.total) {
      return "You got all questions right!";
    } else if (numCorrect.correct >= questionRequirement) {
      return "You got " + numCorrect.correct + "/" + numCorrect.total + " questions correct!";
    } else {
      return "Not to worry, sign up for our e-newsletter to get energy tips and help every month";
    }
  }, [numCorrect, questionRequirement]);

  const generateButton = useCallback(() => {
    if (!numCorrect || questionRequirement == null) {
      setRaffle(false);
      return <IonButton>Loading...</IonButton>;
    } else if (numCorrect.correct < questionRequirement) {
      setRaffle(false);
      return (
        <IonButton
          className="blue-button"
          onClick={() => {
            history.replace("/quiz/signup");
          }}
        >
          Learn More
        </IonButton>
      );
    } else {
      setRaffle(true);
      return (
        <IonButton
          className="blue-button"
          onClick={() => {
            history.replace("/quiz/signup");
          }}
        >
          Enter Raffle
        </IonButton>
      );
    }
  }, [numCorrect, setRaffle, history]);

  if (numCorrect == null || questionRequirement == null) {
    // TODO Loading state.
    return <IonLoading isOpen={true} message="Checking your scores..."></IonLoading>;
  }

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonGrid className="center-grid">
          <IonRow>
            <IonCol size="12">{imageReturn()}</IonCol>
            <IonCol size="12">
              <h1 className="title">{title()}</h1>
              <h3 className="subtitle">{subtitle()}</h3>
              {generateButton()}
            </IonCol>
            <IonCol size="12">
              <IonButton className="blue-button" href="https://tinypowerhouse.org">
                Return Home
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Result;
