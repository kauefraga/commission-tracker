export type Status = 'NONE' | 'STARTED' | 'ALMOST DONE' | 'DONE';

export interface Commission {
  id: string | null
  created_at: Date | null
  status: Status
  client: string
  clientSocialMedia: string
  price: number
}
