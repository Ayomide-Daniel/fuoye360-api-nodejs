const express = require("express");
const router = express.Router();
const {
  likeBroadcast,
  unlikeBroadcast,
  rebroadcast,
  undoRebroadcast,
  addBookmark,
  removeBookmark,
} = require("../Controllers/AnalyticsController");
const { validateAnalytics } = require("../Middlewares/analytics.validation");
const { verifyUser } = require("../Middlewares/verifyUser");

module.exports = (app) => {
  /**
   * Like broadcast route
   */
  router.post(
    "/like-broadcast",
    [verifyUser, validateAnalytics],
    likeBroadcast
  );

  /**
   * Unlike broadcast route
   */
  router.delete(
    "/like-broadcast",
    [verifyUser, validateAnalytics],
    unlikeBroadcast
  );

  /**
   * Rebroadcast route
   */
  router.post("/rebroadcast", [verifyUser, validateAnalytics], rebroadcast);

  /**
   * Unrebroadcast route
   */
  router.delete(
    "/rebroadcast",
    [verifyUser, validateAnalytics],
    undoRebroadcast
  );

  /**
   * Add to bookmarks route
   */
  router.post("/bookmark", [verifyUser, validateAnalytics], addBookmark);

  /**
   * Remove from Bookmarks route
   */
  router.delete("/bookmark", [verifyUser, validateAnalytics], removeBookmark);

  app.use("/api/v1/analytics", router);
};
