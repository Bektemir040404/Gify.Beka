import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap'

function App() {
  const [value, setValue] = useState('')
  const [gify, setGify] = useState([])

  useEffect(() => {
    const a = axios.get('https://api.giphy.com/v1/gifs/trending?api_key=PfFQ8roY49VWXS2NmHUxxzvEatmVtE4l')
    a.then(e => {
      setGify(e.data.data)
    })
  }, [])
  console.log(gify)

  const send = () => {
    axios.get('https://api.telegram.org/bot5346450666:AAF4lkPekY3TJV4KC-0D_QzL-dAWpR-hFks/sendMessage', {
      params: {
        text: value,
        chat_id: '1155495889',
      }
    }).then(res => {
      setValue('')
    }).catch(e => {
      alert('error')
    })
  }

  const sendPhoto = () => {
    axios.get('https://api.telegram.org/bot5346450666:AAF4lkPekY3TJV4KC-0D_QzL-dAWpR-hFks/sendPhoto', {
      params: {
        photo: value,
        chat_id: '1155495889',
      }
    }).then(res => {
      setValue('')
    }).catch(e => {
      alert('error')
    })
  }

  return (
    <>
      <div className="App">
        <h1>Telegram BOT </h1>
        <input onChange={(e) => setValue(e.target.value)} value={value} type='text' placeholder='text...' />
        <button onClick={send}>Send</button>
        <button onClick={sendPhoto}>Send as photo</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', marginLeft: 140 }}>
        {gify.map((el, i) => { 
          return (
            <Card style={{ width: '15rem', margin: 15 }} >
              <Card.Img onClick={() => setValue(el.images.original.url)} src={el.images.original.url} />
              <Card.Body>
                <Card.Title>{el.title}</Card.Title>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    </>
  );
}

export default App;
