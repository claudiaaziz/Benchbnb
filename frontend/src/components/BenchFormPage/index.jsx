import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import "./BenchFormPage.css"
import { createBench } from '../../store/benches';
import { useInput } from '../../hooks';
import { FormErrors, Input, TextArea } from '../Forms';

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
          value={price}
          onChange={onPriceChange}
          required
        />
        <TextArea
          label="Description:"
          placeholder="Description"
          value={description}
          onChange={onDescriptionChange}
          required
        />
        <Input
          label="Seating:"
          type='number'
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