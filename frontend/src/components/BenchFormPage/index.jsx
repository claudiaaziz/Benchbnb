import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';
import "./BenchFormPage.css"
import { createBench } from '../../store/benches';
import { useInput } from '../../hooks';
import { FormErrors, Input, TextArea } from '../Forms';

const BenchFormPage = () => {
  const history = useHistory()
  const location = useLocation();
  const dispatch = useDispatch()

  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get('lat') || ''; 
  const lng = queryParams.get('lng') || '';
  const [title, onTitleChange] = useInput("")
  const [price, onPriceChange] = useInput(10)
  const [description, onDescriptionChange] = useInput("")
  const [seating, onSeatingChange] = useInput(2);
  const [errors, setErrors] = useState([])

  const sessionUser = useSelector(state => state.session.user)
  if (!sessionUser || lat === "" || lng === "") return history.push("/")

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
      {errors.length > 0 && <FormErrors errors={errors}/>}

      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          label="Title:"
          placeholder="Title"
          value={title}
          onChange={onTitleChange}
          required
          autoFocus
        />
        <Input
          label="Price:"
          placeholder="Price"
          type='number'
          min="10"
          max="1000"
          value={price}
          onChange={onPriceChange}
          required
        />
        <TextArea
          label="Description:"
          placeholder="Description"
          cols="50"
          rows="8"
          value={description}
          onChange={onDescriptionChange}
          required
        />
        <Input
          label="Seating:"
          type='number'
          min="0"
          placeholder="Seating"
          value={seating}
          onChange={onSeatingChange}
          required
        />
        <Input
          label="Lat:"
          type='number'
          placeholder="Lat"
          value={lat}
          disabled
        />
        <Input
          label="Lng:"
          type='number'
          placeholder="Lng"
          value={lng}
          disabled
        />
        <button type="submit">Create Bench</button>
      </form>
    </div>
  )
}

export default BenchFormPage