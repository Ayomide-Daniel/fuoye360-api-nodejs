"use strict";
const { Model } = require("sequelize");
const { relativeAt } = require("../src/Helpers/modifiers");
module.exports = (sequelize, DataTypes) => {
  class Broadcast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Broadcast.belongsTo(models.User, { foreignKey: "user_id" });
      // Broadcast.hasMany(models.BroadcastBookmark, {
      //   foreignKey: "broadcast_id",
      // });
      // Broadcast.hasMany(models.BroadcastLike, {
      //   foreignKey: "broadcast_id",
      // });
      // Broadcast.hasMany(models.BroadcastRetweet, {
      //   foreignKey: "broadcast_id",
      // });
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
      origin_broadcast_id: DataTypes.INTEGER,
      body: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      media: DataTypes.TEXT,
      relative_at: {
        type: DataTypes.VIRTUAL,
        get() {
          return relativeAt(this.created_at);
        },
      },
      meta: {
        type: DataTypes.VIRTUAL,
        get() {
          const meta = {};
          meta.is_thread = this.origin_broadcast_id == null ? false : true;
          return meta;
        },
      },
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
