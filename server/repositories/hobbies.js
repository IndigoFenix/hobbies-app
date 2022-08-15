const db = require("../models");
const Hobby = db.models.hobby;

exports.create = async (data) => {
    try {
        const result = await Hobby.create(data);
        return result;
    } catch (e) {
        console.error(e);
        return null;
    }
}

exports.findMany = async (query) => {
    const results = Hobby.findAll({where: query})
    return results;
}

exports.deleteOne = async (id) => {
    try {
        await Hobby.destroy({
            where: {'id': id}
        });
        return true;
    } catch (e) {
        return false;
    }
}