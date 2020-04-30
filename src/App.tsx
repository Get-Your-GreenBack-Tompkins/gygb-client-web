import React, { useState, useEffect, useCallback } from "react";

import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonLoading } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Quiz from "./pages/Quiz";
import Tutorial from "./pages/Tutorial";
import Question from "./pages/Question";
import Incorrect from "./pages/Incorrect";
import Correct from "./pages/Correct";
import Result from "./pages/Result";
import SignUp from "./pages/SignUp";
import End from "./pages/End";

import api from "./api";

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

const sendGetQuizRequest = async () => {
  const response = await api.get(`/quiz/web-client`);
  let data = await response.data;
  return data;
};

export const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [questionNum, setQuestionNum] = useState(1);
  const [question, setQuestion] = useState();
  const [quiz, setQuiz] = React.useState();
  const [answer, setAnswer] = React.useState(0 as number | null);
  const [answerIDs, setAnswerIDs] = React.useState({} as { [key: string]: any });
  const [raffle, setRaffle] = React.useState(false);

  const setAnswerID = useCallback(
    (questionNum: number, answerId: number) => {
      if (quiz.questions[questionNum - 1]) {
        const questionId = quiz.questions[questionNum - 1].id;

        if (!(questionId in answerIDs)) {
          answerIDs[questionId] = answerId;

          console.log(answerIDs);

          setAnswerIDs({ ...answerIDs });
        }
      }
    },
    [answerIDs, quiz]
  );

  useEffect(() => {
    if (!started) {
      sendGetQuizRequest()
        .then(quiz => {
          setQuestionNum(1);
          setAnswer(null);
          setRaffle(false);
          setQuiz(quiz);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [started]);

  useEffect(() => {
    if (quiz) {
      setQuestion(quiz.questions[questionNum - 1]);
      setAnswer(null);
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
            render={props => <Quiz {...props} started={started} setStarted={setStarted} quiz={quiz} />}
          />
          <Route
            exact
            path="/quiz/tutorial"
            render={props => (!started ? <Redirect to="/quiz" /> : <Tutorial {...props} quiz={quiz} />)}
          />
          <Route
            path="/quiz/question"
            render={props =>
              !started ? (
                <Redirect to="/quiz" />
              ) : (
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
              )
            }
          />
          <Route
            path="/quiz/incorrect"
            render={props =>
              !started ? (
                <Redirect to="/quiz" />
              ) : answer != null ? (
                <Incorrect
                  {...props}
                  answer={answer}
                  quiz={quiz}
                  questionNum={questionNum}
                  setQuestionNum={setQuestionNum}
                  setAnswer={setAnswer}
                  setAnswerID={setAnswerID}
                />
              ) : (
                <div />
              )
            }
          />
          <Route
            path="/quiz/correct"
            render={props =>
              !started ? (
                <Redirect to="/quiz" />
              ) : answer != null ? (
                <Correct
                  {...props}
                  questionNum={questionNum}
                  setQuestionNum={setQuestionNum}
                  quiz={quiz}
                  answer={answer}
                  setAnswerID={setAnswerID}
                />
              ) : (
                <div />
              )
            }
          />
          <Route
            path="/quiz/result"
            render={props =>
              !started ? (
                <Redirect to="/quiz" />
              ) : (
                <Result {...props} answerIDs={answerIDs} quiz={quiz} setRaffle={setRaffle} />
              )
            }
          />
          <Route
            path="/quiz/signup"
            render={props =>
              !started ? (
                <Redirect to="/quiz" />
              ) : (
                <SignUp {...props} answerIDs={answerIDs} quiz={quiz} raffle={raffle} />
              )
            }
          />
          <Route
            path="/quiz/end"
            render={props =>
              !started ? <Redirect to="/quiz" /> : <End {...props} setStarted={setStarted} raffle={raffle} />
            }
          />
          <Redirect exact from="/" to="/quiz" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;