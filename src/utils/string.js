// import moment from "utils/moment";

export const substitute = (template, obj) => {
  return template.replace(/\${([a-z0-9_]+)}/gi, (match, capture) => {
    return obj[capture]
  })
}

// function to format currency - takes in value and the currencyStyle
export const formatCurrency = (value, currencyStyle = 'USD') =>
  `${new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: `${currencyStyle}`,
  }).format(value)}`

// // function to format date to normal form
// export const formatDate = value => moment(new Date(value)).format("MM/DD/YYYY");

// // function to fomrat time to hh:mm:ss
// export const formatTime = value => {
//   return moment.tz(value, "America/Los_Angeles").format("HH:mm:ss");
// };

// // function to fomrat date to MM/DD/YYYY pacific
// export const formatDateInPacific = value =>
//   moment.tz(value, "America/Los_Angeles").format("MM/DD/YYYY");

// // function to fomrat date time to MM/DD/YYYY HH:mm:ss z pacific
// export const formatDateTimeInPacific = (value, format) =>
//   //momentTimezone.tz(value, 'America/Los_Angeles').format(format)
//   "";

// // function to format date to normal form ignoring timeZone
// export const formatDateIgnoringTimeZone = value =>
//   moment.utc(value).format("MM/DD/YYYY");

// // function to format date and time to normal form
// export const formatDateTimeIgnoringTimeZone = value =>
//   moment(new Date(value)).format("MM/DD/YYYY HH:mm:ss");

export const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1)
