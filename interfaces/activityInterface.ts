export interface IActivityInterface {
  id: number,
  uid: number,
  movieid: number,
  rating?: number,
  friendid?: number,
  createdAt: Date,
  updatedAt: Date,
  type: string
}