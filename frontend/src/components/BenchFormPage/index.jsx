import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';
import "./BenchFormPage.css"
import { createBench } from '../../store/benches';
import { useInput, useSubmit } from '../../hooks';
import { FormErrors, Input, TextArea } from '../formElements';
import { openModal } from '../../store/modal';

const BenchFormPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get('lat') || ''; 
  const lng = queryParams.get('lng') || '';
  const sessionUser = useSelector(state => state.session.user)
  const [title, onTitleChange] = useInput("")
  const [price, onPriceChange] = useInput(10)
  const [description, onDescriptionChange] = useInput("")
  const [seating, onSeatingChange] = useInput(2);
  const [photoFile, setPhotoFile] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)

  const [errors, onSubmit] = useSubmit({
    createAction: () => {
      const formData = new FormData()
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('seating', seating);
      formData.append('lat', lat);
      formData.append('lng', lng);
      if (photoFile) formData.append('photo', photoFile);

      return createBench(formData)
    },
    onSuccess: () => history.push("/")
  })

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

  useEffect(() => { // for !sessionUser would be better to render signup modal
    if (!sessionUser || lat === "" || lng === "") return history.push("/")
  }, [sessionUser, lat, lng, history]) 

  if (!sessionUser) dispatch(openModal("login"))

  return (
    <div className='bench-form-page'>
      <h1>Benchbnb your bench</h1>

      <form onSubmit={onSubmit} className='form'>
        <FormErrors errors={errors} />

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
          type='number'
          min="10"
          max="1000"
          value={price}
          onChange={onPriceChange}
          required
        />
        <TextArea
          label="Description:"
          cols="30"
          rows="8"
          value={description}
          onChange={onDescriptionChange}
          required
        />
        <Input
          label="Seating:"
          type='number'
          min="0"
          value={seating}
          onChange={onSeatingChange}
          required
        />
        <Input
          label="Lat:"
          type='number'
          value={lat}
          disabled
        />
        <Input
          label="Lng:"
          type='number'
          value={lng}
          disabled
        />
        <Input
          label="Add a Picture"
          type='file'
          onChange={handleFileChange}
          className="default-styling"
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