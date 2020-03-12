import React, { useState } from "react";
import { IonPage, IonContent, IonToolbar, IonTitle, IonItem, IonInput, IonButton, IonAlert, IonLabel, IonCheckbox } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import api from "../api";

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

const postEmail = (email: string, history: any, setShowAlert: Function, checked: Boolean) => {
  api.post(
    `/user`,
    {
      email: email,
      marketing: checked,
      source: "web"
    }
  ).then(res =>
    history.push("/quiz/thanks")
  ).catch(error =>
    setShowAlert(true)
  );
};

const displayEnterEmail = (numCorrect: number, quiz: any, email: string, setEmail: Function, history: any, setShowAlert: Function, checked: boolean, setChecked: Function) => {
  const total = quiz && quiz.questions.length;
  if (numCorrect / total > 0.70) {
    return (
      <form onSubmit={(e) => { e.preventDefault(); postEmail(email, history, setShowAlert, checked) }}>
        <IonItem>
          <IonLabel>Accept Marketing Consent</IonLabel>
          <IonCheckbox checked={checked} slot="start" onIonChange={e => setChecked(e.detail.checked)} />
        </IonItem>
        <IonItem>
          <IonInput placeholder="example@company.com" type="email" onIonChange={(event) => { setEmail(event.detail.value) }}></IonInput>
        </IonItem>
        <IonButton expand="block" type="submit" class="ion-no-margin">Submit Email</IonButton>
      </form>
    );
  } else {
    return (<IonTitle class="subtitle">Get more questions correct to be entered to raffle!</IonTitle>);
  }
}

const End: React.FC<Props> = ({ numCorrect, quiz, history }) => {

  const [email, setEmail] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle size="large" class="title">{numCorrectFunc(numCorrect, quiz)}</IonTitle>
          <IonTitle class="subtitle">{subtitle(numCorrect)}</IonTitle>
        </IonToolbar>
        {displayEnterEmail(numCorrect, quiz, email, setEmail, history, setShowAlert, checked, setChecked)}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Error'}
          subHeader={'Email already exists'}
          message={'Please enter a new email.'}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage >
  );
};

export default End;