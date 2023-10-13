/** @format */

function unixTimestampToTimeAgo(unixTimestamp) {
  const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
  const timeDifference = currentTime - unixTimestamp;

  const minutes = Math.floor(timeDifference / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    if (days === 1) {
      return '1 day ago';
    } else {
      return `${days} days ago`;
    }
  } else if (hours >= 1) {
    if (hours === 1) {
      return '1 hour ago';
    } else {
      return `${hours} hours ago`;
    }
  } else if (minutes >= 1) {
    if (minutes === 1) {
      return '1 minute ago';
    } else {
      return `${minutes} minutes ago`;
    }
  } else {
    return 'just now';
  }
}

export default unixTimestampToTimeAgo;
