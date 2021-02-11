import React from 'react'
import {
    Link
}

    from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <span className="footer-title">Darling, Dinner's Ready</span>

                    <span>Copyright © {new Date().getFullYear()} darlingdinnersready.com</span>
                </div>
                <div className="footer-newsletter footer-section">
                    <h4>Get dinner ideas and recipes straight to your inbox!</h4>
                    <label for="newsletter-email">E-mail</label>
                    <input type="text" id="newsletter-email"></input>
                    <button>Subscribe</button>
                </div>
                <div className="footer-section footer-nav">
                    <ul className="nav-list footer-nav-list">
                        <Link to={'/'} className="nav-list__link footer-link">All Recipes</Link>
                        <Link to={'/tags/breakfast'} className="nav-list__link footer-link">Breakfast</Link>
                        <Link to={'/tags/lunch'} className="nav-list__link footer-link">Lunch</Link>
                        <Link to={'/tags/dinner'} className="nav-list__link footer-link">Dinner</Link>
                        <Link to={'/tags/dessert'} className="nav-list__link footer-link">Dessert</Link>
                        <Link to={'/tags/drinks'} className="nav-list__link footer-link">Drinks</Link>
                    </ul>
                </div>
            </div>
        </footer>

    )
}