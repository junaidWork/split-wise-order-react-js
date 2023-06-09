import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useSelector } from 'react-redux'

import Header from 'components/header/Header'
import Home from 'pages/home/Home'
import Login from 'pages/auth/login/Login'
import NoPage from 'pages/noPage/NoPage'
import Profile from 'pages/profile/Profile'
import Registration from 'pages/auth/registration/Registration'
import TotalBill from 'components/total-bill/TotalBill'
import UserCard from 'components/users/UserCard'

const route = [
  { path: '/', element: <Home /> },
  { path: 'login', element: <Login /> },
  { path: 'registration', element: <Registration /> },
  { path: 'usercard', element: <UserCard /> },
  { path: 'profile', element: <Profile /> },
  { path: 'totalbill', element: <TotalBill /> }
]

const AllRoutes = () => {
  const activeUser = useSelector(state => state.billSplitApp.activeUser)

  return (
    <div>
      <BrowserRouter>
        <Header />
        {!activeUser.name ? (
          <Routes>
            <Route path='*' element={<NoPage />} />
            <Route path='login' element={<Login />} />
            <Route path='registration' element={<Registration />} />
          </Routes>
        ) : (
          <Routes>
            {route.map(item => (
              <Route path={item.path} element={item.element} key={item.path} />
            ))}
          </Routes>
        )}
      </BrowserRouter>
    </div>
  )
}

export default AllRoutes
