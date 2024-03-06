import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBench } from '../../store/benches';
import "./BenchShowPage.css"
import ReviewFormModal from '../ReviewForm';
import ReviewShow from './ReviewShow';

const BenchShowPage = () => {
  const dispatch = useDispatch()
  const { benchId } = useParams()
  const bench = useSelector(state => state?.benches?.[benchId])
  const reviews = bench?.reviews
  const sessionUser = useSelector(state => state?.session?.user)
  const isUserReviewed = reviews?.some(review => review.userId === sessionUser?.id);

  useEffect(() => {
    dispatch(fetchBench(benchId))
    console.log("hit useeffect in bench show")
  }, [benchId, dispatch])

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
              <li>Long: {bench.lng}</li>
            </ul>
          </div>
          {!isUserReviewed && sessionUser && <ReviewFormModal benchId={benchId} />}
          <h2>Reviews</h2>
          {reviews?.length > 0 ? reviews.map(review => <ReviewShow review={review} benchId={benchId} key={review.id} />) : "No reviews have been posted for this bench yet."}
        </div>
      }
    </>
  )
}

export default BenchShowPage