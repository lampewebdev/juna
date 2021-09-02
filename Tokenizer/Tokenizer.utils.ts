import { CharCodes } from "./CharCodes.ts";

export const isWhiteSpace = (charCode: number): boolean => {
  return (
    charCode === CharCodes.space ||
    charCode === CharCodes.tab ||
    charCode === CharCodes.lineFeed ||
    charCode === CharCodes.carriageReturn
  );
};

export const isInEnglishAlphabet = (charCode: number): boolean => {
  return (
    charCode >= CharCodes.lowerA &&
      charCode <= CharCodes.lowerZ ||
    charCode >= CharCodes.upperA &&
      charCode <= CharCodes.upperZ
  );
};
