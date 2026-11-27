const response = (res, statusCode, message, data) => {
  const body = {
    code: statusCode,
    status: statusCode < 400 ? "success" : "fail",
    message,
  };

  if (data !== undefined) {
    body.data = data;
  }

  return res.status(statusCode).json(body);
};

export default response;
