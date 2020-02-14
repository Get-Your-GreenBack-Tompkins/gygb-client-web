import React from 'react';
import { IonButton, IonContent, IonToolbar, IonTitle, IonItem } from '@ionic/react';

const Question1: React.FC = () => {
    return ( 
        <IonContent fullscreen class="ion-padding">
            <IonToolbar>
                <IonTitle size="large" class="title">Question 1</IonTitle>
                <IonButton expand="block" routerLink="/quiz/question1">Start Quiz</IonButton>
            </IonToolbar>
        </IonContent>);
    };

export default Question1;