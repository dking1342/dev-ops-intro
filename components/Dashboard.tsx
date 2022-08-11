import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <p>
        Dashboard
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  )
}

export default Dashboard