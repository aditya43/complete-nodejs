const fs = require('fs');

const deleteFile = filePath => {
    fs.unlink(filePath);
};

module.exports = { deleteFile };
