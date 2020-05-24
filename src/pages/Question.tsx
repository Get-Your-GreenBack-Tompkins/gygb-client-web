import React, { useEffect, useState } from "react";

import { IonPage, IonButton, IonContent, IonCol, IonGrid, IonRow, IonProgressBar } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import api from "../api";

import "../theme/style.scss";

interface QuizMetrics {
  completed: number;
  total: number;
}

interface Props extends RouteComponentProps {
  question: any;
  answer: number | null;
  setAnswer: Function;
  metrics: QuizMetrics;
}

const sendGetAnswerRequest = (question: any, answerId: string) => {
  return api.get(`/quiz/web-client/question/${question.id}/verify-answer/${answerId}`);
};

export interface AnswerResponse {
  message: string;
  correct: boolean;
  answerId: string;
  questionId: string;
}

const Question: React.FC<Props> = ({ question, answer, setAnswer, metrics, history }) => {
  const [answerResponse, setAnswerResponse] = useState(null as AnswerResponse | null);

  useEffect(() => {
    if (answer != null && question != null) {
      sendGetAnswerRequest(question, `${answer}`).then(res => {
        setAnswerResponse(res.data);
      });
    }
  }, [question, answer]);

  useEffect(() => {
    console.log(answerResponse);
    if (answerResponse) {
      if (answerResponse.correct) {
        history.replace("/quiz/correct", {
          message: answerResponse.message
        });
      } else {
        history.replace("/quiz/incorrect", {
          message: answerResponse.message
        });
      }
    }
  }, [answerResponse, history]);

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
            padding: "28px 22px 8px",
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "column",
            height: "100%"
          }}
        >
          <IonRow>
            <IonCol>
              <IonProgressBar
                className="question-progress"
                value={metrics.completed / metrics.total}
                color="primary"
              ></IonProgressBar>
            </IonCol>
          </IonRow>
          <IonRow className="question-title-row ion-justify-content-start">
            <IonCol>
              <h3 className="question-title">{createTitle()}</h3>
            </IonCol>
            <IonCol size="auto">
              <IonButton size="small" className="score">
                Completed: {metrics.completed - 1}/{metrics.total}
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <div className="question-subtitle" dangerouslySetInnerHTML={createSubtitle()} />
          </IonRow>

          <IonRow className="ion-align-items-stretch" style={{ flexGrow: 1 }}>
            <IonCol>
              <IonGrid className="answer-grid" style={{ height: "100%" }}>
                <IonRow className="answer-row ion-align-items-stretch" style={{ height: "100%" }}>
                  {question.answers.map((a: any) => {
                    const { id } = a;
                    return (
                      <IonCol className="answer-item" key={id} size="12" size-md="6">
                        <IonButton
                          className="answer-button"
                          size="large"
                          expand="block"
                          onClick={() => {
                            setAnswer(id);
                          }}
                        >
                          <div className="answer-container">
                            <span dangerouslySetInnerHTML={{ __html: a.text }} className="answer-text"></span>
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
