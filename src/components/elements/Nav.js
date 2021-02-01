import React from 'react'
import {
    Link
}

    from "react-router-dom";


export default function Header() {
    return (
        <nav className="nav">
            <ul className="nav-list">
                <Link to={'/hot'}><li className="nav-list__link"><a href="#" className="nav-list__link-a">Link 1</a></li></Link>

                <li className="nav-list__link"><a href="#" className="nav-list__link-a">Link 2</a></li>
                <li className="nav-list__link"><a href="#" className="nav-list__link-a">Link 3</a></li>
                <li className="nav-list__link"><a href="#" className="nav-list__link-a">Link 4</a></li>
            </ul>
        </nav>
    )
}
