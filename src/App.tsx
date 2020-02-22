import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Quiz from './pages/Quiz';
import Question from './pages/Question';
import Incorrect from './pages/Incorrect';
import Correct from './pages/Correct';
import End from './pages/End';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import axios from 'axios';

const sendGetQuizRequest = async () => {
  const response = await axios({
    "url": "https://gygb-backend-v1.herokuapp.com/v1/quiz/web-client",
    "method": "GET",
    "timeout": 0,
  });
  let data = await response.data;
  return data;
};

export const App: React.FC = () => {
  const [questionNum, setQuestionNum] = useState(1);
  const [numCorrect, setNumCorrect] = useState(0);
  const [quiz, setQuiz] = React.useState();
  React.useEffect(() => {
    sendGetQuizRequest().then(quiz => setQuiz(quiz));
  }, []);
  if (!quiz) {
    return <IonLoading isOpen={true} message={"Loading..."} />
  }
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/quiz" render={(props) => <Quiz {...props} quiz={quiz} />} />
          <Route path="/quiz/question"
            render={(props) => <Question {...props} questionNum={questionNum} quiz={quiz} />} />
          <Route path="/quiz/incorrect"
            render={(props) => <Incorrect {...props} questionNum={questionNum} setQuestionNum={setQuestionNum} />} />
          <Route path="/quiz/correct"
            render={(props) => <Correct {...props}
              questionNum={questionNum} setQuestionNum={setQuestionNum}
              numCorrect={numCorrect} setNumCorrect={setNumCorrect} />} />
          <Route path="/quiz/end"
            render={(props) => <End {...props} numCorrect={numCorrect} />} />
          <Redirect exact from="/" to="/quiz" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
