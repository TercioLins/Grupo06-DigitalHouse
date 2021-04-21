module.exports = (sequelize, DataTypes) => {

    

    const Address = sequelize.define(

        "Address", {

            address: DataTypes.STRING,

            number: DataTypes.STRING,

            complement: DataTypes.INTEGER,

            zip_code: DataTypes.INTEGER,

            neighborhood: DataTypes.STRING,

            city: DataTypes.STRING,

            state: DataTypes.STRING,

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

            }

        }, {

            tableName: "tbl_addresses",

            timestamps: true

        }

    );

    // Address.associate = (models) => {

    //     Schedule.hasOne(models.User, {foreignKey: "address_id"});
    
    // };


    return Address;

}