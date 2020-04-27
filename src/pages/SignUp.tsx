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
    return "Enter To Win";
  } else {
    return "Sign Up";
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
      <IonItem lines="none" className="sign-up-l">
        <IonLabel>Sign Up for Newsletter</IonLabel>
        <IonCheckbox checked={checked} slot="start" onIonChange={e => setChecked(e.detail.checked)} />
      </IonItem>
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
      <div>
        <IonItem>
          <IonInput
            placeholder="First Name"
            type="text"
            onIonChange={event => {
              setFirstName(event.detail.value);
            }}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            placeholder="Last Name"
            type="text"
            onIonChange={event => {
              setLastName(event.detail.value);
            }}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            placeholder="email@domain.com"
            type="email"
            onIonChange={event => {
              setEmail(event.detail.value);
            }}
          ></IonInput>
        </IonItem>
      </div>
    );
  } else {
    return (
      <IonItem>
        <IonInput
          placeholder="email@domain.com"
          type="email"
          onIonChange={event => {
            setEmail(event.detail.value);
          }}
        ></IonInput>
      </IonItem>
    );
  }
};

const generateButton = (raffle: boolean) => {
  if (raffle) {
    return (
      <IonButton size="large" type="submit" className="blue-button">
        Enter Raffle
      </IonButton>
    );
  } else {
    return (
      <IonButton size="large" type="submit" className="sign-up-l blue-button">
        Sign Up
      </IonButton>
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
          <p> We never spam. We’re here to serve you! </p>
          <p>
            Our only purpose is to provide you with key information that can help you save money and live more
            environmentally.
          </p>
        </IonCol>

        {generateInput(raffle, setFirstName, setLastName, setEmail)}
        {newsletter(raffle, checked, setChecked)}
        {generateButton(raffle)}
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

        <IonCol className="message" size="12">
          <p> We never spam. We’re here to serve you! </p>
          <p>
            Our only purpose is to provide you with key information hat can help you save money and live more
            environmentally.
          </p>
        </IonCol>

        {generateButton(raffle)}
      </form>
    );
  }
};

const SignUp: React.FC<Props> = ({ history, raffle, answerIDs, quiz }) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar className = "yellow-banner">
          <IonTitle className ="title" size="large">{title(raffle)}</IonTitle>
        </IonToolbar>
      </IonHeader>
         */}
      <IonContent fullscreen class="ion-padding">
        <IonGrid className="center-grid">
          <IonRow>
            <IonCol size="12" className="yellow-banner">
              <h1 className="title">{title(raffle)}</h1>
            </IonCol>
            <IonCol size="12" className="raffle-info center-grid">
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
            </IonCol>
          </IonRow>

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
