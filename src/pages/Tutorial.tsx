import React, { useEffect, useState, useCallback } from "react";
import { IonPage, IonButton, IonContent, IonImg, IonRow, IonGrid, IonCol } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import api from "../api";

import TutorialLines from "../assets/tutorial.svg";

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

  const [header, setHeader] = useState();
  const [body, setBody] = useState();
  const [totalQuestions, setTotalQuestions] = useState();
  const [questionRequirement, setQuestionRequirement] = useState();
  const [prize, setPrize] = useState();

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

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg className="tutorial-lines" src={TutorialLines}></IonImg>
        <IonGrid className="welcome-content">
          <IonRow className="tutorial-info">
            <IonCol size="12" size-sm>
              <h1>{header}</h1>
            </IonCol>
            <IonCol size="12" size-sm>
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </IonCol>
            <IonCol size="12" size-sm>
              <p>{`Get ${questionRequirement} out of ${totalQuestions} questions and you could win a..`}</p>
            </IonCol>
            <IonCol size="12" size-sm>
              <b>{prize}</b>
            </IonCol>
            <IonCol size="12" size-sm>
              <p className="small"> Drawings are done monthly</p>
            </IonCol>
            <IonCol className="prize t-col" size="12" size-sm>
              {prize}
            </IonCol>
            <IonCol size="12" className = "small" size-sm>
              <p>Drawings are done monthly</p>
            </IonCol>
         
            <IonCol size="12">
              <IonButton size="large" className="tutorial-button" onClick={() => {
                 history.replace("/quiz/question");
              }}>
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
