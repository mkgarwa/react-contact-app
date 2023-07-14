import React, {useRef } from 'react';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    
    const inputEl = useRef("");
    let displayContactList = "No contacts added";

    if(props.contacts.length) {
        displayContactList = props.contacts.map((contact, i) => {
            return(
                <ContactCard contact={contact} key={i} deleteContactHandler={props.deleteContactHandler}></ContactCard>
            );
        });
    }

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    }

    return (
        <div>
            <h4 className="ui horizontal divider" style={{margin: "50px 0"}}>Contact List</h4>
            <div className="ui celled list">
            <div className="ui fluid action input" style={{marginBottom: "40px"}}>
                <input type="text"
                        placeholder="Search..."
                        ref={inputEl}
                        value={props.searchTerm}
                        onChange={getSearchTerm}/>
                <button className="ui button">Search</button>
            </div>
                {displayContactList}
            </div>
        </div>
    );
}

export default ContactList;