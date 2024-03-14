import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBench } from '../../store/benches';
import "./BenchShowPage.css"
import ReviewFormModal from './ReviewForm';
import ReviewShow from './ReviewShow';
import BenchMapWrapper from '../BenchMap';

const BenchShowPage = () => {
  const dispatch = useDispatch()
  const { benchId } = useParams()
  const bench = useSelector(state => state?.benches?.[benchId])
  const reviews = bench?.reviews
  const sessionUser = useSelector(state => state?.session?.user)
  const isUserReviewed = reviews?.some(review => review.userId === sessionUser?.id);

  useEffect(() => {
    dispatch(fetchBench(benchId))
  }, [benchId, dispatch])

  const mapOptions = { center: { lat: bench?.lat, lng: bench?.lng } }

  if (!bench) return // or render page not found page

  return (
    <div className='bench-show-page'>
      <BenchMapWrapper benches={bench} mapOptions={mapOptions} from={"show"} />
      <div className='details'>
        <h1>{bench.title}</h1>
        <div>
          {bench.photoUrl && <img src={bench.photoUrl} alt={bench.title} />}
          <p>{bench.description}</p>
          <ul>
            <li>Seating: {bench.seating}</li>
            <li>Lat: {bench.lat}</li>
            <li>Long: {bench.lng}</li>
          </ul>
        </div>
        {!isUserReviewed && sessionUser && <ReviewFormModal benchId={benchId} />}
        <h2>Reviews</h2>
        {reviews?.length > 0 && <h3>Average rating: {bench.avgRating}</h3>}
        {reviews?.length > 0 ? reviews.map(review => <ReviewShow review={review} benchId={benchId} key={review.id} />) : "No reviews have been posted for this bench yet."}
      </div>
    </div>
  )
}

export default BenchShowPage