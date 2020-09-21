import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@material-ui/core'

const EditContact = ({ contact, onClose, updateContact }) => {
  const {
    avatar,
    name,
    email,
    address,
    company,
    id,
    phone,
    posts,
    username
  } = contact
  const [favorite, setFavorite] = React.useState(contact.favorite)
  const { register, handleSubmit, control } = useForm()
  const onSubmit = (data) => {
    updateContact({
      ...data,
      favorite,
      address,
      company,
      posts
    })
    onClose()
  }

  return (
    <div className='modalWrapper'>
      <div className='wrapperBackground' onClick={() => onClose()} />
      <div className='editModal'>
        <form onSubmit={handleSubmit(onSubmit)} className='editModal--form'>
          <FormGroup>
            <input type='hidden' name='id' defaultValue={id} ref={register} />
            <FormControlLabel
              control={
                <Controller
                  render={() => (
                    <Checkbox
                      onChange={e => setFavorite(e.target.checked)}
                      checked={favorite}
                      name='favorite'
                    />
                  )}
                  name='favorite'
                  control={control}
                  defaultValue={!!contact.favorite}
                />
              }
              label='Favorite:'
              labelPlacement='start'
            />
            <Controller
              as={TextField}
              label='Name:'
              name='name'
              defaultValue={name}
              control={control}
            />
            <Controller
              as={TextField}
              label='Phone:'
              name='phone'
              defaultValue={phone}
              control={control}
            />
            <Controller
              as={TextField}
              label='Username:'
              name='username'
              defaultValue={username}
              control={control}
            />
            <Controller
              as={TextField}
              label='Avatar url:'
              name='avatar'
              defaultValue={avatar}
              control={control}
            />
            <Controller
              as={TextField}
              label='Email:'
              name='email'
              defaultValue={email}
              control={control}
            />
            <Button type='submit'>Save</Button>
          </FormGroup>
        </form>
      </div>
    </div>
  )
}

export default EditContact
