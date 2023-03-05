const notFound = (req, res) => res.status(404).json({
    message: 'Route does not exists!',
    data: [],
    errors: [
        'Route does not exists!'
    ]
})

module.exports = notFound