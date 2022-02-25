module.exports = (app) => {
  /**
   * Authentication Routes
   */
  require("./auth")(app);

  /**
   * User Routes
   */
  require("./user")(app);

  /**
   * Broadcast Routes
   */
  require("./broadcast")(app);

  /**
   * Analytic Routes
   */
  require("./analytics")(app);

  /**
   * Images Route
   */
  require("./image")(app);
};
