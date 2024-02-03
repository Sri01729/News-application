import { item } from './items/items.js'

export const services = (app) => {
  app.configure(item)

  // All services will be registered here
}
