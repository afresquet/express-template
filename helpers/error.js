// ERROR FUNCTION
module.exports = (code, message) => {
  let err = new Error(message);
  err.status = code;
  return err;
}