// import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import SessionModal from '../SessionForms';
import './Navigation.css';

const Navigation = () => {
  const sessionUser = useSelector(state => state.session.user);
  // const [showModal, setShowModal] = useState(false);
  // const [type, setType] = useState("signup");

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />
  } else {
    sessionLinks = (
      <>
        <button onClick={() => {
          // setShowModal(true)
          // setType("login")
        }}>Log In</button>
        <button onClick={() => {
          // setShowModal(true)
          // setType("signup")
        }}>Sign Up</button>

        {/* <SessionModal showModal={showModal} setShowModal={setShowModal} type={type} setType={setType}/> */}
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