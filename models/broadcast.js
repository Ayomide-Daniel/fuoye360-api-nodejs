"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Broadcast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Broadcast.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
        },
      },
      post_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
        },
      },
      body: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      data: DataTypes.TEXT,
    },
    {
      sequelize,
      timestamps: true,
      updatedAt: "created_at",
      createdAt: "updated_at",
      modelName: "Broadcast",
    }
  );
  return Broadcast;
};
