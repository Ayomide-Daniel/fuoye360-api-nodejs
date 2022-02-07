"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BroadcastRetweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BroadcastRetweet.belongsTo(models.Broadcast, {
        foreignKey: "broadcast_id",
      });
    }
  }
  BroadcastRetweet.init(
    {
      user_id: DataTypes.INTEGER,
      broadcast_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: true,
      updatedAt: "created_at",
      createdAt: "updated_at",
      modelName: "BroadcastRetweet",
    }
  );
  return BroadcastRetweet;
};
