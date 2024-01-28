const requestLogger = (req, res, next) => {
    console.log("Method: ", req.method);
    console.log("Path: ", req.path);
    console.log("Body: ", req.body);
    console.log("Time: ", new Date().toLocaleTimeString("en-CA"));
    console.log("---");
    next();
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: "Unknown Endpoint"});
}

const errorHandler = (error, req, res, next) => {
    console.log(error.message);

    next(error);
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}