export interface Member {
  id: string, // uuid string
  name: string,
  country: string,
  currency: string, // formatted currency
  annual_fee: string
  from_date: string,
  to_date: string,
  membership_type: string
}

export interface ToastType {
  id: number
  title: string
  description: string
  backgroundColor: string
  icon: string
}

interface Chip {
  code: string,
  filterBy: string,
  filterText: string,
} 

export type Members = Array<Member>
export type Chips = Array<Chip>
