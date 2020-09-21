import React from 'react'
import { Button, IconButton } from '@material-ui/core'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const ContactItem = ({
  contact,
  setEditContact
}) => {
  const [isOpen, setOpen] = React.useState(false)
  const {
    avatar,
    name,
    email,
    phone,
    username
  } = contact
  return (
    <div className='ContactItem'>
      <div className='ContactItemMain'>
        <div className='ContactItemMain--before'>
          <img
            className='ContactItemMain--avatar'
            src={avatar}
            alt=''
            onError={(ev) => {
              ev.target.onerror = null
              ev.target.src = `https://via.placeholder.com/150/FAFAFA/808080?text=${name.toUpperCase()[0]}`
            }}
          />
        </div>
        <div className='ContactItemMain--info'>
          <span className='ContactItemMain--name'>{name}</span>
          <span className='ContactItemMain--username'>{username}</span>
        </div>
        <div className='ContactItemMain--after'>
          <IconButton onClick={() => {
            setOpen(!isOpen)
          }}
          >{isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </IconButton>
        </div>
      </div>
      <div className={`ContactItem--menu ${isOpen ? 'ContactItem--menu--active' : 'ContactItem--menu--hidden'}`}>
        <Button variant='contained' onClick={() => setEditContact(contact)}>Edit</Button>
        {phone ? <p>{`phone: ${phone}`}</p> : null}
        {email ? <p>{`email: ${email}`}</p> : null}
      </div>
    </div>
  )
}

export default ContactItem
