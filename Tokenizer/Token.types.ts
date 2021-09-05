export enum TokenType {
  openingTag = "Opening Tag",
  selfClosingOpeningTag = "Self Closing Opening Tag",
  Attribute = "Attribute",
  closingTag = "Closing Tag",
  text = "Text",
}

export type Attribute = {
  start: number;
  end: number;
  name: string;
  value?: string;
};

export type Token = {
  start: number;
  end: number;
  type: TokenType;
  name: string;
  attributes?: Attribute[];
};
