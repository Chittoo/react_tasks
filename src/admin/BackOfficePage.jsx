import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import AdminLogin from './AdminLogin'

function formatTime(ts) {
  if (!ts) return ''
  if (typeof ts === 'string') return new Date(ts).toLocaleString()
  if (ts.toDate) return ts.toDate().toLocaleString()
  return ''
}

function BackOfficePage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [activeMenu, setActiveMenu] = useState('users')

  const [users, setUsers] = useState([])
  const [lists, setLists] = useState([])

  useEffect(() => {
    if (!loggedIn) return
    const unsub = onSnapshot(collection(db, 'users'), (snap) => {
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [loggedIn])

  useEffect(() => {
    if (!loggedIn) return
    const unsub = onSnapshot(collection(db, 'todoLists'), (snap) => {
      setLists(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [loggedIn])

  if (!loggedIn) {
    return <AdminLogin onLoginSuccess={() => setLoggedIn(true)} />
  }

  const allTasks = lists.flatMap((list) =>
    (list.tasks || []).map((task) => ({
      ...task,
      listTitle: list.name
    }))
  )

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '180px', borderRight: '1px solid #ddd', padding: '16px' }}>
        <h3>Back Office</h3>
        <div
          onClick={() => setActiveMenu('users')}
          style={{ padding: '8px', cursor: 'pointer', fontWeight: activeMenu === 'users' ? 'bold' : 'normal' }}
        >
          Users
        </div>
        <div
          onClick={() => setActiveMenu('taskLists')}
          style={{ padding: '8px', cursor: 'pointer', fontWeight: activeMenu === 'taskLists' ? 'bold' : 'normal' }}
        >
          Task Lists
        </div>
        <div
          onClick={() => setActiveMenu('tasks')}
          style={{ padding: '8px', cursor: 'pointer', fontWeight: activeMenu === 'tasks' ? 'bold' : 'normal' }}
        >
          Tasks
        </div>
      </div>

      <div style={{ flex: 1, padding: '16px' }}>
        {activeMenu === 'users' && (
          <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Email id</th><th>Password</th><th>Signup Time</th><th>IP</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>{u.password}</td>
                  <td>{formatTime(u.signupTime)}</td>
                  <td>{u.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeMenu === 'taskLists' && (
          <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Task List Title</th><th>Create By</th><th>No of Tasks</th><th>Creation Time</th><th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((l) => (
                <tr key={l.id}>
                  <td>{l.name}</td>
                  <td>{l.ownerEmail}</td>
                  <td>{(l.tasks || []).length}</td>
                  <td>{formatTime(l.createdAt)}</td>
                  <td>{formatTime(l.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeMenu === 'tasks' && (
          <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Task Title</th><th>Description</th><th>Task List Title</th><th>Create By</th><th>Creation Time</th>
              </tr>
            </thead>
            <tbody>
              {allTasks.map((t) => (
                <tr key={t.id}>
                  <td>{t.title}</td>
                  <td>{t.description}</td>
                  <td>{t.listTitle}</td>
                  <td>{t.createdBy}</td>
                  <td>{formatTime(t.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default BackOfficePage