/** @format */

function unixTimestampToDate(unixTimestamp) {
  const timestampInMilliseconds = unixTimestamp * 1000;
  const date = new Date(timestampInMilliseconds);
  const formattedDate = date.toLocaleString();
  return {
    unixTimestamp: unixTimestamp,
    formattedDate: formattedDate,
  };
}

export default unixTimestampToDate;
