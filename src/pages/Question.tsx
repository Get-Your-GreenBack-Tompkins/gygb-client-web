import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonButton,
  IonContent,
  IonTitle,
  IonCol,
  IonGrid,
  IonRow
} from "@ionic/react";
import { RouteComponentProps } from "react-router";

import api from "../api";

interface Props extends RouteComponentProps {
  question: any;
  answer: number;
  setAnswer: Function;
}

const Question: React.FC<Props> = ({
  question,
  answer,
  setAnswer,
  history
}) => {
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
        <IonGrid
          no-border
          style={{
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "column",
            height: "100%"
          }}
        >
          <IonRow>
            <IonCol>
              <IonTitle class="title">{createTitle()}</IonTitle>
              <div dangerouslySetInnerHTML={createSubtitle()} />
            </IonCol>
          </IonRow>
          <IonRow style={{ flexGrow: 1 }}>
            <IonCol>
              <IonGrid style={{ height: "100%" }}>
                <IonRow style={{ height: "100%" }}>
                  {question.answers.map((a: any) => {
                    const { id } = a;
                    return (
                      <IonCol key={id} size="12" size-md="6">
                        <IonButton
                          style={{ height: "100%" }}
                          size="large"
                          expand="block"
                          onClick={() => {
                            setAnswer(id);
                          }}
                        >
                          <div className="answer-container">
                            <span
                              dangerouslySetInnerHTML={{ __html: a.text }}
                              className="answer-text"
                            ></span>
                          </div>
                        </IonButton>
                      </IonCol>
                    );
                  })}
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Question;
