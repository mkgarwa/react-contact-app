import React from "react";
import { Link } from "react-router-dom";
import user from '../images/user.png';

const ContactCard = (props) => {
    const {id, name, email} = props.contact;
    return (
        <div className="ui item" style={{padding: "10px 0"}}>
            <img className="ui avatar image" src={user} alt="user" />
            <div className="content">
                <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
            </div>
            <div className="ui right floated" style={{marginTop: "5px"}}>
                <Link to={`/add/${id}`} state={{ contact: props.contact }} className="ui label">
                    <i className="edit icon"></i> Edit
                </Link>
                <Link onClick={() => props.deleteContactHandler(id)} className="ui label">
                    <i className="trash alternate outline icon red"></i> Delete
                </Link>
            </div>
        </div>
    );
}

export default ContactCard;