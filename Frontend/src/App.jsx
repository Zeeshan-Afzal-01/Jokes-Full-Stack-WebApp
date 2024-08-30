import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [jokes, setJokes] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:3000/api/jokes')
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const copyHandle=(JokeText)=>{
navigator.clipboard.writeText(JokeText)
.then(()=>toast.success("Message is Copied to Clipboard",{position:"top-center"}))
.catch(()=>toast.error("Failed to Copy!"))
  }
  return (
    <>
    <ToastContainer/>
      <h1>Jokes Website</h1>
      <span className="jokes-count"><b>Total Jokes: {jokes.length}</b></span>
      <div className="jokes-container">
        {jokes.map((joke) => (
          <div className="joke-card" key={joke.id}>
            <h3>{joke.title}</h3>
            <p id='joke_text'>{joke.joke}</p>
            <div className='mt-3 d-flex justify-content-end'>
            <button onClick={()=>copyHandle(joke.joke)} className='btn btn-primary'>Copy Joke</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
