module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User", {
            name: DataTypes.STRING,
            cpf: DataTypes.STRING,
            cns: DataTypes.INTEGER,
            mother_name: DataTypes.STRING,
            birth_date: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            gender: DataTypes.STRING,
            ethnicity: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            is_admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            is_vaccinated: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                name: "created_at",
                field: "created_at"
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                name: "updated_at",
                field: "updated_at"
            },
        }, {
            tableName: "tbl_users",
            timestamps: true,
        }
    );

    User.associate = (models) => {
        User.belongsTo(models.Address, {foreignKey:"address_id"});
        User.hasOne(models.Schedule, {foreignKey:"user_id"});
    }

    return User;
}