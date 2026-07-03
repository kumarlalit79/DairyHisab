"use client"
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage = () => {

  const router = useRouter()

  const {login, loading} = useAuthStore()

  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const success = await login({
      mobile, password
    })

    if(success) {
      router.push("/dashboard")
    } else {
      alert("Invalid mobile number or password")
    }
  }

  return (
    <div>
      <h2>LoginPage</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Mobile Number</label>
          <br />
          <input className='border' type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>

        <br />

        <div>
          <label>Password</label>

          <br />

          <input  className='border'  type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <br />

        <button className='bg-red-400'>
          {loading ? "Loggin in.." : "Login"}
        </button>        

      </form>
    </div>
  )
}

export default LoginPage