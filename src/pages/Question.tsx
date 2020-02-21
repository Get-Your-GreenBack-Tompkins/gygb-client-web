import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle } from '@ionic/react';
//import data from '../questions.json';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';

interface Props extends RouteComponentProps {
  questionNum: number;
  quiz: any;
}

const sendGetAnswerRequest = async (questionId: any, answerId: any) => {
  const response = await axios({
    "url": `https://gygb-backend-v1.herokuapp.com/v1/quiz/web-client/question/${questionId}/verify-answer/${answerId}`,
    "method": "GET",
    "timeout": 0,
  });
  let data = await response.data;
  return "xxxxxxxxxxxx";
};

const Question: React.FC<Props> = ({ quiz, questionNum }) => {
  const val = quiz && quiz.questions[questionNum-1];

  const createAnswers = () => {
    let answers = [];
    const answerNum = val && val.answers.length;

    for (let i = 0; i < answerNum; i++) {
      let answer: any;
      const qId = val && val.id;
      const ansID = val && val.answers[i].id;
      
      sendGetAnswerRequest(qId, ansID).then(ans => answer = ans);
      console.log(answer);
      if (false) {
        answers.push(<IonButton expand="block" routerLink="/quiz/correct">{val && val.answers[i].text}</IonButton>)
      }
      else {
        answers.push(<IonButton expand="block" routerLink="/quiz/incorrect">{val && val.answers[i].text}</IonButton>)
      }
    }
    return answers;
  }

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle class="title">{quiz && quiz.questions[questionNum-1].header}</IonTitle>
          <IonTitle class="subtitle">
            {quiz && quiz.questions[questionNum-1].body}
          </IonTitle>
          {createAnswers()}
        </IonToolbar>
      </IonContent>
    </IonPage >
  );
};

export default Question;