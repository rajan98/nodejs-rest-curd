const path = require('path');
const rootDir = require('../util/path');

exports.urlNotFounError = (req, res, next) => {
    // res.status(404).send('<h1>Page Not Found</h1>');
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
};