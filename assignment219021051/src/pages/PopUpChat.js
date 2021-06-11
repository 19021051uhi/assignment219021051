import React, { useRef, useState, useEffect } from "react";
import { Button, Modal} from 'react-bootstrap';
import {firestore} from "../services/firebase"
import firebase from 'firebase/app';
import firebases from 'firebase'
import { Link } from "react-router-dom";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import '../css/popupchat.css';

const auth = firebase.auth();


function PopUp(props) {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { btntext,  vari, classn, isadmin} = props;
  console.log("==---===>>>> " + isadmin)

  const dummy = useRef();
  const messagesRef = firestore.collection('Chats');
  const query = messagesRef.orderBy('dateposted').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const [adminid, setAdminid] = useState('');


  const [filevalue, setFileValue] = useState('');


  const sendMessage = async (e, url) => {
    e.preventDefault();
    console.log('=====9999999========>  ' + url)

    const { uid, photoURL } = auth.currentUser;
    const questionid = 'balances'
    const userid = auth.currentUser.email

    var date = new Date();
    var timestamp = date.getTime();

    await messagesRef.add({
      text: formValue,
      dateposted: timestamp,
      userid,
      uid,
      listed: 'false',
      link: url,
      photoURL,
      questionid,
      adminid
    })

    setFormValue('');
    setAdminid('')
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  function addToFAQ(uid, dateposted){

    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {

    //     firestore.collection("Chats")
    //     .where('uid', '==', uid)
    //     .where('dateposted', '==', dateposted)
    //     .update({
    //       listed: 'true',
    //     })
    //     .then(res => {

    //       alert('000000  ' + res)

    //     }).catch(err => {
    //       alert('99999' + err)
          
    //     });

    //   }
    // });


    console.log('uuuuuuuuuuuuuuuuuuuu ' + uid + " ////////  " + dateposted)
    // const collection = firebase.firestore().collection("Users")

    // const newDocumentBody = {
    //   listed: 'true',
      
    // }

    // collection
    // .where('uid', '==', uid)
    // .where('dateposted', '==', dateposted)
    // .get().then(response => {
    //     let batch = firebase.firestore().batch()
    //     response.docs.forEach((doc) => {
    //         console.log('zzzzzzzzzzzz ' + doc.id)

    //         const docRef = firebase.firestore().collection("Users").doc(doc.id)
    //         batch.update(docRef, newDocumentBody)
    //     })
    //     batch.commit().then(() => {
    //         console.log(`updated all documents inside ${"Users"}`)
    //     }).catch(errr=>{

    //       console.log("eeeerrrrrrrrrr=> " + errr)
    //     })
    // }).catch(err=>{
    //   console.log('eeeeeeeeeer ==> ' + err)

    // })



    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        firestore.collection("Chats")
        .where('uid', '==', uid)
        .where('dateposted', '==', dateposted)
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(
            doc =>{
              console.log("ffffffffffffffff  " + doc.id)
              alert('Successfully added to FAQs')
            const id = doc.id
            firestore.collection('Chats').doc(id)
            .set({
              listed: 'true',
            }, {merge: true})
            }).then(()=>{
            });


        }).catch(err => {
          
        });

        

      }
    });


  }



  function handleUpload(e){
    // console.log(this.state.image);
    console.log("-------------> " + filevalue.name)
    e.preventDefault();
    
  
    if(!filevalue.name){
      sendMessage(e, '')
      return
    }
    let file = filevalue
    var storage = firebases.storage();
    var storageRef = storage.ref();
    var uploadTask = storageRef.child('folder/' + file.name).put(file);
    uploadTask.on(firebases.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>{
        var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
        console.log("---%%%%%%----> " + progress)
  
      },(error) =>{
        throw error
      },() =>{
        // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
  
        uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
          console.log("---@@@@@@@@@----> " + url)
          sendMessage(e, url)
  
        })
        document.getElementById("myInput").value = null
  
     }
   ) 
  
  
  //  const storage = firebases.storage();
  //  const files = file; 
  //  files.map( filename => {
  //      storage
  //        .ref( `/covers/${filename}` )
  //        .getDownloadURL()
  //        .then( url => {
  //          console.log( "Got download url: ", url );
  //        });
  //  });
  
  
  
  }
  
  
  
  
  function fileSelectedHandler(event){
    
    console.log('===========> ' + event.target.files[0]);
    setFileValue(event.target.files[0]);
    alert(`image (${event.target.files[0].name}) successfully attached!`)
    // this.setState({
    //     selectedFile: event.target.files[0]
    // }, () => this.fileUploadHandler());
  };
  
  function ChatMessage(props) {
    const { text, uid, photoURL, link, dateposted, userid } = props.message;
  
    const messageClass = userid === auth.currentUser.email ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <div className="message back outer">
          <img class="circles " src={photoURL || 'https://firebasestorage.googleapis.com/v0/b/assignment219021051.appspot.com/o/avatar.png?alt=media'} />
          <div class="inner"><p>{text}</p></div>
          {link ? <div class="inner"><img class="inner" src={link} style={{maxWidth:300, maxHeight:300}} /></div> : <br/>}
          {isadmin && messageClass === 'sent'  ? <div class="d-flex justify-content-center"> <button class="btn btn-primary" onClick={() => {addToFAQ(uid, dateposted);}}>Add to FAQ's</button></div> : <br/>}
        </div>
      </div>
    </>)  
  }
  



  return (
    <>
      {classn === 'circle' ? 
        <div class="btn-signout circle" onClick={handleShow}><span class="initials">R</span></div>
        :
        <Button variant={vari} class={classn} onClick={handleShow}>{btntext}</Button>
       }

      <Modal dialogClassName="custom-modal modal-md" show={show} onHide={handleClose}>
        <Modal.Body >
          <div class="modalb">

            <main>

              {messages && messages.map(msg => <ChatMessage key={msg.uid} message={msg} />)}

              <span ref={dummy}></span>

            </main>


          
          </div>
        </Modal.Body>
        <Modal.Footer>
        <div class="col-lg-12" >

            <form onSubmit={handleUpload}>
              
            <label htmlFor="myInput"><img className="picture" src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/camera-512.png"></img></label>
                <input
                  id="myInput"
                  style={{display:'none'}}
                  type={"file"}
                  onChange={(e) => fileSelectedHandler(e)}
                />

              <input value={formValue} class="form-controls input-chat" onChange={(e) => setFormValue(e.target.value)} placeholder="Type your message..." />



              <button type="submit" class="btn btn-primary btn-send" disabled={!formValue}>Send</button>



            </form>

          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}




export default PopUp;

