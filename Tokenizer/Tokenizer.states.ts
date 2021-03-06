export enum TokenizerState {
  data = "Data State",
  tagOpen = "Tag open State",
  endTagOpen = "End Tag open State",
  tagName = "Tag Name State",
  selfClosingStartTag = "Self-closing start tag state",
  beforeAttributeName = "Before Attribute name State",
  attributeName = "Attribute name State",
  beforeAttributeValue = "Before Attribute value State",
  attributeValue = "Attribute value State",
  afterAttributeName = "After Attribute name State",
  attributeValueDoubleQuoted = "Attribute value (double-quoted) State",
  attributeValueSingleQuoted = "Attribute value (single-quoted) State",
  afterAttributeValueQuoted = "After Attribute value (quoted) State",
  // text = "Text",
  // beforeOpeningTagName = "Before opening Tag name",
  // isInsideOpeningTagName = "Is inside opening Tag name",
  // afterOpeningTagName = "After opening Tag name",
  // beforeClosingTagName = "Before closing Tag name",
  // isInsideClosingTagName = "Is inside closing Tag name",
  // afterClosingTagName = "After closing Tag name",
  // beforeAttributeName = "Before attribute name",
  // isInsideAttributeName = "Is inside attribute name",
  // End = "End",
}
