import Home from '../views/Home'

const lazyload = name => require(`@/views/${name}.js`).default

export const createRoutes = (store) => ({
  path: '/',
  component: Home
})

export default createRoutes
