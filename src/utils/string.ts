export const formatCurrency = (value: number = 0.00, currencyStyle: string = "USD"): string => {
  const formatted = `${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: `${currencyStyle}`
  }).format(value)}`

  return formatted
}

export const capitalize = (word: string | null): string => {
  if (!word) return ""
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const formatToDecimal = (amount: string): string => {
  const decimalAmt = parseFloat(amount)
  return (decimalAmt * 100).toFixed(2)
}

// regex to look for any point in the string that has a multiple of 3 digits in a row after it,
export const numberWithCommas = (x: string | number) =>
  x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export const formatDate = (value: string) => new Date(value).toLocaleDateString();

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