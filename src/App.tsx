import './App.css'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import VerifyMatch from './components/VerifyMatch';
import NotFound from './components/NotFound';
import RequireAuth from './components/RequireAuth';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { io, Socket } from "socket.io-client";

const socket: Socket = io(import.meta.env.VITE_SOCKET_URL as string, {
  auth: {
    'token': localStorage.getItem("token"),
  }
});

const router = createBrowserRouter([
  ...createRoutesFromElements(
    <Route path="/" >
      <Route path="/" element={<RequireAuth />} >
        <Route index element={<VerifyMatch socket={socket} />} />
      </Route>
      <Route path="/auth" >
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route >
      <Route path="*" element={<NotFound />} />
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
