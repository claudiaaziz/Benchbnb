import React from 'react'
import BenchListItem from './BenchListItem';

const BenchList = ({ benches, highlightedBench, setHighlightedBench }) => {

  return (
    <div className='bench-list-container'>
      <div className='bench-list'>
        {Object.values(benches).map(bench => (
          <BenchListItem bench={bench} key={bench.id} highlightedBench={highlightedBench} setHighlightedBench={setHighlightedBench}/>
        ))}
      </div>
    </div>
  )
}

export default BenchList