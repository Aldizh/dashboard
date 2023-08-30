export type Member = {
  id: string, // uuid string
  name: string,
  country: string,
  currency: string, // formatted currency
  annual_fee: string
  from_date: string,
  to_date: string,
  membership_type: string
}

export type Members = Array<{
  id: number,
  name: string,
  country: string,
  currency: string,
  annual_fee: string
  from_date: string,
  to_date: string,
  membership_type: string
}>

export type Chips = Array<{
  code: string,
  filterBy: string,
  filterText: string,
}>