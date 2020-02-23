import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {
  questionNum: number;
  setQuestionNum: Function;
  answer: string;
  quiz: any;
}

const generateSkipButton = (questionNum: number, setQuestionNum: Function, quiz: any) => {
  const total = quiz && quiz.questions.length;
  if (questionNum === total) {
    return (
      <IonButton color="medium" routerLink="/quiz/end">Skip</IonButton>
    );
  } else {
    return (
      <IonButton color="medium" onClick={() => setQuestionNum(questionNum + 1)} routerLink="/quiz/question">Skip</IonButton>
    );
  }
}

const Incorrect: React.FC<Props> = ({ questionNum, setQuestionNum, answer, quiz }) => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle size="large" class="title">Whoops!</IonTitle>
          <IonTitle class="subtitle">{answer}</IonTitle>
          {generateSkipButton(questionNum, setQuestionNum, quiz)}
          <IonButton routerLink="/quiz/question">Try Again</IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Incorrect;