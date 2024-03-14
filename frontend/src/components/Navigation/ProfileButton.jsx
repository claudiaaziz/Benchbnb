import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { openModal } from "../../store/modal";

const ProfileButton = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => setShowMenu(false);

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <button onClick={logout}>Log Out</button>
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
      <button className="profile-button" onClick={openMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" >
          <path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z"></path>
        </svg>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{sessionLinks}</li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;