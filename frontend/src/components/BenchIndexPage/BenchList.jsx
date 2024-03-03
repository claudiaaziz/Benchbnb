import React from 'react'
import BenchListItem from './BenchListItem';

const BenchList = ({ benches }) => {
  console.log('🦋🦋🦋 ~ benches:', benches);

  return (
    <div className='bench-list'>
      {Object.values(benches).map(bench => (
        <BenchListItem bench={bench} key={bench.id}/>
      ))}
    </div>
  )
}

export default BenchList