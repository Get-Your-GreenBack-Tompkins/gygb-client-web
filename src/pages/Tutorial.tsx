import React, { useEffect, useState, useCallback } from "react";
import { AxiosError } from "axios";
import { IonPage, IonButton, IonContent, IonImg, IonRow, IonGrid, IonCol, IonSpinner } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import api from "../api";

import TutorialLines from "../assets/tLines.svg";

interface Props extends RouteComponentProps {
  quiz: any;
}

const Quiz: React.FC<Props> = ({ quiz, history }) => {
  const sendQuizRequests = useCallback(() => {
    return {
      tutorial: api.get(`/quiz/${quiz.id}/tutorial`),
      raffle: api.get(`/quiz/${quiz.id}/raffle`)
    };
  }, [quiz]);

  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [tos, setToS] = useState<string | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null);
  const [questionRequirement, setQuestionRequirement] = useState<number | null>(null);
  const [prize, setPrize] = useState<string | null>(null);

  useEffect(() => {
    const { tutorial, raffle } = sendQuizRequests();

    function isFulfilled<T>(result: PromiseSettledResult<T>): result is PromiseFulfilledResult<T> {
      return result.status === "fulfilled";
    }

    function handleRaffleError(error: any) {
      const axiosError = error as AxiosError;

      if (axiosError.isAxiosError && error.code === "404") {
        console.debug("No raffle found!");
      } else {
        console.error(error);
      }
    }

    Promise.allSettled([tutorial, raffle])
      .then(([tutorialRequest, raffleRequest]) => {
        if (isFulfilled(tutorialRequest)) {
          const { value } = tutorialRequest;

          setHeader(value.data.header);
          setBody(value.data.body);
          setTotalQuestions(value.data.totalQuestions);
        }

        if (isFulfilled(raffleRequest)) {
          const { value } = raffleRequest;
          setPrize(value.data.prize);
          setQuestionRequirement(value.data.questionRequirement);
        } else {
          handleRaffleError(raffleRequest.reason)
        }
      })
      .catch(err => void handleRaffleError(err));
  }, [sendQuizRequests]);

  useEffect(() => {
    api.get(`/tos/quiz`).then(res => {
      setToS(res.data.link);
    });
  }, []);

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

  if (header == null || body == null || tos == null) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <IonGrid className="h-100">
            <IonRow className="h-100 ion-align-items-center ">
              <IonCol>
                <IonSpinner />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg className="tutorial-lines" src={TutorialLines}></IonImg>
        <IonGrid className="tutorial-grid">
          <IonRow className="tutorial-row">
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
              <p>
                By pressing start you agree to our <a href={tos}>privacy policy and terms of service</a>.
              </p>
            </IonCol>
          </IonRow>
          <IonRow>
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
