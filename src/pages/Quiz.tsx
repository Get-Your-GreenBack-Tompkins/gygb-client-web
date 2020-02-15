import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle } from '@ionic/react';

const Quiz: React.FC<{ question: string }> = ({ question }) => {
    return (
        <IonPage>
            <IonContent fullscreen class="ion-padding">
                <IonToolbar>
                    <IonTitle class="title">Get Your<br />Greenback Quiz</IonTitle>
                    <IonButton routerLink="/quiz/question" >Start Quiz</IonButton>
                </IonToolbar>
            </IonContent>
        </IonPage>
    );
};

export default Quiz;