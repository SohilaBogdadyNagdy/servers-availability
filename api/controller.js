exports.findServers = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    try {
        res.status(200).send({
            success: 'true',
            message: 'servers retrieved successfully',
        });

    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}