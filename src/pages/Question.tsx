import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonButton,
  IonContent,
  IonToolbar,
  IonTitle,
  IonCol
} from "@ionic/react";
import { RouteComponentProps } from "react-router";

import api from "../api";

interface Props extends RouteComponentProps {
  question: any;
  answer: number;
  setAnswer: Function;
}

const Question: React.FC<Props> = ({ question, answer, setAnswer, history }) => {
  const sendGetAnswerRequest = (answerId: string) => {
    return api.get(
      `/quiz/web-client/question/${question.id}/verify-answer/${answerId}`
    );
  };

  const [correct, setCorrect] = useState();

  useEffect(() => {
    sendGetAnswerRequest(String(answer)).then(res => {
      setCorrect(res.data);
    });
  }, [answer]);

  useEffect(() => {
    let correctPath = "/quiz/correct";
    let incorrectPath = "/quiz/incorrect";

    if (correct) {
      if (correct.correct) {
        history.push(correctPath);
      } else {
        history.push(incorrectPath);
      }
    }
  }, [correct]);

  function createTitle() {
    return question.header;
  }

  function createSubtitle() {
    return { __html: question.body };
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonToolbar no-border>
          <IonCol text-wrap class="subtitle">
            <IonTitle class="title">{createTitle()}</IonTitle>
            <div dangerouslySetInnerHTML={createSubtitle()} />
          </IonCol>

          {question.answers.map((a: any) => {
            const { id } = a;
            return (
              <IonButton
                expand="block"
                onClick={() => {
                  setAnswer(id);
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: a.text }} />
              </IonButton>
            );
          })}
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Question;
