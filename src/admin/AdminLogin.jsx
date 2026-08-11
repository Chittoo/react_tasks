import { useState } from 'react'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

function AdminLogin({ onLoginSuccess }) {
  const [userid, setUserid] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin() {
    setError('')
    const snap = await getDoc(doc(db, 'adminConfig', 'main'))
    if (!snap.exists()) {
      setError('Admin config not found')
      return
    }
    const data = snap.data()
    if (data.userid === userid && data.password === password) {
      onLoginSuccess()
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div style={{ maxWidth: '320px', margin: '80px auto' }}>
      <h2>Back Office Login</h2>
      <input
        placeholder="User ID"
        value={userid}
        onChange={(e) => setUserid(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '6px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '6px' }}
      />
      <button onClick={handleLogin} style={{ width: '100%', padding: '8px' }}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default AdminLogin