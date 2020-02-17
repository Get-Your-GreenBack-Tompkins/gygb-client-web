import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle } from '@ionic/react';
import data from '../questions.json';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps<{
  num: string;
}> { }

const Question: React.FC<Props> = ({ match }) => {
  const val = (data as any)[match.params.num];
  const createAnswers = () => {
    let answers = []
    for (let i = 0; i < val.answers.length; i++) {
      if (i === val.correct) {
        answers.push(<IonButton expand="block" routerLink={`/quiz/correct/${match.params.num}`}>{val.answers[i]}</IonButton>)
      }
      else {
        answers.push(<IonButton expand="block" routerLink={`/quiz/incorrect/${match.params.num}`}>{val.answers[i]}</IonButton>)
      }
    }
    return answers
  }
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle class="title">Question {match.params.num}</IonTitle>
          <IonTitle class="subtitle">{val.question}</IonTitle>
          {createAnswers()}
        </IonToolbar>
      </IonContent>
    </IonPage >
  );
};

export default Question;