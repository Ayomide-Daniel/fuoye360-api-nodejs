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
      Broadcast.belongsTo(models.User, { foreignKey: "user_id" });
      Broadcast.hasMany(models.BroadcastBookmark, {
        foreignKey: "broadcast_id",
      });
      Broadcast.hasMany(models.BroadcastLike, {
        foreignKey: "broadcast_id",
      });
      Broadcast.hasMany(models.BroadcastRetweet, {
        foreignKey: "broadcast_id",
      });
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
      post_id: DataTypes.INTEGER,
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
