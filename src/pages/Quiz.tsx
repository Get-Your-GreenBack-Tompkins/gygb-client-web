import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle, IonRow, IonCol } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {
  quiz: any;
}

const Quiz: React.FC<Props> = ({ quiz }) => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonToolbar>
          <IonCol size="12" size-sm>
            <div>
              <b>Thanks for coming! We are glad you came!</b>
            </div>
          </IonCol>
          <IonCol size="12" size-sm>
            <div>
              <b>Tutorial Information</b>
            </div>
          </IonCol>
          <IonCol size="12" size-sm>
            <div>
              <b>This is the body</b>
            </div>
          </IonCol>
          <IonCol size="12" size-sm>
            <div>
              <b>Complete 4 out 5 questions to win FLIR camera</b>
            </div>
          </IonCol>
          <IonTitle class="title">{quiz && quiz.name}</IonTitle>
          <IonButton routerLink="/quiz/question">Start Quiz</IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Quiz;
