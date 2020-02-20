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
  console.log(data);
  return data;
};

const Question: React.FC<Props> = ({ quiz, questionNum }) => {
  const val = quiz && quiz.questions[questionNum - 1];
  console.log(val);
  //console.log(sendGetAnswerRequest("NvVbhHbiWDv0fw5Y5H9j", "4XUigHcwNzyzeK6UjSws"));
  const createAnswers = () => {
    let answers = []
    for (let i = 0; val && i < val.answers.length; i++) {
      let answer: any;
      val && sendGetAnswerRequest(val.id, val[i].id).then(ans => answer = ans);
      console.log(answer);
      if (val && answer && answer.correct) {
        answers.push(<IonButton expand="block" routerLink="/quiz/correct">{val && val.answers[i]}</IonButton>)
      }
      else {
        answers.push(<IonButton expand="block" routerLink="/quiz/incorrect">{val && val.answers[i]}</IonButton>)
      }
    }
    return answers;
  }
  function createMarkup() {
    return { __html: val && val.body };
  }
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle class="title">{val && val.header}</IonTitle>
          <IonTitle class="subtitle">
            <div dangerouslySetInnerHTML={createMarkup()} />
          </IonTitle>
          {createAnswers()}
        </IonToolbar>
      </IonContent>
    </IonPage >
  );
};

export default Question;