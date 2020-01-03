const getTimestamp = () => new Date().getTime();

const generateMessage = (username, text) => {
    return {
        username,
        text,
        createdAt: getTimestamp()
    };
};

const generateLocationMessage = (username, url) => {
    return {
        username,
        url,
        createdAt: getTimestamp()
    };
};

module.exports = {
    generateMessage,
    generateLocationMessage
};
