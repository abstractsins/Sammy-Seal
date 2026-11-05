import { useEffect, useState } from "react";
import { JokeQA } from "../../../types";
import jokes from "../jokes";
import { RiCloseFill } from "react-icons/ri";
import RandomCartoon from "./RandomCartoon";

interface Props {
  onClose: () => void;
}

export default function JokePopup({ onClose }: Props) {
  const [jokeNumber, setJokeNumber] = useState("");
  const [joke, setJoke] = useState<JokeQA>();
  const [answerVisible, setAnswerVisible] = useState(false);
  const [closeReady, setCloseReady] = useState(false);

  const generateJoke = () => {
    const nJokes = Object.keys(jokes).length;

    const lastJoke = sessionStorage.getItem("joke");
    const prevJoke = sessionStorage.getItem("prevJoke");

    let match = true;
    let tries = 0;
    let randomIndex = 0;

    while (match && tries < 100) {
      tries++;
      randomIndex = Math.ceil(Math.random() * nJokes);
      const indexStr = String(randomIndex);

      // Ensure the new joke is not the same as the current or previous one
      if (indexStr !== lastJoke && indexStr !== prevJoke) {
        match = false;
        sessionStorage.setItem("prevJoke", lastJoke || "");
        sessionStorage.setItem("joke", indexStr);
        setJokeNumber(indexStr);
        setJoke(jokes[randomIndex]);
      }
    }
  };

  const answer = () => setAnswerVisible(true);
  const answerIsPendingClose = answerVisible && !closeReady;

  const handlePrimaryButtonClick = () => {
    if (closeReady) {
      onClose();
      return;
    }

    if (!answerVisible) {
      answer();
    }
  };

  useEffect(() => {
    generateJoke();
  }, []);

  useEffect(() => {
    if (!answerVisible || closeReady) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCloseReady(true);
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [answerVisible, closeReady]);

  return (
    <div
      className="popup joke-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="joke-popup-title"
    >
      <div className="joke-container">
        <header className="joke-header">
          <h2 id="joke-popup-title" className="joke-number">
            Joke no. {jokeNumber}
          </h2>
        </header>
        <div className="joke-body">
          <p className="joke-setup">{joke?.setup}</p>
          <p
            id="joke-punchline"
            className={`joke-punchline ${answerVisible ? "visible" : ""}`}
            aria-live="polite"
          >
            {joke?.punchline}
          </p>
          <p id="joke-action-status" className="sr-only" role="status" aria-live="polite">
            {answerIsPendingClose
              ? "Punchline shown. Close button will be available in 3 seconds."
              : closeReady
                ? "Close button is now available."
                : ""}
          </p>
        </div>
        <footer className="joke-footer">
          <button
            className={`popup-button ${answerIsPendingClose ? "disabled" : ""} ${closeReady ? "close-ready" : ""}`}
            id="jokeQA-answer"
            aria-disabled={answerIsPendingClose}
            onClick={handlePrimaryButtonClick}
            aria-controls="joke-punchline"
            aria-describedby="joke-action-status"
            aria-label={closeReady ? "Close joke popup" : "Show joke answer"}
          >
            {closeReady ? "Close" : "Answer"}
          </button>
          <button
            type="button"
            className="close-button"
            aria-label="Close joke popup"
            onClick={onClose}
          >
            <RiCloseFill />
          </button>
        </footer>
      </div>

      <RandomCartoon />
    </div>
  );
}
