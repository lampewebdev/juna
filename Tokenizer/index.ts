import { CharCodes } from "./CharCodes.ts";
import { isInEnglishAlphabet, isWhiteSpace } from "./Tokenizer.utils.ts";
import { TokenizerState } from "./Tokenizer.states.ts";
import { Token, TokenType } from "./Token.types.ts";

export default class Tokenizer {
  tokens: Token[] = [];
  private state = TokenizerState.data;
  private index = -1;
  private currentToken: Token | null = null;
  public tokenize(input: string): Token[] {
    this.index = 0;
    while (this.index < input.length) {
      const charCode = input.charCodeAt(this.index);
      if (this.state === TokenizerState.data) {
        this.isInDataState(charCode);
      } else if (this.state === TokenizerState.tagOpen) {
        this.isInTagOpenState(charCode);
      } else if (this.state === TokenizerState.tagName) {
        this.isInTagNameState(charCode);
      } else if (this.state === TokenizerState.endTagOpen) {
        this.isInEndTagOpenState(charCode);
      } else if (this.state === TokenizerState.selfClosingStartTag) {
        this.isInSelfClosingStartTagState(charCode);
      } else if (this.state === TokenizerState.beforeAttributeName) {
        this.isInBeforeAttributeNameState(charCode);
      } else if (this.state === TokenizerState.attributeName) {
        this.isInAttributeNameState(charCode);
      } else if (this.state === TokenizerState.beforeAttributeValue) {
        this.isInBeforeAttributeValue(charCode);
      } else if (this.state === TokenizerState.attributeValueDoubleQuoted) {
        this.isInAttributeValueDoubleQuoted(charCode);
      } else if (this.state === TokenizerState.attributeValueSingleQuoted) {
        this.isInAttributeValueSingleQuoted(charCode);
      } else if (this.state === TokenizerState.afterAttributeValueQuoted) {
        this.isInAfterAttributeValueQuoted(charCode);
      }
    }
    return this.tokens;
  }
  private emitToken() {
    if (this.currentToken) {
      this.tokens.push(this.currentToken);
      this.currentToken = null;
    }
  }
  //
  private isInDataState(charCode: number) {
    this.index++;
    if (charCode === CharCodes.lessThan) {
      this.emitToken();
      this.state = TokenizerState.tagOpen;
    } else {
      if (this.currentToken?.type === TokenType.text) {
        this.currentToken.end = this.index - 1;
        this.currentToken.name += String.fromCharCode(charCode);
      } else {
        this.currentToken = {
          start: this.index - 1,
          end: this.index - 1,
          type: TokenType.text,
          name: String.fromCharCode(charCode),
        };
      }
    }
  }

  private isInTagOpenState(charCode: number) {
    this.index++;
    if (charCode === CharCodes.slash) {
      this.state = TokenizerState.endTagOpen;
    } else if (isInEnglishAlphabet(charCode)) {
      this.currentToken = {
        start: this.index - 1,
        end: this.index - 1,
        type: TokenType.openingTag,
        name: String.fromCharCode(charCode),
        attributes: [],
      };
      this.state = TokenizerState.tagName;
    } else {
      throw new Error("Parse Error");
    }
  }

  private isInTagNameState(charCode: number) {
    this.index++;
    if (isInEnglishAlphabet(charCode)) {
      this.currentToken!.end = this.index - 1;
      this.currentToken!.name += String.fromCharCode(charCode);
    } else if (charCode === CharCodes.greaterThan) {
      this.emitToken();
      this.state = TokenizerState.data;
    } else if (charCode === CharCodes.slash) {
      this.state = TokenizerState.selfClosingStartTag;
    } else if (isWhiteSpace(charCode)) {
      this.state = TokenizerState.beforeAttributeName;
    }
  }

  private isInSelfClosingStartTagState(charCode: number) {
    this.index++;
    if (charCode === CharCodes.greaterThan) {
      this.currentToken!.type = TokenType.selfClosingOpeningTag;
      this.emitToken();
      this.state = TokenizerState.data;
    }
  }

  isInEndTagOpenState(charCode: number) {
    this.index++;
    if (isInEnglishAlphabet(charCode)) {
      this.currentToken = {
        start: this.index - 1,
        end: this.index - 1,
        type: TokenType.closingTag,
        name: String.fromCharCode(charCode),
      };
      this.state = TokenizerState.tagName;
    }
  }

  private isInBeforeAttributeNameState(charCode: number) {
    this.index++;
    if (isInEnglishAlphabet(charCode)) {
      this.currentToken!.attributes!.push({
        start: this.index - 1,
        end: this.index - 1,
        name: String.fromCharCode(charCode),
        value: "",
      });
      this.state = TokenizerState.attributeName;
    } else if (charCode === CharCodes.greaterThan) {
      this.emitToken();
      this.state = TokenizerState.data;
    } else if (charCode === CharCodes.slash) {
      this.state = TokenizerState.selfClosingStartTag;
    }
  }

  private isInAttributeNameState(charCode: number) {
    this.index++;
    if (isInEnglishAlphabet(charCode)) {
      const currentAttribute = this.currentToken!
        .attributes![this.currentToken!.attributes!.length - 1];
      currentAttribute.end = this.index - 1;
      currentAttribute.name += String.fromCharCode(charCode);
    } else if (charCode === CharCodes.slash) {
      this.state = TokenizerState.selfClosingStartTag;
    } else if (charCode === CharCodes.greaterThan) {
      this.emitToken();
      this.state = TokenizerState.data;
    } else if (charCode === CharCodes.equal) {
      this.state = TokenizerState.beforeAttributeValue;
    } else if (isWhiteSpace(charCode)) {
      this.state = TokenizerState.afterAttributeName;
    }
  }

  isInBeforeAttributeValue(charCode: number) {
    this.index++;
    if (charCode === CharCodes.doubleQuote) {
      this.state = TokenizerState.attributeValueDoubleQuoted;
    } else if (charCode === CharCodes.singleQuote) {
      this.state = TokenizerState.attributeValueSingleQuoted;
    }
  }

  isInAttributeValueDoubleQuoted(charCode: number) {
    this.index++;
    if (charCode === CharCodes.doubleQuote) {
      this.state = TokenizerState.afterAttributeValueQuoted;
    } else if (isInEnglishAlphabet(charCode)) {
      const currentAttribute = this.currentToken!
        .attributes![this.currentToken!.attributes!.length - 1];
      currentAttribute.end = this.index - 1;
      currentAttribute.value += String.fromCharCode(charCode);
    }
  }

  isInAttributeValueSingleQuoted(charCode: number) {
    this.index++;
    if (charCode === CharCodes.singleQuote) {
      this.state = TokenizerState.afterAttributeValueQuoted;
    } else if (isInEnglishAlphabet(charCode)) {
      const currentAttribute = this.currentToken!
        .attributes![this.currentToken!.attributes!.length - 1];
      currentAttribute.end = this.index - 1;
      currentAttribute.value += String.fromCharCode(charCode);
    }
  }

  isInAfterAttributeValueQuoted(charCode: number) {
    this.index++;
    if (isWhiteSpace(charCode)) {
      this.state = TokenizerState.beforeAttributeName;
    } else if (charCode === CharCodes.greaterThan) {
      this.emitToken();
      this.state = TokenizerState.data;
    } else if (charCode === CharCodes.slash) {
      this.state = TokenizerState.selfClosingStartTag;
    }
  }
}
