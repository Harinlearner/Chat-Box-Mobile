import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

import './contactLists.css';
function contactList() {
  let user = JSON.parse(localStorage.getItem('userData'));
  const [contact, setContact] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');
  const [dataUpdate, setDataUpdate] = useState(true);


  useEffect(() => {
    axios.get('https://chatbox-backend-1-46yg.onrender.com/user/contactFetch')
      .then((res) => { setContact(res.data); });
  }, []);

  useEffect(() => {
    console.log("datachange reACHED");
    axios.get('https://chatbox-backend-1-46yg.onrender.com/user/contactFetch')
      .then((res) => { setContact(res.data); });
  }, [dataUpdate]);

  useEffect(() => {
    if (selectedContact != '') {
      console.log(selectedContact);
      axios.post('https://chatbox-backend-1-46yg.onrender.com/user/addConvo', { person1: user.userNameLogin, person2: selectedContact })
        .then((res) => { console.log(res); setDataUpdate(!dataUpdate) })
        .catch((err) => { window.alert("Already Conversation exists") });
    }

  }, [selectedContact]);

  return (
    <div>
      <div className='contactContainer'>
        {contact.map((contacts) => (
          <div key={contacts._id}>
            {user.userNameLogin !== contacts.username && <center><button className='contactButton' onClick={() => { setSelectedContact(contacts.username); }}>{contacts.username}</button></center>}
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default contactList
