const errorHandler = (error, request, response, next) => {
    if (error.status) {
        response.status(error.status).json({ message: error.message });
    } else {
        response.status(500).json({ message: error.message });
    }
};

export default errorHandler;