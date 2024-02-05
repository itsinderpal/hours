
import {Link} from 'react-router-dom'

const Login = ({login, setLogin, handleLogin, error, setIsSigningUp}) => {
    return (
        <>
        <div className='my-8 space-y-4 flex flex-col justify-center'>
        <div className='flex space-x-2 justify-center'>
          <p>Username</p>
        <input type="text" name="username" id="username" className='w-1/2 px-1 rounded-md outline-none' value={login.username} onChange={(e) => setLogin({...login, username: e.target.value})}/>
        </div>
        <div className='flex space-x-2 justify-center'>
          <p>Password</p>
        <input type="password" name="password" id="password" className='w-1/2 px-1 rounded-md outline-none' value={login.password} onChange={(e) => setLogin({...login, password: e.target.value})}/>
        </div>
        <button onClick={handleLogin} className='self-center'>Login</button>
        {error && <span className='my-2'>{error}</span>}
      </div>
      <Link to="/signup"><div className="underline cursor-pointer" onClick={() => setIsSigningUp(true)}>Signing up?</div></Link>
        </>
    )
}

export default Login;