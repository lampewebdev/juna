export enum TokenizerState {
  Start = "Start",
  text = "Text",
  beforeOpeningTagName = "Before opening Tag name",
  isInsideOpeningTagName = "Is inside opening Tag name",
  afterOpeningTagName = "After opening Tag name",
  beforeClosingTagName = "Before closing Tag name",
  isInsideClosingTagName = "Is inside closing Tag name",
  afterClosingTagName = "After closing Tag name",
  End = "End"
}
