module.exports = (sequelize, Sequelize) => {
    const Hobby = sequelize.define("hobby", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        hobby: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
        {
            indexes: [
                {
                    unique: false,
                    fields: ['user_id']
                }
            ]
        }
    );
    return Hobby;
};