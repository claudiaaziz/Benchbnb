import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import "./BenchFormPage.css"
import { createBench } from '../../store/benches';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const BenchFormPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  // temp
  const lat = 40.759004472452055
  const lng = -73.98328675719945

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [seating, setSeating] = useState(0)
  const [errors, setErrors] = useState([])

  const sessionUser = useSelector(state => state.session.user)
  if (!sessionUser) return <Redirect to="/"/>

  const handleSubmit = async (e) => {
    setErrors([])
    setTitle("")
    setPrice(0)
    setDescription("")
    setSeating(0)

    e.preventDefault()
    const newBenchData = {title, price, description, seating, lat, lng}
    const newBench = await dispatch(createBench(newBenchData))

    if (newBench?.bench?.title) {
      history.push("/")
    } else {
      const {errors} = newBench
      console.log('🦋🦋🦋 ~ errors:', errors);
      setErrors([...errors])
    }
  }

  return (
    <div className='bench-form-page'>
      {errors &&
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)} 
        </ul>
      }

      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title:</label>
        <input id='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="price">Price:</label>
        <input id='price' type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label htmlFor="description">Description:</label>
        <textarea id='description' type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor="seating">Seating:</label>
        <input id='seating' type="number" value={seating} onChange={(e) => setSeating(e.target.value)} />

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