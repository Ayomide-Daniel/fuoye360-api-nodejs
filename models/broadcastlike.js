"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BroadcastLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BroadcastLike.belongsTo(models.Broadcast, {
        foreignKey: "broadcast_id",
      });
    }
  }
  BroadcastLike.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      broadcast_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      timestamps: true,
      updatedAt: "created_at",
      createdAt: "updated_at",
      modelName: "BroadcastLike",
      tableName: "Broadcast_Likes",
    }
  );
  return BroadcastLike;
};
