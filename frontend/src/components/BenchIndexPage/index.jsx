import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchBenches } from '../../store/benches';
import BenchList from './BenchList';
import "./BenchIndexPage.css"
import BenchMapWrapper from '../BenchMap';
import FilterForm from './FilterForm';

const BenchIndexPage = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const benches = useSelector(state => state?.benches)
  const [bounds, setBounds] = useState(null);
  const [minSeating, setMinSeating] = useState(1);
  const [maxSeating, setMaxSeating] = useState(10);

  useEffect(() => {
    if (minSeating && maxSeating && bounds) {
      dispatch(fetchBenches({ minSeating, maxSeating, bounds }))
    }
  }, [minSeating, maxSeating, bounds, dispatch])

  const markerEventHandlers = { click: (bench) => history.push(`/benches/${bench.id}`) } // navigates to that bench's show

  const mapEventHandlers = {
    click: (event) => { // on click push to new bench form w a query string containing the selected lat & lng
      const { lat, lng } = event.latLng.toJSON();
      const queryParams = new URLSearchParams({ lat, lng }).toString();
      history.push({ pathname: '/benches/new', search: queryParams });
    },
    idle: map => setBounds(map.getBounds().toUrlValue())
  };

  return (
    <div className='bench-index-page'>
      <BenchMapWrapper benches={benches} markerEventHandlers={markerEventHandlers} mapEventHandlers={mapEventHandlers} from={"index"} />
      <FilterForm minSeating={minSeating} setMinSeating={setMinSeating} maxSeating={maxSeating} setMaxSeating={setMaxSeating} />
      {benches && <BenchList benches={benches} />}
    </div>
  )
}

export default BenchIndexPage