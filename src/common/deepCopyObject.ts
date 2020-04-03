export default (object: object) => {
  return JSON.parse(JSON.stringify(object))
}
