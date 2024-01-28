
const Signup = ({signup, setSignup, setIsSigningUp, handleSignup, error}) => {
    return (
        <>
        <div className='my-8 space-y-4 flex flex-col justify-center'>
        <div className='flex space-x-2 justify-center'>
          <p>Name</p>
        <input type="text" name="name" id="name" className='w-1/2 px-1 rounded-md outline-none' value={signup.name} onChange={(e) => setSignup({...signup, name: e.target.value})}/>
        </div>
        <div className='flex space-x-2 justify-center'>
          <p>Username</p>
        <input type="text" name="username" id="username" className='w-1/2 px-1 rounded-md outline-none' value={signup.username} onChange={(e) => setSignup({...signup, username: e.target.value})}/>
        </div>
        <div className='flex space-x-2 justify-center'>
          <p>Password</p>
        <input type="password" name="password" id="password" className='w-1/2 px-1 rounded-md outline-none' value={signup.password} onChange={(e) => setSignup({...signup, password: e.target.value})}/>
        </div>
        <button onClick={handleSignup} className='self-center'>Signup</button>
        {error && <span className='my-2'>error</span>}
      </div>
      <div className="underline cursor-pointer" onClick={() => setIsSigningUp(false)}>Logging in?</div>
        </>
    )
}

export default Signup;