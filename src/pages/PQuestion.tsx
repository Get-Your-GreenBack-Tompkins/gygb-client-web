import React from 'react';
import { IonPage, IonButton, IonContent, IonToolbar, IonTitle } from '@ionic/react';

const Question: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen class="ion-padding">
                <IonToolbar>
                    <IonTitle class="title">Question 1</IonTitle>
                    <IonTitle class="subtitle">How many woodchucks does it take to chuck a lot of wood?</IonTitle>
                    <IonButton expand="block" routerLink="/quiz/incorrect">Quite A Lot</IonButton>
                    <IonButton expand="block" routerLink="/quiz/incorrect">A Super Duper Lot</IonButton>
                    <IonButton expand="block" routerLink="/quiz/correct">A Massive Amount</IonButton>
                    <IonButton expand="block" routerLink="/quiz/incorrect">10 or possible 30.</IonButton>
                </IonToolbar>
            </IonContent>
        </IonPage>
    );
};

export default Question;