import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import route from './router';

const App = () => {
  return <RouterProvider router={createBrowserRouter(route)} />
}

export default App