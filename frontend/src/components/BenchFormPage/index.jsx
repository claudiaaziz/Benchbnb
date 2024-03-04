import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import "./BenchFormPage.css"
import { createBench } from '../../store/benches';
import { useInput } from '../../hooks';

const BenchFormPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  // temp
  const lat = 40.759004472452055
  const lng = -73.98328675719945

  const [title, onTitleChange] = useInput("")
  const [price, onPriceChange] = useInput(0)
  const [description, onDescriptionChange] = useInput("")
  const [seating, onSeatingChange] = useInput(0)
  const [errors, setErrors] = useState([])

  const sessionUser = useSelector(state => state.session.user)
  if (!sessionUser) return history.push("/")

  const handleSubmit = async (e) => {
    setErrors([])

    e.preventDefault()
    const newBenchData = {title, price, description, seating, lat, lng}
    const res = await dispatch(createBench(newBenchData))

    if (res?.bench) {
      history.push("/")
    } else {
      const { errors } = res
      setErrors([...errors])
    }
  }

  return (
    <div className='bench-form-page'>
      {errors &&
        <ul className='errors'>
          {errors.map(error => <li key={error}>{error}</li>)} 
        </ul>
      }

      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title:</label>
        <input id='title' type="text" value={title} onChange={onTitleChange} />

        <label htmlFor="price">Price:</label>
        <input id='price' type="number" value={price} onChange={onPriceChange} />

        <label htmlFor="description">Description:</label>
        <textarea id='description' type="textarea" value={description} onChange={onDescriptionChange} />

        <label htmlFor="seating">Seating:</label>
        <input id='seating' type="number" value={seating} onChange={onSeatingChange} />

        <label htmlFor="lat">Lat:</label>
        <input type="text" id="lat" value={lat} disabled />

        <label htmlFor="lng">Lng:</label>
        <input type="text" id="lng" value={lng} disabled />

        <button type="submit">Create Bench</button>
      </form>
    </div>
  )
}

export default BenchFormPage