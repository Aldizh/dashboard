type MetaData = {
  ['1. Information']: string
  ['2. Symbol']: string
  ['3. Last Refreshed']: string
  ['4. Interval']: string
  ['5. Output Size']: string
  ['6. Time Zone']: string
};

type TimeSeries = {
  ['Time Series (15min)']: object
};

export type {
  MetaData,
  TimeSeries
}