import faker from 'faker'
import { find, prop, propEq, uniqBy } from 'ramda'

export const generateData = () => {
  const rows = []
  for (let i = 0; i < 10; i++) {
    rows.push({
      id: i,
      name: faker.name.findName(),
      country: faker.address.country(),
      currency: faker.finance.currencySymbol(),
      annual_fee: faker.finance.amount(),
      from_date: `${faker.date.past()}`,
      to_date: `${faker.date.future()}`,
      membership_type: i % 2 === 0 ? 'Basic' : 'Premium'
    })
  }
  const currenciesReference = []
  const countriesReference = []

  const membershipTypesReference = [{ code: 'B', description: 'Basic' }, { code: 'P', description: 'Premium' }]

  const chipData = [
    { filterBy: 'membership_type', filterText: 'Basic', code: 'B' },
    { filterBy: 'membership_type', filterText: 'Premium', code: 'P' }
  ]

  rows.forEach((row) => {
    if (!find(propEq('code', row.currency))(currenciesReference)) {
      currenciesReference.push({
        code: row.currency,
        description: row.currency
      })
    }
    if (!find(propEq('code', row.country))(countriesReference)) {
      countriesReference.push({
        code: row.country,
        description: row.country
      })
    }
  })

  return [
    uniqBy(prop('id'), rows),
    countriesReference,
    currenciesReference,
    membershipTypesReference,
    chipData
  ]
}
