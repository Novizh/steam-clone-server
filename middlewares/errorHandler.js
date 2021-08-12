function errorHandler(error, request, response, next) {
    switch (error.code) {
        case 400:
            response.status(400).json({message: error.message});
            break;
        case 401:
            response.status(401).json({message: error.message});
            break;
        case 403:
            response.status(403).json({message: error.message});
            break;
        case 404:
            response.status(404).json({message: error.message});
            break;
        default:
            response.status(500).json({message: error.message});
            break;
    }
}

module.exports = errorHandler;