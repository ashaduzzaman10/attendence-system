function error(msg = "something went worng", status = 500) {
  const err = new Error(msg);
  err.status = status;
  return err;
}

module.exports = error;
