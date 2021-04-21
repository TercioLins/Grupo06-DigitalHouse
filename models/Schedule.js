module.exports = (sequelize, DataTypes) => {

    const Schedule = sequelize.define(
        "Schedule", {
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            name: "createdAt",
            field: "created_at"
        },
    }, {
        tableName: "tbl_schedules",
        timestamps: true,
        updatedAt: false
    }
    );

    Schedule.associate = (models) => {
        // Schedule.hasOne(models.User, {foreignKey:"tbl_user_id"});
        Schedule.belongsTo(models.AvailableHour, {foreignKey: "date_hour_id"});
    }
    return Schedule;
};

