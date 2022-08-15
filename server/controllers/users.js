const userService = require('../services/users');

exports.create = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).send({ message: 'No data sent in body' });
        }
        const user = await userService.create(req.body);
        if (user.error) {
            return res.status(user.code).send({ message: user.error });
        }

        const result = user.toJSON();

        res.status(201).json(result);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
};

exports.all = async (req, res, next) => {
    try {
        const result = await userService.all();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
};

exports.delete = async (req, res, next) => {
    try {
        const result = await userService.delete(req.params.id);
        if (result.error) {
            return res.status(result.code).send({ message: result.error });
        }
        if (result.success){
            res.status(200).json({ result });
        } else {
            res.status(400).json({ result });
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
};