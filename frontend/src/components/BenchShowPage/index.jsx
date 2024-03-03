import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBench } from '../../store/benches';
import "./BenchShowPage.css"

const BenchShowPage = () => {
  const dispatch = useDispatch()
  const { benchId } = useParams()
  const bench = useSelector(state => state?.benches[benchId])

  useEffect(() => {
    dispatch(fetchBench(benchId))
  }, [])

  return (
    <>
      {bench &&
        <div className='bench-show-page'>
          <h1>{bench.title}</h1>
          <div>
            <p>{bench.description}</p>
            <ul>
              <li>Seating: {bench.seating}</li>
              <li>Lat: {bench.lat}</li>
              <li>Long: {bench.long}</li>
            </ul>
          </div>
        </div>
      }
    </>
  )
}

export default BenchShowPage