import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonButton, IonCol, IonRow, IonImg, IonGrid } from "@ionic/react";
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

const getNumCorrect = (answerIDs: Array<number>, quiz: any) => {
  var obj: any = {};
  for (var i = 0; i < answerIDs.length; i++) {
    obj[quiz.questions[i].id] = answerIDs[i];
  }
  return api.post(`/quiz/web-client/verify/`, {
    answers: obj
  });
};

const imageReturn = (numCorrect: any) => {
  if (numCorrect.correct === numCorrect.total) {
    return <IonImg src={Confetti}></IonImg>;
  } else if (numCorrect.correct > 0) {
    return <IonImg src={HatsOff}></IonImg>;
  } else {
    return <IonImg src={House}></IonImg>;
  }
};

const title = (numCorrect: any) => {
  if (numCorrect.correct === numCorrect.total) {
    return "Congratulations";
  } else if (numCorrect.correct / numCorrect.total > 0.7) {
    return "Well Done";
  } else {
    return "You didn't get enough questions right";
  }
};

const subtitle = (numCorrect: any) => {
  if (numCorrect.correct === numCorrect.total) {
    return "You got all questions right!";
  } else if (numCorrect.correct / numCorrect.total > 0.7) {
    return "You got " + numCorrect.correct + "/" + numCorrect.total + " questions correct!";
  } else {
    return "Not to worry, sign up for our e-newsletter to get energy tips and help every month";
  }
};

const generateButton = (numCorrect: any, setRaffle: Function) => {
  if (numCorrect.correct / numCorrect.total < 0.7) {
    setRaffle(false);
    return (
      <IonButton className="blue-button" routerLink="/quiz/signup">
        Learn More
      </IonButton>
    );
  } else {
    setRaffle(true);
    return (
      <IonButton className="blue-button" routerLink="/quiz/signup">
        Enter Raffle
      </IonButton>
    );
  }
};

const Result: React.FC<Props> = ({ answerIDs, quiz, setRaffle }) => {
  const [numCorrect, setNumCorrect] = useState(0);

  useEffect(() => {
    getNumCorrect(answerIDs, quiz).then(res => {
      setNumCorrect(res.data);
    });
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        {imageReturn(numCorrect)}
        <IonGrid>
          <IonRow>
            <IonCol>
              <h1 className="title">{title(numCorrect)}</h1>
              <h3 className="subtitle">{subtitle(numCorrect)}</h3>
              {generateButton(numCorrect, setRaffle)}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton className="blue-button" href="tinypowerhouse.org">
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
