function status(_request, response) {
  response.status(200).json({
    status: 200,
    data: "Ok",
  });
}

export default status;
