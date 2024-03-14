import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { openModal } from '../../store/modal';

const Navigation = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />
  } else {
    sessionLinks = (
      <>
        <button onClick={() => dispatch(openModal("login"))}>Log In</button>
        <button onClick={() => dispatch(openModal("signup"))}>Sign Up</button>
      </>
    )
  }

  return (
    <>
      <div className='nav'>
        <NavLink exact to="/" className="logo">benchbnb</NavLink>
        {sessionLinks}
      </div>
      {/* <hr /> */}
    </>
  );
}

export default Navigation;