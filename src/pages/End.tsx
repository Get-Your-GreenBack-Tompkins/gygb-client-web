import React from 'react';
import { IonPage, IonContent, IonToolbar, IonTitle } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import data from '../questions.json';

interface Props extends RouteComponentProps {
  numCorrect: number;
}

const numCorrectFunc = (numCorrect: number) => {
  const total = Object.keys(data).length;
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

const End: React.FC<Props> = ({ numCorrect }) => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle size="large" class="title">{numCorrectFunc(numCorrect)}</IonTitle>
          <IonTitle class="subtitle">{subtitle(numCorrect)}</IonTitle>
        </IonToolbar>
      </IonContent>
    </IonPage >
  );
};

export default End;