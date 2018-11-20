// @flow

export default (typeString: string): string => {
  if (typeString.search('-') > -1 && typeString.search("'") === -1) {
    return "'" + typeString + "'"
  }

  return typeString
}
