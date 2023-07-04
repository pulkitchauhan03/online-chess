import './App.css'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Home from './pages/match/Home';
import RequireAuth from './components/RequireAuth';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL as string, {
  auth: {
    'token': localStorage.getItem("token"),
  }
});

const router = createBrowserRouter([
  ...createRoutesFromElements(
    <Route path="/" >
      <Route path="match" element={<RequireAuth />} >
        <Route index element={<Home socket={socket} />} />
      </Route>
      <Route path="/auth" >
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route >
    </Route >
  )
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
