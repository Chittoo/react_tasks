import { useState, useEffect } from 'react'
import { auth, db } from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {
  collection, addDoc, query, where, onSnapshot, updateDoc, doc, serverTimestamp
} from 'firebase/firestore'

function TodoApp() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  const [lists, setLists] = useState([])
  const [newListName, setNewListName] = useState('')

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [taskDueDate, setTaskDueDate] = useState('')
  const [taskPriority, setTaskPriority] = useState('Medium')
  const [selectedListId, setSelectedListId] = useState('')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (!user) {
      setLists([])
      return
    }
    const q = query(collection(db, 'todoLists'), where('userId', '==', user.uid))
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      setLists(data)
    })
    return () => unsub()
  }, [user])

  async function handleSignup() {
    setAuthError('')
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)

      let ip = ''
      try {
        const res = await fetch('https://api.ipify.org?format=json')
        const data = await res.json()
        ip = data.ip
      } catch {
        ip = 'unknown'
      }

      await addDoc(collection(db, 'users'), {
        uid: cred.user.uid,
        email,
        password,
        signupTime: serverTimestamp(),
        ip
      })
    } catch (err) {
      setAuthError(err.message)
    }
  }

  async function handleLogin() {
    setAuthError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setAuthError(err.message)
    }
  }

  async function handleLogout() {
    await signOut(auth)
  }

  async function createList() {
    if (!newListName.trim()) return
    await addDoc(collection(db, 'todoLists'), {
      userId: user.uid,
      ownerEmail: user.email,
      name: newListName,
      tasks: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    setNewListName('')
  }

  async function addTask() {
    if (!taskTitle.trim() || !selectedListId) return
    const list = lists.find((l) => l.id === selectedListId)
    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      description: taskDesc,
      dueDate: taskDueDate,
      priority: taskPriority,
      createdAt: new Date().toISOString(),
      createdBy: user.email
    }
    const updatedTasks = [...list.tasks, newTask]
    await updateDoc(doc(db, 'todoLists', selectedListId), {
      tasks: updatedTasks,
      updatedAt: serverTimestamp()
    })
    setTaskTitle('')
    setTaskDesc('')
    setTaskDueDate('')
    setTaskPriority('Medium')
  }

  function handleDragStart(e, taskId, listId) {
    e.dataTransfer.setData('taskId', taskId)
    e.dataTransfer.setData('sourceListId', listId)
  }

  function handleDragOver(e) {
    e.preventDefault()
  }

  async function handleDropOnList(e, targetListId) {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('taskId')
    const sourceListId = e.dataTransfer.getData('sourceListId')
    if (sourceListId === targetListId) return

    const sourceList = lists.find((l) => l.id === sourceListId)
    const targetList = lists.find((l) => l.id === targetListId)
    const task = sourceList.tasks.find((t) => t.id === taskId)

    const updatedSourceTasks = sourceList.tasks.filter((t) => t.id !== taskId)
    const updatedTargetTasks = [...targetList.tasks, task]

    await updateDoc(doc(db, 'todoLists', sourceListId), { tasks: updatedSourceTasks, updatedAt: serverTimestamp() })
    await updateDoc(doc(db, 'todoLists', targetListId), { tasks: updatedTargetTasks, updatedAt: serverTimestamp() })
  }

  async function handleDropOnPriority(e, listId, newPriority) {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('taskId')
    const list = lists.find((l) => l.id === listId)

    const updatedTasks = list.tasks.map((t) =>
      t.id === taskId ? { ...t, priority: newPriority } : t
    )
    await updateDoc(doc(db, 'todoLists', listId), { tasks: updatedTasks, updatedAt: serverTimestamp() })
  }

  if (!user) {
    return (
      <div style={{ maxWidth: '350px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '6px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '6px' }}
        />
        <button onClick={handleSignup} style={{ marginRight: '10px' }}>Sign Up</button>
        <button onClick={handleLogin}>Login</button>
        {authError && <p style={{ color: 'red' }}>{authError}</p>}
      </div>
    )
  }

  return (
    <div>
      <p>Logged in as <b>{user.email}</b> — <button onClick={handleLogout}>Logout</button></p>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="New list name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button onClick={createList}>Create List</button>
      </div>

      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h4>Add a Task</h4>
        <select value={selectedListId} onChange={(e) => setSelectedListId(e.target.value)}>
          <option value="">-- Select a list --</option>
          {lists.map((l) => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>
        <br /><br />
        <input placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
        <input placeholder="Description" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} style={{ marginLeft: '8px' }} />
        <input type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} style={{ marginLeft: '8px' }} />
        <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} style={{ marginLeft: '8px' }}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button onClick={addTask} style={{ marginLeft: '8px' }}>Add Task</button>
      </div>

      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        {lists.map((list) => (
          <div
            key={list.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDropOnList(e, list.id)}
            style={{ border: '1px solid #999', borderRadius: '6px', width: '260px', minHeight: '200px' }}
          >
            <div style={{ background: '#eef', padding: '8px', fontWeight: 'bold' }}>{list.name}</div>

            <div style={{ display: 'flex', gap: '5px', padding: '6px' }}>
              {['Low', 'Medium', 'High'].map((p) => (
                <div
                  key={p}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropOnPriority(e, list.id, p)}
                  style={{ flex: 1, textAlign: 'center', fontSize: '11px', background: '#f5f5f5', border: '1px dashed #aaa', padding: '3px' }}
                >
                  {p}
                </div>
              ))}
            </div>

            <div style={{ padding: '8px' }}>
              {list.tasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, list.id)}
                  style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '4px', padding: '6px', marginBottom: '6px', cursor: 'grab' }}
                >
                  <b>{task.title}</b> <span style={{ fontSize: '11px', color: '#888' }}>({task.priority})</span>
                  <div style={{ fontSize: '12px' }}>{task.description}</div>
                  {task.dueDate && <div style={{ fontSize: '11px', color: '#666' }}>Due: {task.dueDate}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoApp