import { assertEquals } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { isInEnglishAlphabet, isWhiteSpace } from "./Tokenizer.utils.ts";
import { CharCodes } from "./CharCodes.ts";

Deno.test("Tokenizer | isWhiteSpace", (): void => {
  const spaceIsWhitespace = isWhiteSpace(CharCodes.space);
  assertEquals(spaceIsWhitespace, true);

  const tabIsWhitespace = isWhiteSpace(CharCodes.tab);
  assertEquals(tabIsWhitespace, true);

  const lineFeedIsWhitespace = isWhiteSpace(CharCodes.lineFeed);
  assertEquals(lineFeedIsWhitespace, true);

  const carriageReturnIsWhitespace = isWhiteSpace(
    CharCodes.carriageReturn,
  );
  assertEquals(carriageReturnIsWhitespace, true);
});

Deno.test("Tokenizer | isInEnglishAlphabet", (): void => {
  const lowerAIsInAlphabet = isInEnglishAlphabet(CharCodes.lowerA);
  assertEquals(lowerAIsInAlphabet, true);

  const upperAIsInAlphabet = isInEnglishAlphabet(CharCodes.upperA);
  assertEquals(upperAIsInAlphabet, true);

  const lowerZIsInAlphabet = isInEnglishAlphabet(CharCodes.lowerZ);
  assertEquals(lowerZIsInAlphabet, true);

  const upperZIsInAlphabet = isInEnglishAlphabet(CharCodes.upperZ);
  assertEquals(upperZIsInAlphabet, true);

  const lowerBIsInAlphabet = isInEnglishAlphabet(CharCodes.lowerB);
  assertEquals(lowerBIsInAlphabet, true);

  const upperBIsInAlphabet = isInEnglishAlphabet(CharCodes.upperB);
  assertEquals(upperBIsInAlphabet, true);

  const slashIsNotInAlphabet = isInEnglishAlphabet(CharCodes.slash);
  assertEquals(slashIsNotInAlphabet, false);

  const atIsNotInAlphabet = isInEnglishAlphabet(CharCodes.at);
  assertEquals(atIsNotInAlphabet, false);

  const tabIsNotInAlphabet = isInEnglishAlphabet(CharCodes.tab);
  assertEquals(tabIsNotInAlphabet, false);

  const backspaceIsNotInAlphabet = isInEnglishAlphabet(
    CharCodes.backspace,
  );
  assertEquals(backspaceIsNotInAlphabet, false);
});
