import React from 'react'
import {
    Link
}

    from "react-router-dom";


export default function Header() {
    function toggleNav() {
        if (window.screen.width < 700) {
            let nav = document.querySelector(".nav");
            nav.classList.toggle("mobile-nav-open");
        }
    }
    return (
        <nav className="nav">
            <ul className="nav-list">
                <Link to={'/'} className="nav-list__link" onClick={() => toggleNav()}>All Recipes</Link>
                <Link to={'/tags/breakfast'} className="nav-list__link" onClick={() => toggleNav()}>Breakfast</Link>
                <Link to={'/tags/lunch'} className="nav-list__link" onClick={() => toggleNav()}>Lunch</Link>
                <Link to={'/tags/dinner'} className="nav-list__link" onClick={() => toggleNav()}>Dinner</Link>
                <Link to={'/tags/dessert'} className="nav-list__link" onClick={() => toggleNav()}>Dessert</Link>
                <Link to={'/tags/drinks'} className="nav-list__link" onClick={() => toggleNav()}>Drinks</Link>
                <button className="nav-btn" onClick={() => toggleNav()}>&#9776;</button>
            </ul>
        </nav>
    )
}
