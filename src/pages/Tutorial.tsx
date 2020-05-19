import React, { useEffect, useState, useCallback } from "react";
import { IonPage, IonButton, IonContent, IonImg, IonRow, IonGrid, IonCol } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import api from "../api";

import TutorialLines from "../assets/tLines.svg";

interface Props extends RouteComponentProps {
  quiz: any;
}

const Quiz: React.FC<Props> = ({ quiz, history }) => {
  const sendGetTutorialRequest = useCallback(() => {
    return api.get(`/quiz/${quiz.id}/tutorial`);
  }, [quiz]);

  const sendGetRaffleRequest = useCallback(() => {
    return api.get(`/quiz/${quiz.id}/raffle`);
  }, [quiz]);

  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null);
  const [questionRequirement, setQuestionRequirement] = useState<number | null>(null);
  const [prize, setPrize] = useState<string | null>(null);

  useEffect(() => {
    sendGetTutorialRequest().then(res => {
      setHeader(res.data.header);
      setBody(res.data.body);
      setTotalQuestions(res.data.totalQuestions);
    });
  }, [sendGetTutorialRequest]);

  useEffect(() => {
    sendGetRaffleRequest().then(res => {
      setPrize(res.data.prize);
      setQuestionRequirement(res.data.questionRequirement);
    });
  }, [sendGetRaffleRequest]);

  const generateRaffleContent = (
    questionRequirement: number | null,
    totalQuestions: number | null,
    prize: string | null
  ) => {
    if (questionRequirement != null && prize != null) {
      return (
        <>
          <IonRow className="tutorial-row">
            <IonCol size="9" className="tutorial-info t-col">
              {`Get ${questionRequirement} out of ${totalQuestions} questions and you could win a..`}
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="prize t-col" size="12" size-sm>
              {prize}
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" className="small" size-sm>
              <p>Drawings are done monthly</p>
            </IonCol>
          </IonRow>
        </>
      );
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg className="tutorial-lines" src={TutorialLines}></IonImg>
        <IonGrid className="tutorial-grid">
          <IonRow className="ion-align-items-start tutorial-row">
            <IonCol className="tutorial-title" size-sm>
              <p>{header}</p>
            </IonCol>
          </IonRow>

          <IonRow className="tutorial-row">
            <IonCol size="10" className="t-col">
              <div className="tutorial-info x" dangerouslySetInnerHTML={{ __html: body }} />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" className="t-col">
              <p className="action-call">Find the answers within the powerhouse! </p>
            </IonCol>
          </IonRow>

          {generateRaffleContent(questionRequirement, totalQuestions, prize)}

          <IonRow>
            <IonCol size="12" className="termslink" size-sm>
              <p>By pressing start you agree to our</p>
              <a href="https://www.tinypowerhouse.org/"> terms and agreements</a>
            </IonCol>
            <IonCol>
              <IonButton
                size="large"
                className="tutorial-button"
                onClick={() => {
                  history.replace("/quiz/question");
                }}
              >
                Start Quiz!
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Quiz;
