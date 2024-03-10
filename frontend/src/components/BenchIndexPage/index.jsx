import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchBenches } from '../../store/benches';
import BenchList from './BenchList';
import "./BenchIndexPage.css"
import BenchMapWrapper from '../BenchMap';

const BenchIndexPage = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const benches = useSelector(state => state?.benches)
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    bounds && dispatch(fetchBenches({bounds}))
  }, [bounds, dispatch])

  const markerEventHandlers = { click: (bench) => history.push(`/benches/${bench.id}`) } // navigates to that bench's show

  const mapEventHandlers = {
    click: event => { // on click navigate to new bench form w a query string containing the selected lat & lng
      const search = new URLSearchParams(event.latLng)
      history.push({ pathname: '/benches/new', search });
    },
    idle: map => setBounds(map.getBounds().toUrlValue())
  };

  return (
    <div className='bench-index-page'>
      <BenchMapWrapper benches={benches} markerEventHandlers={markerEventHandlers} mapEventHandlers={mapEventHandlers} from={"index"} />
      {benches && <BenchList benches={benches} />}
    </div>
  )
}

export default BenchIndexPage