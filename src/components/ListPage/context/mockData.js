import faker from "faker"
import { v4 as uuidv4 } from "uuid";
import currencyMap from "country-currency-map"

export const generateData = () => {
  const rows = []
  for (let i = 0; i < 30; i++) {
    const id = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    const country = faker.address.country()
    rows.push({
      id,
      name: faker.name.findName(),
      country,
      currency: currencyMap.getCurrencyAbbreviation(country),
      annual_fee: faker.finance.amount(),
      from_date: `${faker.date.past()}`,
      to_date: `${faker.date.future()}`,
      membership_type: i % 2 === 0 ? "Basic" : "Premium"
    })
  }
  const countriesReference = []

  const membershipTypesReference = [
    { code: "B", description: "Basic" },
    { code: "P", description: "Premium" }
  ]

  const chipData = [
    { filterBy: "membership_type", filterText: "Basic", code: "B" },
    { filterBy: "membership_type", filterText: "Premium", code: "P" }
  ]

  rows.forEach((row) => {
    const matchingCountry = countriesReference.find(country => country.code === row.country)
    if (!matchingCountry) { // checking for duplicates
      countriesReference.push({
        code: row.country,
        description: row.country
      })
    }
  })

  return [
    rows,
    countriesReference,
    membershipTypesReference,
    chipData
  ]
}
