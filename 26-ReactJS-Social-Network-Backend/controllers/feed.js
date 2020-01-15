exports.getPosts = async (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                _id: new Date().toISOString(),
                title: 'First Post',
                content: 'First post content',
                imageUrl: 'images/macbook.png',
                creator: {
                    name: 'Aditya Hajare'
                },
                createdAt: new Date()
            }
        ]
    });
}

exports.createPost = async (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: 'Success',
        post: {
            id: new Date().toISOString(),
            title,
            content,
            imageUrl: 'images/macbook.png',
            creator: {
                name: 'Aditya Hajare'
            },
            createdAt: new Date()
        }
    });
}