const getTimestamp = () => new Date().getTime();

const generateMessage = (text) => {
    return {
        text,
        createdAt: getTimestamp()
    };
};

const generateLocationMessage = (url) => {
    return {
        url,
        createdAt: getTimestamp()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
};
