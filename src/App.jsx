import { useState } from 'react'

function App() {
  // ---------------- Task 1: Simple JSX ----------------
  const jsxSection = (
    <div>
      <h1 style={styles.heading}>Task 1: Display Simple JSX</h1>
      <p>This is a simple paragraph written using JSX.</p>
      <p>My name is <b>Megha</b> and I am learning React!</p>
    </div>
  )

  // ---------------- Task 2: Array of records ----------------
  const students = [
    { id: 1, name: 'Rahul', marks: 85 },
    { id: 2, name: 'Priya', marks: 92 },
    { id: 3, name: 'Aman', marks: 78 }
  ]

  // ---------------- Task 3: Show/Hide element ----------------
  const [isVisible, setIsVisible] = useState(true)

  // ---------------- Task 4: Enable/Disable a button ----------------
  const [isEnabled, setIsEnabled] = useState(false)

  // ---------------- Task 5: 2-way data binding using textbox ----------------
  const [nameInput, setNameInput] = useState('')

  // ---------------- Task 6: Dynamically add child components ----------------
  const [childList, setChildList] = useState([])

  function addChild() {
    const newChild = {
      id: Date.now(),
      text: 'Child component #' + (childList.length + 1)
    }
    setChildList([...childList, newChild])
  }

  function ChildBox({ text }) {
    return (
      <div style={{ border: '1px solid #999', padding: '8px', margin: '5px 0', borderRadius: '5px' }}>
        {text}
      </div>
    )
  }

  // ---------------- Task 7: Sum of two numbers ----------------
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const sum = Number(num1 || 0) + Number(num2 || 0)

  // ================= BIG TASK 2: Counter =================
  const [counter, setCounter] = useState(0)

  // ================= BIG TASK 3: Search filter =================
  const fruits = ['Apple', 'Banana', 'Mango', 'Orange', 'Grapes', 'Pineapple', 'Papaya']
  const [searchText, setSearchText] = useState('')

  // This creates a NEW array containing only the fruits that match what's typed
  const filteredFruits = fruits.filter((fruit) =>
    fruit.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '600px', margin: '0 auto' }}>

      {jsxSection}
      <hr style={styles.hr} />

      <h1 style={styles.heading}>Task 2: Display Array of Records</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} — Marks: {student.marks}
          </li>
        ))}
      </ul>
      <hr style={styles.hr} />

      <h1 style={styles.heading}>Task 3: Show/Hide Element</h1>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
      {isVisible && (
        <p>This paragraph can be shown or hidden by clicking the button above!</p>
      )}
      <hr style={styles.hr} />

      <h1 style={styles.heading}>Task 4: Enable/Disable a Button</h1>
      <label>
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={() => setIsEnabled(!isEnabled)}
        />
        {' '}Check this to enable the button below
      </label>
      <br /><br />
      <button disabled={!isEnabled}>
        {isEnabled ? 'I am clickable now!' : 'I am disabled'}
      </button>
      <hr style={styles.hr} />

      <h1 style={styles.heading}>Task 5: 2-Way Data Binding</h1>
      <input
        type="text"
        placeholder="Type your name..."
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <p>You typed: <b>{nameInput}</b></p>
      <hr style={styles.hr} />

      <h1 style={styles.heading}>Task 6: Dynamically Add Child Components</h1>
      <button onClick={addChild}>Add a new child component</button>
      <div style={{ marginTop: '10px' }}>
        {childList.map((child) => (
          <ChildBox key={child.id} text={child.text} />
        ))}
      </div>
      <hr style={styles.hr} />

      <h1 style={styles.heading}>Task 7: Sum of Two Numbers</h1>
      <input
        type="number"
        placeholder="Number 1"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        style={{ width: '100px', marginRight: '10px' }}
      />
      +
      <input
        type="number"
        placeholder="Number 2"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        style={{ width: '100px', margin: '0 10px' }}
      />
      <p>Sum = <b>{sum}</b></p>
      <hr style={styles.hr} />

      <h1 style={styles.heading}>Big Task 2: Counter</h1>
      <button onClick={() => setCounter(counter - 1)}>Decrease</button>
      <span style={{ margin: '0 15px', fontSize: '20px' }}>{counter}</span>
      <button onClick={() => setCounter(counter + 1)}>Increase</button>
      <hr style={styles.hr} />

      <h1 style={styles.heading}>Big Task 3: Search Filter</h1>
      <input
        type="text"
        placeholder="Search fruits..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ul>
        {filteredFruits.length > 0 ? (
          filteredFruits.map((fruit, index) => <li key={index}>{fruit}</li>)
        ) : (
          <li>No matching fruits found</li>
        )}
      </ul>

    </div>
  )
}

const styles = {
  heading: {
    fontSize: '22px',
    lineHeight: '1.4',
    marginTop: '10px',
    marginBottom: '15px'
  },
  hr: {
    margin: '30px 0'
  }
}

export default App