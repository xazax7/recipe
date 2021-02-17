import React from 'react'
import {
    Link
}

    from "react-router-dom";


export default function Header() {
    function toggleNav() {

        if (window.screen.width < 700) {
            alert("yoo");


        }
        let nav = document.querySelector(".nav");
        nav.classList.toggle("mobile-nav-open");
    }
    return (
        <nav className="nav">
            <ul className="nav-list" onClick={() => toggleNav()}>
                <Link to={'/'} className="nav-list__link">All Recipes</Link>
                <Link to={'/tags/breakfast'} className="nav-list__link">Breakfast</Link>
                <Link to={'/tags/lunch'} className="nav-list__link">Lunch</Link>
                <Link to={'/tags/dinner'} className="nav-list__link">Dinner</Link>
                <Link to={'/tags/dinner'} className="nav-list__link">Sides</Link>
                <Link to={'/tags/dessert'} className="nav-list__link">Dessert</Link>
                <Link to={'/tags/drinks'} className="nav-list__link">Drinks</Link>
                <button className="nav-btn">&#9776;</button>
            </ul>
        </nav>
    )
}
