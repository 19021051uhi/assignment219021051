/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import { Button, Modal} from 'react-bootstrap';
import {firestore} from "../services/firebase"
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link, useRouteMatch } from "react-router-dom";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import '../css/popup.css';
var userExist = false;
var userPosted = false;
var currentUsername = null
var currentUserEmail = null
var currentUserPhotUrl = null
var currentUserUID = null


function PopUp(props) {
  const [show, setShow] = useState(false);
  const [chat, setChat] = useState(false);
  const [desc, setDesc] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const chatClose = () => setChat(false);
  const chatOpen = () => setChat(!chat);
  
  const descClose = () => setDesc(!desc);
  const descOpen = () => setDesc(true);

  let userExist = false;
  const { btntext,  vari} = props;

  const [videoUri, setImageUri] = useState("")
  const [showFAQ, setShowFAQ] = useState(false)

  const questionId = "balances"

  const [usertext, setChatTxt] = useState("")

  const dummy = useRef();
  const messagesRef = firestore.collection('Chats');
  const query = messagesRef.where('listed', '==', 'true')
  const [messages] = useCollectionData(query, { idField: 'id' });
  
  const auth = firebase.auth();



  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      firestore.collection("Chats")
      .where('listed', '==', 'true')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(
          doc =>{
            const data = JSON.parse(JSON.stringify(doc.data()))
            if(data.listed){
              setShowFAQ(true)
            }else{
              setShowFAQ(false)
            }
            
          });

      }).catch(err => {
        
      });

    }
  });





  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentUsername = user.displayName
      currentUserEmail = user.email
      currentUserPhotUrl = user.photoURL
      currentUserUID = user.uid


    } else {
      currentUsername = null
      currentUserEmail = null
      currentUserPhotUrl = null
      currentUserUID = null
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () =>{

    const doc = firestore.collection('Questions').doc(questionId);
    const observer = doc.onSnapshot(docSnapshot => {

        const data = JSON.parse(JSON.stringify(docSnapshot.data()))
        setImageUri(data.balances.balances.questions.fullquestion.questionvideo)
    }, err => {
      console.log(`Encountered error: ${err}`);
    });

  }, [])


  function FAQS(props) {
    const { text, photoURL, link } = props.message;
    const messageClass = 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <div className="message back outer">
          <img class="circles " src={photoURL || 'https://firebasestorage.googleapis.com/v0/b/assignment219021051.appspot.com/o/avatar.png?alt=media'} />
          <div class="inner"><p>{text}</p></div>
          {link ? <div class="inner"><img class="inner" src={link} style={{maxWidth:300, maxHeight:300}} /></div> : <br/>}
        </div>
      </div>
    </>)  
  }
  

  
function checkIfUserExist(ctext){

  firestore.collection("Users")
  .get()
  .then(querySnapshot => {
    const data = querySnapshot.docs.map(
      doc =>{
        const data = JSON.parse(JSON.stringify(doc.data()))
        if(data.email === currentUserEmail){
          userExist = true;
        }

      });
      if(userExist){
        var date = new Date();
        var timestamp = date.getTime();

        firestore.collection("Chats")
        .doc()
        .set({
          dateposted: timestamp,
          link: '',
          listed: 'false',
          adminid: '',
          text: ctext.text,
          questionid: 'balances',
          userid: currentUserEmail,
          uid: currentUserUID,
          photoURL: currentUserPhotUrl
        })
        .then(() => {
          userExist = false;

          checkIfUserPosted()

        })
        .catch(error => {
          alert('An error occurred! Please try again later.')
          userExist = false;
          console.log(error)
        })

      }else{

        firestore.collection("Users")
        .doc()
        .set({
          email: currentUserEmail,
          name: currentUsername,
          role: 'user'
        })
        .then(() => {
          userExist = false;

          checkIfUserPosted(ctext)

        })
        .catch(error => {
          alert('An error occurred! Please try again later.')
          userExist = false;

          console.log(error)

        });

      }
  });
}

function checkIfUserPosted(ctext){

  firestore.collection("Chats")
  .get()
  .then(querySnapshot => {
    const data = querySnapshot.docs.map(
      doc => {
        const data = JSON.parse(JSON.stringify(doc.data()))
        if(data.userid === currentUserEmail){
          userPosted = true;
        }

      });
      if(userPosted){
        alert('Your message was sent and you will get a reply within 3 days')
        window.location = "/";
      }else{

        var date = new Date();
        var timestamp = date.getTime();

        firestore.collection("Chats")
        .doc()
        .set({
          dateposted: timestamp,
          link: '',
          listed: 'false',
          adminid: '',
          text: ctext.text,
          questionid: 'balances',
          userid: currentUserEmail
        })
        .then(() => {
          alert('Successfully sent!')
          userPosted = false;
          alert('Your message was sent and you will get a reply within 3 days')
          window.location = "/";


        })
        .catch(error => {
          alert('An error occurred! Please try again later.')

          console.log(error)
        })


      }
  });
}


  return (
    <>
      <Button variant={vari} onClick={handleShow}>
        {btntext}
      </Button>

      <Modal dialogClassName="custom-modal modal-lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
         <Modal.Title>
         </Modal.Title>
        </Modal.Header>
        {

          showFAQ ?

          <div class="row">

            <div class="col-lg faqs">
              <main>
                {messages && messages.map(msg => <FAQS key={msg.uid} message={msg} />)}
                <span ref={dummy}></span>
              </main>
            </div>
            <div class="vl"></div>
            <div class="col-lg">
              <Modal.Body >
                <div class="d-flex justify-content-center" width="400">
                  <video class="videoplayer" width="400" height="300" controls >
                    <source src={videoUri} type="video/mp4"/>
                  </video>
                </div>
              </Modal.Body>
            </div>
          </div>
          :
          <Modal.Body >
          <div class="d-flex justify-content-center" width="400">
            <video class="videoplayer" width="400" height="300" controls >
              <source src={videoUri} type="video/mp4"/>
            </video>
          </div>
          </Modal.Body>

          }

        <Modal.Footer>
          <div class="container" >
            <div class="row">
              <div class="col-lg-12">
                <div class="confused justify-content-right" style={{ display: (desc ? 'block' : 'none') }} onClick={() => {chatOpen(chat); descClose(desc);}}>Confused</div>
              </div>
              <div class="col-lg-12">
                <div style={{ display: (desc ? 'block' : 'none') }}>Slide: (<Link to="/#">prev</Link> | <Link to="/#">replay</Link> | <Link to="/#">next</Link> | <Link to="/#">-5s</Link> | <Link to="/#">+5s</Link> )</div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12" style={{ display: (desc ? 'block' : 'none') }}>
                Question: (<Link to="/#">prev</Link> | <Link to="/#">replay</Link> | <Link to="/#">next</Link>)
              </div>
            </div>
          </div>
          <div class="col-lg-12" style={{ display: (chat ? 'block' : 'none') }} >
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">What have you found confusing about this video?</label>
                <input type="text" onChange={ e => setChatTxt({text: e.target.value})} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Type your message here..."/>
              </div>
                <button type="button" class="btn btn-primary btn-cancel" onClick={() => {checkIfUserExist(usertext); handleClose();}}>Send</button>
                <button type="button" class="btn btn-outline-info btn-cancel" onClick={() => {chatOpen(chat); descClose(desc);}}>Cancel</button>


            </form>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}






















export default PopUp;
