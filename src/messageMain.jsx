import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './mess.css'
import contactList from './contactList';
import { useNavigate } from 'react-router-dom';

function message() {

  const userData = JSON.parse(localStorage.getItem('userData'));
  const userD = JSON.parse(localStorage.getItem('message'));
  let userNameMessage = userData.userNameLogin;
  let interval = 22;
  const [contact, setContact] = useState([]);
  const [logDetails, setLogDetails] = useState([]);
  const [convo, setConvo] = useState([]);
  const [messageId, setMessageId] = useState('6713b902a6c1f8602abfb9b4');
  const [message, setMessage] = useState('');
  const [person1, setPerson1] = useState('select any Contact');
  const [userName, setUserName] = useState(userNameMessage);
  const [connectName, setConnctname] = useState('abc');
  const [addFlag, setAddFlag] = useState(false);
  const [addConvo, setAddConvo] = useState(false);
  const refer = useRef(null);
  const navigate = useNavigate();
  const [contactFrame, setContactFrame] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');
  const [dataUpdate, setDataUpdate] = useState(true);
  const [online, setOnline] = useState([]);
  const location = useLocation();

  const onorOff = (person1) => {
    if (online.includes(person1)) {
      return false;
    }
    else {
      return true;
    }
  };
  // run every time you enter the page
  useEffect(() => {
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    console.log(new Date().getYear());
    const day1 = date + "-" + month + "-" + year;
    axios.get(`https://chatbox-backend-k4rp.onrender.com/user/fetchlog/${day1}`)
      .then((resp) => { setLogDetails(resp.data); });
    // console.log(logDetails);
  }, [location.pathname, convo]);

  function submitted(e) {
    e.preventDefault();
    setConvo([...convo, { person: person1, personConvo: message }]);
    axios.put(`https://chatbox-backend-k4rp.onrender.com/user/update/${messageId}`, { updatedMessage: message, personCon: userName })
      .then((res) => console.log("success"))
      .then(error => console.log(error))
    axios.get(`https://chatbox-backend-k4rp.onrender.com/user/fetch/${userName}`)
      .then(response => { setContact(response.data); });
    console.log(message);
    setMessage('');
  }

  function fetchlog() {
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const day1 = date + "-" + month + "-" + year;
    axios.get(`https://chatbox-backend-k4rp.onrender.com/user/fetchlog/${day1}`)
      .then((resp) => { setLogDetails(resp.data); });
  }

  // it is used to update change after some time because react will not update directly it update collectively
  useEffect(() => {
    const onlinet = logDetails.map(({ username }) => (username));
    setOnline(onlinet);
    console.log(online);
  }, [logDetails], convo);


  function logOut() {
    axios.post('https://chatbox-backend-k4rp.onrender.com/user/removelog', { userName: userName })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    navigate("/");
  }
  function fetching() {
    setDataUpdate(!dataUpdate);
    axios.get(`https://chatbox-backend-k4rp.onrender.com/user/fetch/${userName}`)
      .then(response => { setContact(response.data); });
  }
  useEffect(() => {
    refer.current?.scrollIntoView({ behaviour: "smooth" });
    axios.get(`https://chatbox-backend-k4rp.onrender.com/user/fetch/${userName}`)
      .then(response => { setContact(response.data); });
  }, [convo]);

  useEffect(() => {
    setInterval(() => {
      console.log("1500");
      fetching();
    }, 1500);
    axios.get(`https://chatbox-backend-k4rp.onrender.com/user/fetch/${userName}`)
      .then(response => { setContact(response.data); });
  }, []);

  useEffect(() => {
    // refer.current?.scrollIntoView({ behaviour: "smooth" });
    axios.get(`https://chatbox-backend-k4rp.onrender.com/user/fetch/${userName}`)
      .then(response => { setContact(response.data); });

  }, [dataUpdate, addConvo]);

  /*        iframe           */
  useEffect(() => {
    axios.get('https://chatbox-backend-k4rp.onrender.com/user/contactFetch')
      .then((res) => { setContactFrame(res.data); });
  }, [addFlag]);

  useEffect(() => {
    console.log(userD.messageId);
    axios.get(`https://chatbox-backend-k4rp.onrender.com/user/fetch/${userName}`)
      .then(response => { setContact(response.data); });

  }, []);

  useEffect(() => {

    axios.get('https://chatbox-backend-k4rp.onrender.com/user/contactFetch')
      .then((res) => { setContactFrame(res.data); });
  }, [dataUpdate]);

  useEffect(() => {
    if (selectedContact != '') {
      const firstPerson = contact.map(({ person1 }) => (person1));
      const secondPerson = contact.map(({ person2 }) => (person2));
      console.log(selectedContact);
      if (!firstPerson.includes(selectedContact) && !secondPerson.includes(selectedContact)) {
        axios.post('https://chatbox-backend-k4rp.onrender.com/user/addConvo', { person1: userNameMessage, person2: selectedContact })
          .then((res) => { console.log(res); setDataUpdate(!dataUpdate); })
          .catch((err) => { console.log(err); });
      }
      else {
        window.alert("Conversation already exists");
      }
    }
  }, [selectedContact]);
  return (
    <div className='frame' >
      <div className='container'>
        <div style={{ height: window.innerHeight, width: window.innerWidth - 30 }}>
          <div className="username" style={{ width: window.innerWidth }}><div className='userposition'>{person1}
            {person1 != "select any Contact" && (!onorOff(person1) && <button className='onlineButton'>Online</button>)}
            {person1 != "select any Contact" && (onorOff(person1) && <button className='offlineButton'>Offline</button>)}
          </div>
          </div>
          <div className='messageContainer' style={{ width: window.innerWidth, height: window.innerHeight }}>
            {contact.map(contacts => {
              return (
                <div key={contacts._id}>
                  {contacts._id === userD.messageId &&
                    contacts.convo.map(mess =>
                      <div key={mess._id}>
                        {/* { contacts.person1 === mess.person &&
                        <div className="messageContent" style={{ backgroundColor: 'goldenrod', width: '80%', marginBottom: '-40px',float:'right' }}><h1>{mess.personConvo}</h1>
                        </div>
                        } */}
                        {userName === mess.person &&
                          <div className="messageContent" style={{ color: 'black', marginRight: "12px", backgroundColor: 'ghostwhite', width: 'fit-content', marginBottom: '-70px', float: 'right', height: "35px" }}><h1>{mess.personConvo}</h1>
                          </div>
                        }
                        {userName !== mess.person &&
                          <div className="messageContent" style={{ color: 'black', marginLeft: "8px", backgroundColor: 'ghostwhite', width: 'fit-content', marginBottom: '-70px', float: 'left', height: "35px" }}><h1>{mess.personConvo}</h1>
                          </div>
                        }

                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                      </div>
                    )
                  }
                </div>
              );
            })
            }
            <div ref={refer} style={{ marginTop: "105px" }} ></div>
          </div>
          <div>
            <form onSubmit={(e) => { interval = setTimeout(() => { console.log("Running"); setAddConvo(!addConvo); console.log(interval); }, 500); submitted(e); }}>
              <input className='messageBox' type='text' value={message} onChange={(e) => { setMessage(e.target.value) }}></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default message;