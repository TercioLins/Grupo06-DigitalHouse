module.exports = (sequelize, DataTypes) => {
    
    const AvailableHour = sequelize.define(
        "AvailableHour", {
            date: DataTypes.DATEONLY,
            hour: DataTypes.STRING,
            available: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            } 
                
        }, {
            tableName: "tbl_available_hours",
            timestamps: false
        }
    );

    return AvailableHour;
};
