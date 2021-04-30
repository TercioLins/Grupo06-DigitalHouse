module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define(
        "Schedule",
        {
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                name: "created_at",
                field: "created_at"
            }
        },
        {
            tableName: "tbl_schedules",
            timestamps: true,
            updatedAt: false
        }
    );

    Schedule.associate = (models) => {
        Schedule.belongsTo(models.User, {foreignKey: "user_id"});
        Schedule.belongsTo(models.AvailableHour, {
            foreignKey: "date_hour_id",
        });
    };

    return Schedule;
};
