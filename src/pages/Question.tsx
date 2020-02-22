import React, { useEffect } from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle, IonLoading } from '@ionic/react';
//import data from '../questions.json';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';

interface Props extends RouteComponentProps {
  questionNum: number;
  quiz: any;
}


const Question: React.FC<Props> = ({ quiz, questionNum }) => {

  const [correct, setCorrect] = React.useState();
  console.log(quiz);
  const sendGetAnswerRequest = () => {
    const question = quiz.questions[questionNum - 1];
    let data = question.answers.map((el: any) => {
      return axios({
        "url": `https://gygb-backend-v1.herokuapp.com/v1/quiz/web-client/question/${question.id}/verify-answer/${el.id}`,
        "method": "GET",
        "timeout": 0,
      })
    });
    return Promise.all(data).then(result => result);
  };

  const [results, setResults] = React.useState(sendGetAnswerRequest());

  useEffect(() => {
    results.then(data => {
      setCorrect(data)
    })
  }, [results])

  if (!correct) {
    return <IonLoading isOpen={true} message={"Loading..."} />
  }

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle class="title">{quiz && quiz.questions[questionNum - 1].header}</IonTitle>
          {quiz.questions[questionNum - 1].answers.map((x: any, i: number) => {
            let ansCorrect = correct[i].data.correct;
            let linkText = ansCorrect ? 'correct' : 'incorrect';
            return <IonButton expand="block" routerLink={`/quiz/${linkText}`}>{x.text}</IonButton>
          })}

        </IonToolbar>
      </IonContent>
    </IonPage >
  );
};

export default Question;