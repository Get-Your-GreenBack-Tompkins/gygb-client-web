import React from "react";
import { IonPage, IonButton, IonImg, IonRow, IonGrid, IonCol } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import Logo from "../assets/logo.svg";
import Bottom from "../assets/bottomlines.svg";
import Top from "../assets/toplines.svg";

interface Props extends RouteComponentProps {
  quiz: any;
  reset: () => void;
  started: boolean;
  setStarted: (started: boolean) => void;
}

const Quiz: React.FC<Props> = ({ quiz, history, reset, setStarted }) => {
  return (
    <IonPage>
      <IonImg className="home-lines home-lines-top" src={Top}></IonImg>
      <IonImg className="home-lines home-lines-bottom" src={Bottom}></IonImg>

      <IonGrid className="center-grid">
        <IonRow>
          <IonCol size="12">
            <IonImg className="logo" src={Logo} alt="Powerhouse"></IonImg>
            <h1 className="quiz subtitle">{quiz && quiz.name}</h1>
            <IonButton
              size="large"
              className="start-button"
              onClick={() => {
                reset();
                setStarted(true);
                history.push("/quiz/tutorial");
              }}
            >
              Enter Quiz
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default Quiz;
