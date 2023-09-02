"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = exports.formatCurrency = void 0;
var formatCurrency = function (value, currencyStyle) {
    if (value === void 0) { value = 0.00; }
    if (currencyStyle === void 0) { currencyStyle = 'USD'; }
    var formatted = "".concat(new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "".concat(currencyStyle)
    }).format(value));
    return formatted;
};
exports.formatCurrency = formatCurrency;
var capitalize = function (word) {
    if (!word)
        return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
};
exports.capitalize = capitalize;
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
