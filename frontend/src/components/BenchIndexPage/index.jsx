import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBenches } from '../../store/benches';
import BenchList from './BenchList';

const BenchIndexPage = () => {
  const dispatch = useDispatch()
  const benches = useSelector(state => state?.benches)

  useEffect(() => {
    dispatch(fetchBenches())
    console.log("useEffect in BenchIndexPage hit")
  }, [])

  return (
    <div>
      {benches && <BenchList benches={benches} />}
    </div>
  )
}

export default BenchIndexPage