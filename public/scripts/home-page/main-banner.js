export function initializeMainBanner(date) {
  setMainBannerDateLabel(date);
}

export function setMainBannerDateLabel(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.getElementById('date-banner').innerHTML = date.toLocaleString("en-US", options);
}