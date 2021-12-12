import faker from 'faker'
import { find, prop, propEq, uniqBy } from 'ramda'

export const generateData = () => {
  let rows = []
  for (var i = 0; i < 10; i++) {
    rows.push({
      id: i,
      name: faker.name.findName(),
      country: faker.address.country(),
      currency: faker.finance.currencySymbol(),
      annual_fee: faker.random.alphaNumeric(),
      from_date: `${faker.date.past()}`,
      to_date: `${faker.date.future()}`,
      membership_type: 'Basic',
    })
  }
  let currenciesReference = []
  let countriesReference = []

  const membershipTypesReference = [{ code: 'B', description: 'Basic' }]

  const chipData = [
    { filterBy: 'membership_type', filterText: 'Basic', code: 'B' },
  ]

  rows.forEach((row) => {
    if (!find(propEq('code', row.currency))(currenciesReference))
      currenciesReference.push({
        code: row.currency,
        description: row.currency,
      })
    if (!find(propEq('code', row.country))(countriesReference))
      countriesReference.push({
        code: row.country,
        description: row.country,
      })
  })

  return [
    uniqBy(prop('id'), rows),
    countriesReference,
    currenciesReference,
    membershipTypesReference,
    chipData,
  ]
}
