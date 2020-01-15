exports.getPosts = async (req, res, next) => {
    res.status(200).json({ message: 'working' });
}

exports.createPost = async (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: 'Success',
        post: {
            id: new Date().toISOString(),
            title,
            content
        }
    });
}