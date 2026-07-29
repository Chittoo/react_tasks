import { useState } from 'react'

function App() {
  // ---------------- Array of records ----------------
  const students = [
    { id: 1, name: 'Rahul', marks: 85 },
    { id: 2, name: 'Priya', marks: 92 },
    { id: 3, name: 'Aman', marks: 78 }
  ]

  // ---------------- Show/Hide element ----------------
  const [isVisible, setIsVisible] = useState(true)

  // ---------------- Enable/Disable a button ----------------
  const [isEnabled, setIsEnabled] = useState(false)

  // ---------------- 2-way data binding using textbox ----------------
  const [nameInput, setNameInput] = useState('')

  // ---------------- Dynamically add child components ----------------
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

  // ---------------- Sum of two numbers ----------------
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const sum = Number(num1 || 0) + Number(num2 || 0)

  // ================= Task 2: Counter =================
  const [counter, setCounter] = useState(0)

  // ================= Task 3: Search filter =================
  const fruits = ['Apple', 'Banana', 'Mango', 'Orange', 'Grapes', 'Pineapple', 'Papaya']
  const [searchText, setSearchText] = useState('')
  const filteredFruits = fruits.filter((fruit) =>
    fruit.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '600px', margin: '0 auto' }}>

      {/* ============ TASK 1 — all 7 small learning tasks inside ============ */}
      <h1 style={styles.mainHeading}>Task 1: Small Programming Learning Tasks</h1>

      <div style={styles.subSection}>
        <p>This is a simple paragraph written using JSX.</p>
        <p>My name is <b>Megha</b> and I am learning React!</p>
      </div>

      <div style={styles.subSection}>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.name} — Marks: {student.marks}
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.subSection}>
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Hide' : 'Show'}
        </button>
        {isVisible && (
          <p>This paragraph can be shown or hidden by clicking the button above!</p>
        )}
      </div>

      <div style={styles.subSection}>
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
      </div>

      <div style={styles.subSection}>
        <input
          type="text"
          placeholder="Type your name..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <p>You typed: <b>{nameInput}</b></p>
      </div>

      <div style={styles.subSection}>
        <button onClick={addChild}>Add a new child component</button>
        <div style={{ marginTop: '10px' }}>
          {childList.map((child) => (
            <ChildBox key={child.id} text={child.text} />
          ))}
        </div>
      </div>

      <div style={styles.subSection}>
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
      </div>

      <hr style={styles.hr} />

      {/* ============ TASK 2 — Counter ============ */}
      <h1 style={styles.mainHeading}>Task 2: Create a Counter</h1>
      <button onClick={() => setCounter(counter - 1)}>Decrease</button>
      <span style={{ margin: '0 15px', fontSize: '20px' }}>{counter}</span>
      <button onClick={() => setCounter(counter + 1)}>Increase</button>

      <hr style={styles.hr} />

      {/* ============ TASK 3 — Search Filter ============ */}
      <h1 style={styles.mainHeading}>Task 3: Build Search Filter</h1>
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
  mainHeading: {
    fontSize: '24px',
    lineHeight: '1.4',
    marginTop: '20px',
    marginBottom: '20px'
  },
  subSection: {
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '1px dashed #ddd'
  },
  hr: {
    margin: '35px 0'
  }
}

export default App