import React, { useEffect } from 'react'
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

  useEffect(() => {
    dispatch(fetchBenches())
  }, [])

  const markerEventHandlers = { click: (bench) => history.push(`/benches/${bench.id}`) } // navigates to that bench's show

  const mapEventHandlers = { // navigates to new bench form w a query string containing the selected lat & lng
    click: (event, map) => {
      const { latLng } = event;
      const lat = latLng.lat();
      const lng = latLng.lng();
      const queryParams = new URLSearchParams({ lat, lng }).toString();
      history.push({
        pathname: '/benches/new',
        search: queryParams,
      });
    },
  };

  return (
    <div className='bench-index-page'>
      <BenchMapWrapper benches={benches} markerEventHandlers={markerEventHandlers} mapEventHandlers={mapEventHandlers}/>
      {benches && <BenchList benches={benches} />}
    </div>
  )
}

export default BenchIndexPage