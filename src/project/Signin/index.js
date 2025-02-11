import { useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { URL } from '../../config'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const signinUser = () => {
    if (email.length === 0) {
      toast.warning('Please enter email')
    } else if (password.length === 0) {
      toast.warning('Please enter password')
    } else {
      const body = {
        email,
        password,
      }

      const url = `${URL}admin/signin`

      axios.post(url, body).then((response) => {
        const result = response.data
        console.log(result)
        if (result.status === 'success') {
          toast.success('Welcome to the application')
          const { userId, firstName, lastName, email, phoneNo , role } = result.data
          sessionStorage.setItem('userId', userId)
          sessionStorage.setItem('firstName', firstName)
          sessionStorage.setItem('lastName', lastName)
          sessionStorage.setItem('email', email)
          sessionStorage.setItem('phoneNo', phoneNo)
          sessionStorage.setItem('loginStatus', 1)
          sessionStorage.setItem('role',role)
          navigate('/home')
        } else {
          toast.error('Invalid username or password')
        }
      })
    }
  }

  return (
    <div className="container">
      <div className="card" style={{width:"600px",height:"600px"}}>
        <div className="image-section"></div>
        <div className="form-section">
          <h2>Admin Login</h2>
          <input onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" type="text" name="email" />
          <input onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" type="password" name="password" />
          <button onClick={signinUser} className="btn btn-md btn-primary" type="submit">Login</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signin
