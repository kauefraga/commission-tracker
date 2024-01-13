export type ArtWorkStatus = 'NOT STARTED' | 'STARTED' | 'ALMOST DONE' | 'DONE';
export type PaymentStatus = 'NOT PAID' | 'HALF PAID' | 'PAID';

export interface Commission {
  id?: string
  created_at?: Date
  description?: string
  artWorkStatus: ArtWorkStatus
  paymentStatus: PaymentStatus
  client: {
    name: string
    socialMediaUrl: string
  }
  price: number
}
