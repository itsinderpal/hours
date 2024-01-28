const DisplayUser = ({user, handleLogout}) => {
    return (
        <>
        <div className='flex flex-col justify-center my-4'>
            <div>{user.username}</div>
            <div>{user.name}</div>
            <div className='underline cursor-pointer' onClick={handleLogout}>Log out</div>
        </div>
        </>
    )
}

export default DisplayUser