export type Material = {
  id: number
  name: string
  price: number
  image_url: string
  category: string
  available: boolean
  description: string
}
export type Category = {
  id: number
  name: string
}
export type RequestType = {
  id: number
  items: { id: number; count: number }[]
  message: string
  email: string
  status: string
  answer?: string
}
