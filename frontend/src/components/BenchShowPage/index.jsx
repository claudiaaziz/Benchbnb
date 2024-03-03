import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchBench } from '../../store/benches';

const BenchShowPage = () => {
  const dispatch = useDispatch()
  const { benchId } = useParams()
  const bench = useSelector(state => state?.benches[benchId])

  useEffect(() => {
    dispatch(fetchBench(benchId))
    console.log("useEffect in BenchShowPage hit")
  }, [])

  console.log('🦋🦋🦋 ~ bench:', bench);

  return (
    <>
      {bench &&
        <>
          <h1>{bench.title}</h1>
          <div>
            <p>{bench.description}</p>
            <ul>
              <li>Seating: {bench.seating}</li>
              <li>Lat: {bench.lat}</li>
              <li>Long: {bench.long}</li>
            </ul>
          </div>
        </>
      }
    </>
  )
}

export default BenchShowPage