import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonLoading } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Quiz from "./pages/Quiz";
import Question from "./pages/Question";
import Incorrect from "./pages/Incorrect";
import Correct from "./pages/Correct";
import End from "./pages/End";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.scss";

/* Styling */
import "./theme/style.scss";

import api from "./api";
import Thanks from "./pages/Thanks";

const sendGetQuizRequest = async () => {
  const response = await api.get(`/quiz/web-client`);
  let data = await response.data;
  return data;
};

export const App: React.FC = () => {
  const [questionNum, setQuestionNum] = useState(1);
  const [question, setQuestion] = useState();
  const [quiz, setQuiz] = React.useState();
  const [answer, setAnswer] = React.useState(0);
  const [answerIDs, setAnswerIDs] = React.useState([]);

  useEffect(() => {
    sendGetQuizRequest().then(quiz => setQuiz(quiz));
  }, []);

  useEffect(() => {
    if (quiz) {
      setQuestion(quiz.questions[questionNum - 1]);
    }
  }, [quiz, questionNum]);

  if (!quiz) {
    return <IonLoading isOpen={true} message={"Loading..."} />;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            exact
            path="/quiz"
            render={props => <Quiz {...props} quiz={quiz} />}
          />
          <Route
            path="/quiz/question"
            render={props => (
              <Question
                {...props}
                metrics={{
                  total: quiz.questions.length,
                  completed: questionNum
                }}
                question={question}
                answer={answer}
                setAnswer={setAnswer}
              />
            )}
          />
          <Route
            path="/quiz/incorrect"
            render={props => (
              <Incorrect
                {...props}
                answer={answer}
                quiz={quiz}
                questionNum={questionNum}
                setQuestionNum={setQuestionNum}
                answerIDs={answerIDs}
                setAnswerIDs={setAnswerIDs}
              />
            )}
          />
          <Route
            path="/quiz/correct"
            render={props => (
              <Correct
                {...props}
                questionNum={questionNum}
                setQuestionNum={setQuestionNum}
                quiz={quiz}
                answer={answer}
                answerIDs={answerIDs}
                setAnswerIDs={setAnswerIDs}
              />
            )}
          />
          <Route
            path="/quiz/end"
            render={props => (
              <End {...props} answerIDs={answerIDs} quiz={quiz} />
            )}
          />
          <Route path="/quiz/thanks" component={Thanks} />
          <Redirect exact from="/" to="/quiz" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
