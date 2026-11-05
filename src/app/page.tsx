"use client";

import Image from "next/image";
import {
  Capriola,
  Carattere,
  Caveat,
  Gluten,
  Lato,
  Pacifico,
  Roboto_Slab,
} from "next/font/google";
import { useEffect, useState } from "react";

import { File } from "../../types";
import JokePopup from "./components/JokePopup";
import {
  closeJokePopup,
  runRandomizations,
  tellJoke,
} from "./utilities/homePageUtils";

const capriola = Capriola({ subsets: ["latin"], weight: "400" });
const carattere = Carattere({ subsets: ["latin"], weight: "400" });
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const gluten = Gluten({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
});
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

const fontClassNames = [
  capriola.className,
  "font-arial",
  carattere.className,
  caveat.className,
  gluten.className,
  lato.className,
  pacifico.className,
  "font-courier-new",
  "font-trebuchet",
  "font-lucida-console",
] as const;

export default function Home() {
  const [randomPortrait, setRandomPortrait] = useState<File>("");
  const [randomNickname, setRandomNickname] = useState<string>("");
  const [randomFontClassName, setRandomFontClassName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [jokePopupVisible, setJokePopupVisible] = useState(false);
  const [jokeKey, setJokeKey] = useState(0);

  useEffect(() => {
    runRandomizations({
      fontClassNames,
      setRandomNickname,
      setRandomFontClassName,
      setRandomPortrait,
    });
    setLoading(false);
  }, []);

  return (
    <main aria-busy={loading}>
      {/* <!-- Splash Page --> */}
      {!loading && (
        <section className="splash" aria-labelledby="nickname">
          <header>
            <h1 id="nickname" className={`title ${randomFontClassName}`}>
              {randomNickname}
            </h1>
          </header>
          <Image
            alt="randomized Sammy Seal portrait"
            id="sammy-portrait"
            src={`/${randomPortrait}`}
            width={450}
            height={400}
          />
        </section>
      )}
      <section className="splash-buttons" aria-label="Main actions">
        {/* <!-- Joke Button --> */}
        <button
          type="button"
          className="round-button main-btn"
          id="joke-btn"
          aria-label="Tell me a joke"
          aria-haspopup="dialog"
          aria-expanded={jokePopupVisible}
          onClick={() =>
            tellJoke({
              jokePopupVisible,
              setJokePopupVisible,
              setJokeKey,
              randomize: () =>
                runRandomizations({
                  fontClassNames,
                  setRandomNickname,
                  setRandomFontClassName,
                  setRandomPortrait,
                }),
            })
          }
        >
          <div className="curved-text">
            <span className={robotoSlab.className}>JOKE</span>
          </div>
        </button>
      </section>

      {jokePopupVisible && (
        <JokePopup
          onClose={() =>
            closeJokePopup({
              setJokePopupVisible,
              randomize: () =>
                runRandomizations({
                  fontClassNames,
                  setRandomNickname,
                  setRandomFontClassName,
                  setRandomPortrait,
                }),
            })
          }
          key={jokeKey}
        />
      )}
    </main>
  );
}
