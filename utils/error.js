function error(msg = "Something Went Wrong", status = 500) {
  const err = new Error(msg);
  err.status = status;
  return err;
}

module.exports = error;
