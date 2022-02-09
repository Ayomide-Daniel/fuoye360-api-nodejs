"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BroadcastBookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BroadcastBookmark.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  BroadcastBookmark.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      post_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      timestamps: true,
      updatedAt: "created_at",
      createdAt: "updated_at",
      modelName: "BroadcastBookmark",
      tableName: "broadcast_bookmarks",
    }
  );
  return BroadcastBookmark;
};
