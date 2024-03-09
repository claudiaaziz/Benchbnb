import React from 'react'
import BenchListItem from './BenchListItem';

const BenchList = ({ benches }) => {

  return (
    <div className='bench-list-container'>
      <div className='bench-list'>
        {Object.values(benches).map(bench => (
          <BenchListItem bench={bench} key={bench.id}/>
        ))}
      </div>
    </div>
  )
}

export default BenchList