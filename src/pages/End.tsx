import React from "react";
import { IonPage, IonContent, IonToolbar, IonTitle, IonItem, IonInput, IonButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import api from "../api";
import { isCompositeComponent } from "react-dom/test-utils";

interface Props extends RouteComponentProps {
  numCorrect: number;
  quiz: any;
}

const numCorrectFunc = (numCorrect: number, quiz: any) => {
  const total = quiz && quiz.questions.length;
  if (numCorrect === total) {
    return "You got all questions correct!";
  }
  else if (numCorrect > 0) {
    return "You got " + numCorrect + "/" + total + " questions correct!";
  }
  else {
    return "You got no questions correct.";
  }
}

const subtitle = (numCorrect: number) => {
  if (numCorrect === 0) {
    return "Maybe Try Again?";
  }
  else {
    return "Enjoy Your Knowledge!";
  }
}
let emailAddress: any;

const postEmail = () => {
  emailAddress = 'ss@dd.ed'
  console.log(emailAddress);
  return api.post(
    `/user`,
    {
      email: emailAddress,
      marketing: true,
      source: "ios"
    }
  );
};

const handleEmailValue = (value: any) => {
  emailAddress = value;
  console.log(emailAddress);
};

const displayEnterEmail = (numCorrect: number, quiz: any) => {
  const total = quiz && quiz.questions.length;
  if (numCorrect/total > 0.70) {
    return (
      <form onSubmit={() => postEmail()}>
        <IonItem>
          <IonInput placeholder="example@company.com" type="email" onInput={(value) => handleEmailValue(value)}></IonInput>
        </IonItem>
        <IonButton expand="block" type="submit" class="ion-no-margin">Submit Email</IonButton>
      </form>
    );
  } else {
    return (<IonTitle class="subtitle">Get more questions correct to be entered to raffle!</IonTitle>);
  }
}

const End: React.FC<Props> = ({ numCorrect, quiz }) => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle size="large" class="title">{numCorrectFunc(numCorrect, quiz)}</IonTitle>
          <IonTitle class="subtitle">{subtitle(numCorrect)}</IonTitle>
        </IonToolbar>
        {displayEnterEmail(numCorrect, quiz)}
      </IonContent>
    </IonPage >
  );
};

export default End;