import React from 'react'
import {
    Link
}

    from "react-router-dom";


export default function Header() {
    return (
        <nav className="nav">
            <ul className="nav-list">
                <Link to={'/breakfast'}><li className="nav-list__link"><a href="#" className="nav-list__link-a">Breakfast</a></li></Link>
                <Link to={'/lunch'}><li className="nav-list__link"><a href="#" className="nav-list__link-a">Lunch</a></li></Link>
                <Link to={'/dinner'}><li className="nav-list__link"><a href="#" className="nav-list__link-a">Dinner</a></li></Link>
                <Link to={'/dessert'}><li className="nav-list__link"><a href="#" className="nav-list__link-a">Dessert</a></li></Link>
                <Link to={'/drinks'}><li className="nav-list__link"><a href="#" className="nav-list__link-a">Drinks</a></li></Link>
            </ul>
        </nav>
    )
}
