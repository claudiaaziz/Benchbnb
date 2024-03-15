import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchBenches } from '../../store/benches';
import BenchList from './BenchList';
import "./BenchIndexPage.css"
import BenchMapWrapper from '../BenchMap';
import FilterForm from './FilterForm';
import { useInput } from '../../hooks';

const BenchIndexPage = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state?.session?.user)
  const benches = useSelector(state => state?.benches)
  const [bounds, setBounds] = useState(null);
  const [minSeating, onMinSeatingChange] = useInput(1);
  const [maxSeating, onMaxSeatingChange] = useInput(10);
  const [highlightedBench, setHighlightedBench] = useState(null)

  useEffect(() => {
    if (minSeating && maxSeating && bounds) {
      dispatch(fetchBenches({ minSeating, maxSeating, bounds }))
    }
  }, [minSeating, maxSeating, bounds, dispatch])

  const markerEventHandlers = {
    click: (bench) => history.push(`/benches/${bench.id}`),
    mouseover: (bench) => setHighlightedBench(bench.id),
    mouseout: () => setHighlightedBench(null)
  } 

  const mapEventHandlers = {
    click: (event) => { // on click push to new bench form w a query string containing the selected lat & lng
      const { lat, lng } = event.latLng.toJSON();
      const queryParams = new URLSearchParams({ lat, lng }).toString();
      
      console.log('🦋🦋🦋 ~ sessionUser:', sessionUser);
      sessionUser && history.push({ pathname: '/benches/new', search: queryParams });
    },
    idle: map => setBounds(map.getBounds().toUrlValue())
  };

  return (
    <div className='bench-index-page'>
      <BenchMapWrapper benches={benches} markerEventHandlers={markerEventHandlers} mapEventHandlers={mapEventHandlers} from={"index"} highlightedBench={highlightedBench} />
      <div className='filter-form-and-bench-list-div'>
        <FilterForm minSeating={minSeating} onMinSeatingChange={onMinSeatingChange} maxSeating={maxSeating} onMaxSeatingChange={onMaxSeatingChange} />
        {benches && <BenchList benches={benches} highlightedBench={highlightedBench} setHighlightedBench={setHighlightedBench} />}
      </div>
    </div>
  )
}

export default BenchIndexPage