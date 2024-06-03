const notFound = (request, response, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
};

export default notFound;