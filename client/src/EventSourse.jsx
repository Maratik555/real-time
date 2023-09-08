import React, {useEffect, useId, useState} from 'react'
import axios from 'axios'

const EventSourcing = () => {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  const id = useId()



  useEffect(() => {
    subscribe()
  }, [])

  const subscribe = async () => {
    const eventSource = new EventSource(`http://localhost:3001/connect`)
    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data)
      setMessages(prev => [message, ...prev])
    }
  }

  const sendMessage = async () => {
    setValue('')
    await axios.post('http://localhost:3001/new-messages', {
      message: value,
      id
    })
  }

  return (
    <div className="center">
      <div>
        <div className="form">
          <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
          <button onClick={sendMessage}>Отправить</button>
        </div>
        <div className="messages">
          {messages.map(mess =>
            <div className="message" key={mess.id}>
              {mess.message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventSourcing