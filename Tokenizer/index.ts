import { CharCodes } from "./CharCodes.ts";
import { TokenizerState } from "./Tokenizer.states.ts";

/*
  <div> hello </div>
  ^        ^        ^        ^
  |        |        |        end of closing tag
  |        |        before closing tag
  |        end of opening tag
  before opening tag

  1 find "<"
  1.1 if / then it is an closing tag
  1.2 if A-Z then it is an opening tag
*/
export default class Tokenizer {
  state = TokenizerState.Start;
  index = 0;
  sectionStart = 0;

  public tokenize(input: string): void {
    this.index = 0;
    while (this.index < input.length) {
      const charCode = input.charCodeAt(this.index);
      if (this.state === TokenizerState.Start) {
        this.stateIsStart(charCode);
      }
      if (this.state === TokenizerState.text) {
        this.isText(charCode);
      }
      if (this.state === TokenizerState.beforeOpeningTagName) {
        this.isBeforeOpeningTagName(charCode);
      }
      if (this.state === TokenizerState.isInsideOpeningTagName) {
        this.isOpeningTagName(charCode);
      }
      if (this.state === TokenizerState.afterOpeningTagName) {
        this.isAfterOpeningTagName(charCode);
      }
      if (this.state === TokenizerState.beforeClosingTagName) {
        this.isBeforeClosingTagName(charCode);
      }
      console.log(this.index, this.state, String.fromCharCode(charCode));
      this.index++;
    }
  }

  /**
   * Ignore until you find the first "<" opening tag
   * @param charCode
   */
  stateIsStart(charCode: number): void {
    if (charCode === CharCodes.lessThan) {
      this.state = TokenizerState.beforeOpeningTagName;
    }
  }

  isText(charCode: number): void {
    if (charCode === CharCodes.lessThan) {
      this.state = TokenizerState.beforeOpeningTagName;
      this.sectionStart = this.index;
    }
  }

  isBeforeOpeningTagName(charCode: number): void {
    if (charCode === CharCodes.slash) {
      this.state = TokenizerState.beforeClosingTagName;
    } else if (charCode === CharCodes.greaterThan) {
      this.state = TokenizerState.afterOpeningTagName;
    } else if (String.fromCharCode(charCode).match(/[a-zA-Z]/)) {
      this.state = TokenizerState.isInsideOpeningTagName;
    }
  }

  isOpeningTagName(charCode: number): void {
    if (charCode === CharCodes.greaterThan) {
      this.state = TokenizerState.afterOpeningTagName;
    } else {
      // console.log(this.index, String.fromCharCode(charCode));
    }
  }

  isAfterOpeningTagName(charCode: number): void {
    if (charCode === CharCodes.slash) {
      this.state = TokenizerState.beforeClosingTagName;
    } else if (charCode === CharCodes.greaterThan) {
      this.state = TokenizerState.text;
    }
  }

  isBeforeClosingTagName(charCode: number): void {
    if (charCode === CharCodes.greaterThan) {
      this.state = TokenizerState.afterClosingTagName;
    }
  }
}
