import {Place} from './place'

export interface Request {
  _id: string
  type: 'törlés' | 'módosítás' | 'új'
  place: Place
  comment: string
}
