import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="ui fixed inverted menu">
            <div className="ui container">
                <Link to="/add" className="item">Contact Manager</Link>
                <div className="menu right floated">
                    <Link to="/add" className="item">Add</Link>
                    <Link to="/" className="item">Contacts</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;