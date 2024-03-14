import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = () => {
  return (
    <>
      <div className='nav'>
        <NavLink exact to="/" className="logo">benchbnb</NavLink>
        <ProfileButton />
      </div>
      {/* <hr /> */}
    </>
  );
}

export default Navigation;