export const initialMembers = [
  {
    id: 1,
    name: "John",
    country: "Germany",
    membership_type: "Basic",
    currency: "EUR",
    annual_fee: "100",
    from_date: "30th Jun, 2016",
    to_date: "30th Jun, 2017"
  },
  {
    id: 2,
    name: "Jack",
    country: "Germany",
    membership_type: "Premium",
    currency: "EUR",
    annual_fee: "200",
    from_date: "30th Jun, 2016",
    to_date: "30th Jun, 2017"
  },
  {
    id: 3,
    name: "Jim",
    country: "India",
    membership_type: "Basic",
    currency: "INR",
    annual_fee: "5000",
    from_date: "30th Jun, 2016",
    to_date: "30th Jun, 2017"
  },
  {
    id: 4,
    name: "Jules",
    country: "India",
    membership_type: "Premium",
    currency: "INR",
    annual_fee: "10000",
    from_date: "30th Jun, 2016",
    to_date: "30th Jun, 2017"
  },
  {
    id: 5,
    name: "Jonathan",
    country: "Spain",
    membership_type: "Basic",
    currency: "EUR",
    annual_fee: "100",
    from_date: "30th Jun, 2016",
    to_date: "30th Jun, 2017"
  },
  {
    id: 6,
    name: "Just do it",
    country: "Spain",
    membership_type: "Premium",
    currency: "EUR",
    annual_fee: "100",
    from_date: "30th Jun, 2016",
    to_date: "30th Jun, 2017"
  },
  {
    id: 7,
    name: "Justice for all",
    country: "Pan Europe",
    membership_type: "Basic",
    currency: "EUR",
    annual_fee: "300",
    from_date: "30th Jun, 2016",
    to_date: "30th Jun, 2017"
  }
];
export const countries = [
  { code: "GER", description: "Germany" },
  { code: "IN", description: "India" },
  { code: "ES", description: "Spain" },
  { code: "PAN", description: "Pan Europe" },
  { code: "GLO", description: "Global" }
];

export const currencies = [
  { code: "EUR", description: "EUR - €" },
  { code: "INR", description: "INR - ₹" },
  { code: "USD", description: "USD - $" },
  { code: "GBP", description: "GBP - £" },
  { code: "JPY", description: "JPY - ¥" },
  { code: "BTC", description: "BTC - ฿" }
];
export const membershipTypes = [
  { code: "B", description: "Basic" },
  { code: "P", description: "Premium" }
];
export const chipData = [
  { filterBy: "country", filterText: "Germany", code: "GER" },
  { filterBy: "membership_type", filterText: "Basic", code: "B" },
  { filterBy: "currency", filterText: "EUR", code: "EUR" }
];
