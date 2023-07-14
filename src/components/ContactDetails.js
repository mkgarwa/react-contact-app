import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import user from '../images/user.png';

function ContactDetails() {
    const data = useLocation().state;
    const {name, email} = data.contact;
    return (
        <div>
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="avatar" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="meta">{email}</div>
                </div>
                <div className="ui bottom attached button">
                <Link to="/">
                    <button className="ui black button"><i className="chevron left icon"></i>Back</button>
                </Link>
                <Link to={`/add/${data.contact.id}`} state={{ contact: data.contact }} className="center-div">
                    <button className="ui black button"><i className="pencil icon"></i> Edit</button>
                </Link>
            </div>
            </div>
        </div>
    );
}

export default ContactDetails;