import type { Dispatch, SetStateAction } from "react";

import type { File } from "../../../types";

const NICKNAMES = [
  "sammySeal",
  "smokinSammySeal",
  "originalSamSeal",
  "samuelSealwall",
  "samuelSealworth",
  "samuelSealford",
  "samuelSealington",
  "sammySealkowski",
  "sammySealowitz",
  "sammySealberg",
  "sammySealkani",
  "sammySeal-Mart",
] as const;

const PORTRAITS: File[] = [
  "sammy1-2.png",
  "sammy2-2.png",
  "sammy3-2.png",
  "sammy4-2.png",
];

const getDifferentRandomValue = (
  storageKey: string,
  values: readonly string[],
): string => {
  if (values.length === 0) {
    throw new Error(`No values provided for ${storageKey} randomization.`);
  }

  if (values.length === 1) {
    const onlyValue = values[0];
    sessionStorage.setItem(storageKey, onlyValue);
    return onlyValue;
  }

  const currentValue = sessionStorage.getItem(storageKey);
  let selectedValue = values[0];

  while (selectedValue === currentValue) {
    const randomIndex = Math.floor(Math.random() * values.length);
    selectedValue = values[randomIndex];
  }

  sessionStorage.setItem(storageKey, selectedValue);
  return selectedValue;
};

export const randomizeNickname = (
  setRandomNickname: Dispatch<SetStateAction<string>>,
): void => {
  setRandomNickname(getDifferentRandomValue("nickname", NICKNAMES));
};

export const randomizeFontClassName = (
  fontClassNames: readonly string[],
  setRandomFontClassName: Dispatch<SetStateAction<string>>,
): void => {
  setRandomFontClassName(getDifferentRandomValue("font", fontClassNames));
};

export const randomizePortrait = (
  setRandomPortrait: Dispatch<SetStateAction<File>>,
): void => {
  setRandomPortrait(getDifferentRandomValue("portrait", PORTRAITS));
};

type RandomizationArgs = {
  fontClassNames: readonly string[];
  setRandomNickname: Dispatch<SetStateAction<string>>;
  setRandomFontClassName: Dispatch<SetStateAction<string>>;
  setRandomPortrait: Dispatch<SetStateAction<File>>;
};

export const runRandomizations = ({
  fontClassNames,
  setRandomNickname,
  setRandomFontClassName,
  setRandomPortrait,
}: RandomizationArgs): void => {
  randomizeNickname(setRandomNickname);
  randomizeFontClassName(fontClassNames, setRandomFontClassName);
  randomizePortrait(setRandomPortrait);
};

type TellJokeArgs = {
  jokePopupVisible: boolean;
  setJokePopupVisible: Dispatch<SetStateAction<boolean>>;
  setJokeKey: Dispatch<SetStateAction<number>>;
  randomize: () => void;
};

export const tellJoke = ({
  jokePopupVisible,
  setJokePopupVisible,
  setJokeKey,
  randomize,
}: TellJokeArgs): void => {
  if (jokePopupVisible) {
    setJokeKey((prev) => prev + 1);
    randomize();
    return;
  }

  setJokePopupVisible(true);
  setJokeKey((prev) => prev + 1);
};

type ClosePopupArgs = {
  setJokePopupVisible: Dispatch<SetStateAction<boolean>>;
  randomize: () => void;
};

export const closeJokePopup = ({
  setJokePopupVisible,
  randomize,
}: ClosePopupArgs): void => {
  setJokePopupVisible(false);
  randomize();
};
