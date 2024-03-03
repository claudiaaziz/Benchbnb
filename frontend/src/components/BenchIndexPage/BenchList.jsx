import React from 'react'
import BenchListItem from './BenchListItem';

const BenchList = ({ benches }) => {
  console.log('🦋🦋🦋 ~ benches:', benches);

  return (
    <div>
      <h1>Bench List</h1>

      {Object.values(benches).map(bench => (
        <BenchListItem bench={bench} key={bench.id}/>
      ))}

    </div>
  )
}

export default BenchList