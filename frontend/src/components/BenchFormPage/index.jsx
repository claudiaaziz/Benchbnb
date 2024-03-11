import { useState } from 'react'
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
  const [photoFile, setPhotoFile] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)

  const sessionUser = useSelector(state => state.session.user)
  if (!sessionUser || lat === "" || lng === "") return history.push("/")

  const handleSubmit = async (e) => {
    setErrors([])
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('seating', seating);
    formData.append('lat', lat);
    formData.append('lng', lng);
    if (photoFile) formData.append('photo', photoFile);

    const res = await dispatch(createBench(formData))

    if (res?.bench) {
      history.push("/")
    } else {
      const { errors } = res
      setErrors([...errors])
    }
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        setPhotoFile(file)
        setPhotoUrl(fileReader.result)
      }
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
        <Input
          label="Add a Picture"
          type='file'
          onChange={handleFileChange}
        />
        {photoUrl && 
          <div className='image-preview'>
            <h3>Image preview</h3>
            <img src={photoUrl} alt='bench' />
          </div>
        }
        <button type="submit">Create Bench</button>
      </form>
    </div>
  )
}

export default BenchFormPage