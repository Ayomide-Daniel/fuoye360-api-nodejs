const { IncomingWebhook } = require("@slack/webhook");
const { errorResponse } = require("./response");

// Read a url from the environment variables
const url = process.env.SLACK_WEBHOOK_URL;

// Initialize
const webhook = new IncomingWebhook(url);

exports.resolveError = async (req, res, err) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err);
    return errorResponse(res, 500, "An error occured", null);
  }
  await webhook.send({
    text: JSON.stringify({
      user: req.user,
      error,
    }),
  });
  return errorResponse(res, 500, "An error occured", null);
};

exports.slackNotification = async (user, message) => {
  await webhook.send({
    text: JSON.stringify({
      user,
      message,
    }),
  });
};
