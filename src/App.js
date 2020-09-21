import React from 'react'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { ContactItem, EditContact } from './Components'

const App = () => {
  const [contacts, setContacts] = React.useState(null)
  const [selectedContact, setSelectedContact] = React.useState(null)
  const [filter, setFilter] = React.useState('')
  const setEditContact = (contact) => {
    setSelectedContact(contact)
  }
  const updateContact = (contact) => {
    const currentIndex = contacts.findIndex((el) => +el.id === +contact.id)

    if (currentIndex > -1) {
      const newContacts = contacts

      newContacts[currentIndex] = contact
      localStorage.setItem('contacts', JSON.stringify(newContacts))
      setContacts(newContacts)
    } else {
      const newContacts = contacts

      newContacts.push(contact)
      localStorage.setItem('contacts', JSON.stringify(newContacts))
      setContacts(newContacts)
    }
  }
  const deleteContact = (id) => {
    const newContacts = contacts.filter(el => +el.id !== +id)
    localStorage.setItem('contacts', JSON.stringify(newContacts))
    setContacts(newContacts)
  }

  React.useEffect(() => {
    if (!contacts) {
      const localContacts = localStorage.getItem('contacts')

      if (localContacts) {
        setContacts(JSON.parse(localContacts))
      } else {
        fetch('http://demo.sibers.com/users', {
          method: 'GET'
        })
          .then((res) => res.json())
          .then((res) => {
            setContacts(res)
            localStorage.setItem('contacts', JSON.stringify(res))
          })
      }
    }
  }, [contacts])

  if (!contacts) {
    return null
  }

  const groupsArr = []
  contacts
    .filter(
      (el) => !filter || el.name.toLowerCase().startsWith(filter.toLowerCase())
    )
    .forEach((el) => {
      const group = el.favorite ? 'favorite' : el.name.toUpperCase()[0]
      const currentGroupIndex = groupsArr.findIndex((el) => el.group === group)

      if (currentGroupIndex !== -1 && groupsArr[currentGroupIndex]) {
        groupsArr[currentGroupIndex].body.push(el)
      } else {
        groupsArr.push({ group, body: [el] })
      }
    })

  return (
    <div>
      <header>
        <TextField
          onChange={(ev) => setFilter(ev.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <IconButton onClick={() => {
          let maxId = 0

          contacts.forEach(el => {
            if (+el.id > maxId) {
              maxId = +el.id
            }
          })
          setSelectedContact(
            {
              id: maxId + 1,
              avatar: '',
              name: '',
              email: '',
              phone: '',
              username: ''
            }
          )
        }}
        >
          <PersonAddIcon />
        </IconButton>
      </header>
      <div className='Contacts'>
        {groupsArr
          .sort((a, b) => (a.group > b.group ? 1 : a.group < b.group ? -1 : 0))
          .sort((a, b) =>
            a.group === 'favorite' ? -1 : b.group === 'favorite' ? 1 : 0
          )
          .map((el) => (
            <React.Fragment key={`group-${el.group}`}>
              <h2>{el.group}</h2>
              {el.body
                .sort((a, b) =>
                  a.name > b.name ? 1 : a.name < b.name ? -1 : 0
                )
                .map((el, index) => (
                  <ContactItem
                    key={el.username || `list-elem-${el.id}`}
                    contact={el}
                    setEditContact={setEditContact}
                    deleteContact={deleteContact}
                  />
                ))}
            </React.Fragment>
          ))}
        <p className='total'>Total contacts: {contacts.length}</p>
      </div>
      {selectedContact && (
        <EditContact
          updateContact={updateContact}
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </div>
  )
}

export default App
