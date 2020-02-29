import React, { useEffect } from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle, IonLoading } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';

interface Props extends RouteComponentProps {
  questionNum: number;
  quiz: any;
  setAnswer: Function;
}


const Question: React.FC<Props> = ({ quiz, questionNum, setAnswer }) => {

  const question = quiz.questions[questionNum - 1];

  const sendGetAnswerRequest = () => {
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
  const [correct, setCorrect] = React.useState();

  useEffect(() => {
    results.then(data => {
      setCorrect(data)
    })
  }, [results])

  if (!correct) {
    return <IonLoading isOpen={true} message={"Loading..."} />
  }

  function createTitle() {
    return { __html: quiz && quiz.questions[questionNum - 1].header };
  }

  function createSubtitle() {
    return { __html: quiz && question.body };
  }

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonTitle class="title">
            <div dangerouslySetInnerHTML={createTitle()} />
          </IonTitle>
          <IonTitle class="subtitle">
            <div dangerouslySetInnerHTML={createSubtitle()} />
          </IonTitle>

          {quiz.questions[questionNum - 1].answers.map((x: any, i: number) => {
            let ansCorrect = correct[i].data.correct;
            let linkText = ansCorrect ? 'correct' : 'incorrect';
            return <IonButton expand="block" routerLink={`/quiz/${linkText}`} onClick={() => setAnswer(correct[i].data.message)}>
              <div dangerouslySetInnerHTML={{ __html: x.text }} />
            </IonButton>
          })}

        </IonToolbar>
      </IonContent>
    </IonPage >
  );
};

export default Question;