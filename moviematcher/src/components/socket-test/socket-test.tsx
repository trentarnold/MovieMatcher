import {useState, useEffect} from 'react'
import io, { Socket } from 'socket.io-client'
import './socket-test.css'


function SocketTest () {
  const socket = io('http://localhost:3001',  { transports : ['websocket'] });  

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([{name:'', message:''}])
  

  
  function handleMessageChange (e:React.ChangeEvent<HTMLInputElement>) {
    const newMessage = e.target.value;
    setMessage(newMessage)
  }

  function handleNameChange (e:React.ChangeEvent<HTMLInputElement>) {
    const newName = e.target.value;
    setName(newName)
  }
  
  function handleEmit () {
    socket.emit('message', {name, message})
    setMessage('')
  }

  function handleBroadcast () {
    socket.emit('broadcast', {name, message})
    setMessage('')
  }

  function handleSocketEmit () {
    socket.emit('socket emit', {name, message})
    setMessage('')
  }

  function handleSumacEmit () {
    socket.emit('sumac')
  }

  useEffect(()=> {
    socket.connect()

    socket.on('message', (message) => {
      setChat([...chat, {name: message.name, message:message.message}
      ])
    })
  })

  return (
    <div className="App">
      <div className="chat">
        {chat.map(message => {
          return <p>{message.name}: {message.message}</p>
        })
        }
      </div>
      <div className="inputs">
        <div className="input">
          <p>Name: </p>
          <input onChange={handleNameChange} value={name}/>
        </div>
        <div className="input">
          <p>Message: </p>
          <input onChange={handleMessageChange} value={message}/>
        </div>
        <button onClick={handleBroadcast}> Broadcast</button>
        <button onClick={handleSocketEmit}>Socket.Emit</button>
        <button onClick={handleEmit}>io.Emit</button>
        <button onClick={handleSumacEmit}>Sumac</button>
      </div>
    </div>
  );
}
export default SocketTest