import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { collection, getDocs } from 'firebase/firestore'
import { db } from 'firestoreConfig'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loginUserHandler } from 'helperFunctions/authHelper'
import { USER_COLLECTION } from 'constants/dbNames'
import { validate } from 'helperFunctions/validationHelper'
import Input from 'components/elements/input/Input'

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [login, setLogin] = useState({ users: [], flag: false, error: {} })

  const disptach = useDispatch()
  const nav = useNavigate()

  const userCollection = collection(db, USER_COLLECTION)
  const inputList = [
    { value: loginData.email, name: 'email', type: 'email' },
    { value: loginData.password, name: 'password', type: 'password' }
  ]

  const getUser = async () => {
    const res = await getDocs(userCollection)
    setLogin({ ...login, users: res.docs.map(doc => ({ ...doc.data(), id: doc.id })) })
  }

  const handleChange = event => {
    const { name, value } = event.target
    setLoginData({
      ...loginData,
      [name]: value.trim()
    })
  }

  validate(loginData.email, loginData.password)

  const loginUser = () => {
    const user = { email: loginData.email, password: loginData.password }
    const errors = validate(loginData.email, loginData.password)
    setLogin({ ...login, error: errors } || {})
    if (errors) return

    loginUserHandler(login.users, user, setLoginData, login, setLogin, disptach, nav)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className='mt-5 p-5 col-lg-4 col-md-6 col-sm-7 container shadow-lg p-3 bg-body rounded'>
      <div className='form-outline mb-4'>
        {inputList.map(item => (
          <Input
            type={item.type}
            name={item.name}
            handleChange={handleChange}
            value={item.value}
            error={login.error}
            key={item.name}
          />
        ))}
      </div>
      {login.flag && (
        <p className='text-danger'> The email or password you entered is incorrect.</p>
      )}
      <button
        type='button'
        className='btn btn-success btn-block mb-4'
        onClick={() => {
          loginUser()
        }}
      >
        Sign in
      </button>
      <div className='text-center'>
        Not a member? <Link to='/registration'>Register</Link>
      </div>
    </div>
  )
}

export default Login
