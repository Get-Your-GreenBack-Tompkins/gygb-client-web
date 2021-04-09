import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonAlert,
  IonLabel,
  IonCheckbox,
  IonCol,
  IonList,
  IonRow,
  IonGrid
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import api from "../api";

interface Props extends RouteComponentProps {
  answerIDs: { [key: string]: number };
  quiz: any;
  raffle: boolean;
}

const title = (raffle: boolean) => {
  if (raffle) {
    return (

      <IonCol size="12" className="yellow-banner">
        <h1 className="title su">Enter to win</h1>
      </IonCol>

    )
  } else {
    return (
      <IonCol size="12" className="yellow-banner sp">
        <h1 className="title su">Sign Up</h1>
      </IonCol>

    )
  }
};

const postAll = (
  answerIDs: { [key: string]: number },
  quiz: any,
  firstName: string,
  lastName: string,
  email: string,
  history: any,
  setShowAlert: Function,
  checked: Boolean
) => {
  api
    .post(`/quiz/web-client/raffle/enter`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      answers: { ...answerIDs }
    })
    .then(() => {
      api
        .post(`/user`, {
          email: email,
          marketing: checked,
          source: "web"
        })
        .then(() => {
          history.replace("/quiz/end");
        })
        .catch(() => {
          history.replace("/quiz/end");
        });
    })
    .catch(() => {
      setShowAlert(true);
    });
};

const postEmail = (email: string, history: any, setShowAlert: Function, checked: Boolean) => {
  api
    .post(`/user`, {
      email: email,
      marketing: checked,
      source: "web"
    })
    .then(() => {
      history.replace("/quiz/end");
    })
    .catch(() => {
      setShowAlert(true);
    });
};

const newsletter = (raffle: boolean, checked: boolean, setChecked: Function) => {
  if (raffle) {
    return (
      <IonRow>
        <IonCol size='12'>
          <IonItem className="checkbox sign-up-newsletter" lines="none">
            <IonLabel>Sign Up for Our Newsletter</IonLabel>
            <IonCheckbox checked={checked} slot="start" onIonChange={e => setChecked(e.detail.checked)} />
          </IonItem>
        </IonCol>
      </IonRow>
    );
  }
};

const generateInput = (
  raffle: boolean,
  setFirstName: Function,
  setLastName: Function,
  setEmail: Function
) => {
  if (raffle) {
    return (
      <IonRow className="tutorial-row">
        <IonCol>
          <IonList>
            <IonItem className="input-style">
              <IonLabel>First Name</IonLabel>
              <IonInput
                required
                type="text"
                onIonChange={event => {
                  setFirstName(event.detail.value);
                }}
              ></IonInput>
            </IonItem>
            <IonItem className="input-style">
              <IonLabel>Last Name</IonLabel>
              <IonInput
                required
                type="text"
                onIonChange={event => {
                  setLastName(event.detail.value);
                }}
              ></IonInput>
            </IonItem>
            <IonItem className="input-style">
              <IonLabel>Email Address</IonLabel>
              <IonInput
                required
                placeholder="email@domain.com"
                type="email"
                onIonChange={event => {
                  setEmail(event.detail.value);
                }}
              ></IonInput>
            </IonItem>
          </IonList>
        </IonCol>
      </IonRow>
    );
  } else {
    return (
      <div className="siu inputs">
        <IonItem className="input-style">
          <IonInput
            required
            placeholder="email@domain.com"
            type="email"
            className="only-email"
            onIonChange={event => {
              setEmail(event.detail.value);
            }}
          ></IonInput>
        </IonItem>
      </div>
    );
  }
};

const generateButton = (raffle: boolean) => {
  if (raffle) {
    return (
      <IonCol size='12' no-padding>
        <IonButton size="large" type="submit" className="sign-up-button">
          Enter Raffle
        </IonButton>
      </IonCol>
    );
  } else {
    return (
      <IonCol size="12">
        <IonButton size="large" type="submit" className="sign-up-button">
          Sign Up
        </IonButton>
      </IonCol>
    );
  }
};

const displayEnterEmail = (
  answerIDs: { [key: string]: number },
  quiz: any,
  firstName: string,
  setFirstName: Function,
  lastName: string,
  setLastName: Function,
  email: string,
  setEmail: Function,
  history: any,
  setShowAlert: Function,
  checked: boolean,
  setChecked: Function,
  raffle: boolean
) => {
  if (!raffle) {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          postEmail(email, history, setShowAlert, checked);
        }}
      >
        <IonCol className="message" size="12">
          <p>We never spam. We’re here to serve you!</p>
          <p>Our only purpose is to provide you with key information that can help you save money and live more
            environmentally.
          </p>
        </IonCol>

        <IonRow className="tutorial-row">
          <IonCol>{generateInput(raffle, setFirstName, setLastName, setEmail)}</IonCol>
        </IonRow>

        <IonRow className="su-buttons-holder tutorial-row">
          {generateButton(raffle)}
          <IonCol size="12" className="correct">
            <IonButton color="medium" className="return-button" href="https://tinypowerhouse.org">
              Return Home
            </IonButton>
          </IonCol>
        </IonRow>

      </form>
    );
  } else {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          postAll(answerIDs, quiz, firstName, lastName, email, history, setShowAlert, checked);
        }}
      >
        {generateInput(raffle, setFirstName, setLastName, setEmail)}

        {newsletter(raffle, checked, setChecked)}

        <IonRow className="tutorial-row">
          <IonCol className="message" size="10">
            <p> We never spam. We’re here to serve you!</p>
            <p>
              Our only goal is to provide you with key information that can help you save money and the environment!
            </p>
          </IonCol>
        </IonRow>


        <IonRow className="su-buttons-holder tutorial-row">
          {generateButton(raffle)}
          <IonCol size="12" className="correct">
            <IonButton color="medium" className="return-button" href="https://tinypowerhouse.org">
              Return Home
            </IonButton>
          </IonCol>
        </IonRow>

      </form>
    );
  }
};

const SignUp: React.FC<Props> = ({ history, raffle, answerIDs, quiz }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid className="signup-grid">
          <IonRow className="yb-holder tutorial-row">
            {title(raffle)}
          </IonRow>

          {displayEnterEmail(
            answerIDs,
            quiz,
            email,
            setEmail,
            firstName,
            setFirstName,
            lastName,
            setLastName,
            history,
            setShowAlert,
            checked,
            setChecked,
            raffle
          )}

          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={"Error"}
            subHeader={"Email already exists"}
            message={"Please enter a new email."}
            buttons={["OK"]}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
