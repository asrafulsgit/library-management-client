import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import Router from './routes/Router.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './controllers/store.ts'

createRoot(document.getElementById('root')!).render(
  <>
  <Provider store={store}>
     <RouterProvider router={Router} />
  </Provider>
  </>,
)
