import React, { useEffect } from "react";
import {
  IonPage,
  IonButton,
  IonContent,
  IonToolbar,
  IonTitle,
  IonLoading,
  IonItem,
  IonLabel,
  IonRow,
  IonHeader,
  IonCol
} from "@ionic/react";
import { RouteComponentProps } from "react-router";

import api from "../api";

interface Props extends RouteComponentProps {
  questionNum: number;
  quiz: any;
  setAnswer: Function;
}

const Question: React.FC<Props> = ({ quiz, questionNum, setAnswer }) => {
  const question = quiz.questions[questionNum - 1];

  const [results, setResults] = React.useState();
  const [correct, setCorrect] = React.useState();

  useEffect(() => {
    setCorrect(null);
    let data = question.answers.map((el: any, i: number) => {
      return api.get(
        `/quiz/web-client/question/${question.id}/verify-answer/${i}`
      );
    });
    let res = Promise.all(data).then(result => result);
    setResults(res);
  }, [questionNum, question]);

  useEffect(() => {
    if (results) {
      results.then((data: any) => {
        setCorrect(data);
      });
    }
  }, [results]);

  if (!correct) {
    return <IonLoading isOpen={true} message={"Loading..."} />;
  }

  function createTitle() {
    return { __html: quiz && quiz.questions[questionNum - 1].header };
  }

  function createSubtitle() {
    return { __html: quiz && question.body };
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonToolbar no-border>
          <IonCol text-wrap class="subtitle">
            <IonTitle class="title">
              <div dangerouslySetInnerHTML={createTitle()} />
            </IonTitle>
            <div dangerouslySetInnerHTML={createSubtitle()} />
          </IonCol>

          {quiz.questions[questionNum - 1].answers.map((x: any, i: number) => {
            let ansCorrect = correct[i] && correct[i].data.correct;
            let linkText = ansCorrect ? "correct" : "incorrect";
            return (
              <IonButton
                expand="block"
                routerLink={`/quiz/${linkText}`}
                onClick={() => setAnswer(correct[i].data.message)}
              >
                <div dangerouslySetInnerHTML={{ __html: x.text }} />
              </IonButton>
            );
          })}
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Question;
