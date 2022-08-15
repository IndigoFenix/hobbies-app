const db = require("../models");
const User = db.models.user;
const Hobby = db.models.hobby;

exports.create = async (data) => {
    try {
        const result = await User.create(data);
        return result;
    } catch (e) {
        console.error(e);
        return null;
    }
}

exports.findMany = async (query) => {
    const results = User.findAll({where: query})
    return results;
}

exports.deleteOne = async (id) => {
    const t = await db.sequelize.transaction();
    try {
        await User.destroy({
            where: {'id': id}
        });
        await Hobby.destroy({
            where: {'user_id': id}
        });
        await t.commit();
        return true;
    } catch (e) {
        await t.rollback();
        return false;
    }
}