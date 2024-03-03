import React from 'react'
import { useHistory } from "react-router-dom";

const BenchListItem = ({ bench }) => {
  const history = useHistory()

  return (
    <div onClick={() => history.push(`benches/${bench.id}`)}>
      <h2>{bench.title}</h2>
      <p>${bench.price}</p>
    </div>
  )
}

export default BenchListItem