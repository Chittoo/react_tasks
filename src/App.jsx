import { useState } from 'react'

function App() {
  // ---------------- Array of records (Task 1 part) ----------------
  const students = [
    { id: 1, name: 'Rahul', marks: 85 },
    { id: 2, name: 'Priya', marks: 92 },
    { id: 3, name: 'Aman', marks: 78 }
  ]

  // ---------------- Show/Hide element ----------------
  const [isVisible, setIsVisible] = useState(true)

  // ---------------- Enable/Disable a button ----------------
  const [isEnabled, setIsEnabled] = useState(false)

  // ---------------- 2-way data binding ----------------
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

  // ================= Task 4: Datagrid =================
  const customers = [
    { id: 1, customer: 'Branson Weimann', lastSeen: '09/08/2020', orders: 2, totalSpent: '295,31', latestPurchase: '27/11/2019 a 13:12:25', news: true, segment: 'Regular' },
    { id: 2, customer: 'Anna Bruen', lastSeen: '09/08/2020', orders: 3, totalSpent: '847,91', latestPurchase: '07/06/2020 a 07:48:18', news: false, segment: null },
    { id: 3, customer: 'Gudrun Tromp', lastSeen: '09/08/2020', orders: 0, totalSpent: '0,00', latestPurchase: '', news: true, segment: null },
    { id: 4, customer: 'Florencio Roob', lastSeen: '09/08/2020', orders: 0, totalSpent: '0,00', latestPurchase: '', news: true, segment: null },
    { id: 5, customer: 'Maddison Torp', lastSeen: '09/08/2020', orders: 0, totalSpent: '0,00', latestPurchase: '', news: true, segment: null },
    { id: 6, customer: 'Rashawn Beer', lastSeen: '09/08/2020', orders: 3, totalSpent: '693,50', latestPurchase: '19/05/2020 a 10:03:18', news: true, segment: null },
    { id: 7, customer: 'Beth Hill', lastSeen: '08/08/2020', orders: 0, totalSpent: '0,00', latestPurchase: '', news: true, segment: null },
    { id: 8, customer: 'Brandyn Hoeger', lastSeen: '08/08/2020', orders: 0, totalSpent: '0,00', latestPurchase: '', news: true, segment: null },
    { id: 9, customer: 'Rey Schuster', lastSeen: '08/08/2020', orders: 0, totalSpent: '0,00', latestPurchase: '', news: true, segment: null },
    { id: 10, customer: 'Jakob Armstrong', lastSeen: '08/08/2020', orders: 0, totalSpent: '0,00', latestPurchase: '', news: true, segment: null },
    { id: 11, customer: 'Janae Glover', lastSeen: '08/08/2020', orders: 0, totalSpent: '0,00', latestPurchase: '', news: true, segment: 'Regular' },
    { id: 12, customer: 'Dina Tillman', lastSeen: '08/08/2020', orders: 0, totalSpent: '0,00', latestPurchase: '', news: true, segment: null }
  ]

  const [gridSearch, setGridSearch] = useState('')
  const [sortField, setSortField] = useState(null)
  const [sortAsc, setSortAsc] = useState(true)

  function handleSort(field) {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(true)
    }
  }

  let sortedAndFilteredCustomers = customers.filter((cust) =>
    cust.customer.toLowerCase().includes(gridSearch.toLowerCase())
  )

  if (sortField) {
    sortedAndFilteredCustomers = [...sortedAndFilteredCustomers].sort((a, b) => {
      let valA = a[sortField]
      let valB = b[sortField]

      if (sortField === 'totalSpent') {
        valA = parseFloat(valA.replace(',', '.'))
        valB = parseFloat(valB.replace(',', '.'))
      }

      if (valA < valB) return sortAsc ? -1 : 1
      if (valA > valB) return sortAsc ? 1 : -1
      return 0
    })
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '900px', margin: '0 auto' }}>

      {/* ============ TASK 1 ============ */}
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

      <hr style={styles.hr} />

      {/* ============ TASK 4 — Datagrid ============ */}
      <h1 style={styles.mainHeading}>Task 4: Create a Datagrid</h1>

      <input
        type="text"
        placeholder="Search by customer name..."
        value={gridSearch}
        onChange={(e) => setGridSearch(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '250px' }}
      />

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%', fontSize: '14px' }}>
        <thead style={{ background: '#f0f0f0' }}>
          <tr>
            <th onClick={() => handleSort('customer')} style={{ cursor: 'pointer' }}>
              Customer {sortField === 'customer' ? (sortAsc ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('lastSeen')} style={{ cursor: 'pointer' }}>
              Last Seen {sortField === 'lastSeen' ? (sortAsc ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('orders')} style={{ cursor: 'pointer' }}>
              Orders {sortField === 'orders' ? (sortAsc ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('totalSpent')} style={{ cursor: 'pointer' }}>
              Total Spent {sortField === 'totalSpent' ? (sortAsc ? '▲' : '▼') : ''}
            </th>
            <th>Latest Purchase</th>
            <th>News</th>
            <th>Segment</th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredCustomers.map((cust) => (
            <tr key={cust.id}>
              <td>{cust.customer}</td>
              <td>{cust.lastSeen}</td>
              <td>{cust.orders}</td>
              <td>{cust.totalSpent} $US</td>
              <td>{cust.latestPurchase || '-'}</td>
              <td>{cust.news ? '✔' : '✘'}</td>
              <td>{cust.segment || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

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