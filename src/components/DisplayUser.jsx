import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { setHours } from "../reducers/hourReducer";

const DisplayUser = ({user}) => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(setUser(null));
        dispatch(setHours([]));
        window.localStorage.removeItem("loggedInUser");
      };

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