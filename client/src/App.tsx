import { Link } from 'react-router-dom'
import './App.css'

const App = () => {

  const handleApi = async () => {
    try {
      const response = await fetch("http://localhost:9000/api");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='App'>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src="/react.svg" className="logo react" alt="React logo" />
        </a>
        <p>
          <Link to="/dashboard">Dashboard</Link>
        </p>
        <p>
          <button onClick={handleApi}>API</button>
        </p>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App