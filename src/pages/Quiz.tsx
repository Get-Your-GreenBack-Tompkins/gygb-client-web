

import React from 'react';
import { IonButton, IonContent, IonToolbar, IonTitle, IonItem } from '@ionic/react';

const Quiz: React.FC = () => {
    return ( 
        <IonContent fullscreen class="ion-padding">
            <IonToolbar>
                <IonTitle size="large" class="title">Get Your Greenback Quiz</IonTitle>
                <IonButton expand="block" routerLink="/quiz/question1">Start Quiz</IonButton>
            </IonToolbar>
        </IonContent>);
    };

export default Quiz;