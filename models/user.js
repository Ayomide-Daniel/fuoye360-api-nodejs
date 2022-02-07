"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Broadcast, { foreignKey: "id" });
      User.hasMany(models.BroadcastLike, { foreignKey: "id" });
      User.hasMany(models.BroadcastRetweet, { foreignKey: "id" });
    }
  }
  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      username: {
        type: DataTypes.STRING,
        validate: {
          is: /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        },
      },
      email: {
        unique: {
          msg: "Email already exists",
        },
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "Your email is invalid",
          },
        },
      },
      phone_number: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          isTelephoneNumber(value) {
            if (value.length != 11) {
              throw new Error("Phone number is invalid");
            }
          },
        },
      },
      password: DataTypes.STRING,
      email_verified_at: DataTypes.DATE,
    },
    {
      sequelize,
      timestamps: true,
      updatedAt: "created_at",
      createdAt: "updated_at",
      modelName: "User",
    }
  );
  return User;
};
