exports.relativeAt = (timestamp) => {
  const time_ago = Date.parse(timestamp),
    default_time_ago = new Date(timestamp),
    today = new Date(),
    current_time = Date.parse(today),
    time_difference = current_time - time_ago,
    seconds = time_difference,
    minutes = Math.round(seconds / 60), // value 60 is seconds
    hours = Math.round(seconds / 3600), //value 3600 is 60 minutes * 60 sec
    days = Math.round(seconds / 86400), //86400 = 24 * 60 * 60;
    weeks = Math.round(seconds / 604800), // 7*24*60*60;
    months = Math.round(seconds / 2629440), //((365+365+365+365+366)/5/12)*24*60*60
    years = Math.round(seconds / 31553280),
    month_names = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]; //(365+365+365+365+366)/5 * 24 * 60 * 60

  if (seconds <= 60) {
    return "1s";
  } else if (minutes <= 60) {
    if (minutes == 1) {
      return "1m";
    } else {
      return minutes + "m";
    }
  } else if (hours <= 24) {
    if (hours == 1) {
      return "1hr";
    } else {
      return hours + "hrs";
    }
  } else if (days <= 7) {
    if (days == 1) {
      return "1d";
    } else {
      return days + "d";
    }
  } else {
    const default_time_ago_month = default_time_ago.getMonth();
    const month_name = month_names[default_time_ago_month];
    return `${default_time_ago.getDate()} ${month_name.substr(0, 3)}`;
    // '${default_time_ago.getFullYear().toString().substr(2, 4)}`;
  }
};
