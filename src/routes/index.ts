import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json([
    { name: 'Bruce Wayne', age: 33 },
    { name: 'Clark Kent', age: 28 },
    { name: 'Barry Allen', age: 21 }
  ])
})

export { routes }
