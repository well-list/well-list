const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

const date = new Date();
const month = date.toLocaleString('default', { month: 'long' });
document.getElementById('date-banner').innerHTML = date.toLocaleString("en-US", options);
document.getElementById('reward-section-header').innerHTML = `${month} Rewards`