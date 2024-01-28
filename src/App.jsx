import { useState, useEffect } from 'react'
import './App.css'
import DatePicker from './components/DatePicker'
import Log from './components/Log';
import axios from 'axios'
import Login from './components/Login';
import Signup from './components/Signup';
import DisplayUser from './components/DisplayUser';

const baseUrl = '/api/hours';
const userLoginUrl = '/api/login';
const userSignupUrl = 'api/users';

function App() {

  const [hours, setHours] = useState([]);

  const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'));

  const timeFormat = new Date().toLocaleTimeString("en-CA", {hour: 'numeric', minute: 'numeric', hourCycle: "h23"});

  const [time, setTime] = useState({
    input: timeFormat,
    output: timeFormat,
  })

  const getHours = () => {
    if (user) {
      const req = axios.get(baseUrl, {
        headers: { Authorization: `Bearer ${user.token}`}
      });
      req
      .then((res) => {
        setHours(res.data);
      })
    }
  }

  const handleSave = () => {
    axios.post(baseUrl, {date, ...time}, {
      headers: { Authorization: `Bearer ${user.token}`}
    })
    .then(res => setHours(hours.concat(res.data)));
  }

  const deleteHour = (id) => {
    axios.delete(`${baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${user.token}`}
    })
    .then(res => {
      setHours(res.data);
    });
  }

  // login

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [signup, setSignup] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [user, setUser] = useState(null);

  const [error, setError] = useState("");

  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post(userLoginUrl, login)
          setUser(res.data);
          setLogin({
            username: "",
            password: "",
          })
      }
    catch (err) {
      setError("Invalid username or password");
      setTimeout(() => setError(null), 5000)
    }
  }

  const handleLogout = () => {
    setUser(null);
  }

  const handleSignup = async () => {
      const res = await axios.post(userSignupUrl, signup)
          setLogin({
            username: "",
            password: "",
          })
          setSignup({
            name: "",
            username: "",
            password: "",
          })
          setIsSigningUp(false);
  }

  useEffect(() => {
    getHours()
  }, [user])

  return (
    <>
      <h1>Hours</h1>
      {
      !user 
      ? 
      !isSigningUp ? <Login login={login} setLogin={setLogin} handleLogin={handleLogin} error={error} setIsSigningUp={setIsSigningUp} /> 
      : 
      <Signup signup={signup} setSignup={setSignup} setIsSigningUp={setIsSigningUp} handleSignup={handleSignup} error={error} />
      : 
        <DisplayUser user={user} handleLogout={handleLogout} />
      }
      {user ? <><div className='my-8 flex flex-col items-center'>
        <DatePicker date={date} setDate={setDate} />
        <div className='space-y-4'>
          <div>
            <label htmlFor="inputTime">Input: </label>
          <input type="time" name="input" id="inputTime" value={time.input} className='px-1 rounded-md text-center' onChange={(e) => setTime({...time, input: e.target.value})} />
          </div>
          <div>
            <label htmlFor="outputTime">Output: </label>
          <input type="time" name="input" id="outputTime" value={time.output} className='px-1 rounded-md text-center' onChange={(e) => setTime({...time, output: e.target.value})} />
          </div>
        </div>
        <button onClick={handleSave} className='my-4'>Save</button>
      </div>
      <Log hours={hours} setHours={setHours} deleteHour={deleteHour} /></> : ""}
    </>
  )
}

export default App
