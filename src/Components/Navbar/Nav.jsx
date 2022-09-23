import React from 'react'
import './Nav.css'
import {useState, useEffect} from 'react'

function Nav() {
    const[show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll", null)
        };
    }, []);

  return (
    <div className={`nav ${show && 'nav_black'}`}>
        <img 
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" 
            alt="netflix_logo" 
            className="nav_logo" 
        />
        <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
            alt="netflix_logo" 
            className="nav_avatar" 
        />

      
    </div>
  )
}

export default Nav
