import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBenches } from '../../store/benches';
import BenchList from './BenchList';
import "./BenchIndexPage.css"

const BenchIndexPage = () => {
  const dispatch = useDispatch()
  const benches = useSelector(state => state?.benches)

  useEffect(() => {
    dispatch(fetchBenches())
  }, [])

  return (
    <div className='bench-index-page'>
      {benches && <BenchList benches={benches} />}
    </div>
  )
}

export default BenchIndexPage