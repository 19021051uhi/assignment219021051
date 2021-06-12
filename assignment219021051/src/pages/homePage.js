
import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import {firestore} from "../services/firebase"
import 'firebase/auth';
import firebaseConfig from '../services/firebase';
import QuestionPage from './QuestionPage'
import '../css/home.css'
import Popup from "./PopUpChat";

var replied = false
var admin = false
var that


class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = ({
        categoriesList: false,
        isadmin: false
    })
    that = this;
  }



    componentDidMount(){

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
  
          firestore.collection("Chats")
          .where('questionid', '==', 'balances')
          .where('userid', '==', user.email)
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(
              doc =>{
                const data = JSON.parse(JSON.stringify(doc.data()))
                  if(!data.adminid){
                  replied = false
                }else{
                  replied = true
                }
                
              });

              that.setState({categoriesList: replied});
              that.forceUpdate();
  
          }).catch(err => {
            
          });

        }
      });

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
  
          firestore.collection("Users")
          .where('email', '==', user.email)
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(
              doc =>{
                const data = JSON.parse(JSON.stringify(doc.data()))
                console.log('7777777777 ' + data.role)
                  if(data.role === 'admin'){
                  admin = true
                }else{
                  admin = false
                }
                
              });

              that.setState({categoriesList: replied});
              that.forceUpdate();
  
          }).catch(err => {
            
          });

        }
      });

  }


  

  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (
      <div className="">
        <header className="App-header">
          <div class="row">
            <div class="col-lg-12">
                {
                user ? <div className="txt-hello">Hello, <b>{user.displayName}</b> </div> : <br/>
              }
              {
                
                user ? <Popup isadmin={admin} style={{ display: (this.state.categoriesList ? 'block' : 'none') }}  btntext="R" classn="circle" vari="primary"/> : <br/>
              }
              {
                user ? <button type="button" className="btn-signout btn btn-danger" onClick={() => {firebase.auth().signOut(); window.location = "/";}}>Sign out</button> : <br/>
              }
              {
                user ? <QuestionPage/>: <br/>
              }
              {
                user ? <br/> : <button type="button" class="btn btn-danger btn-signin" onClick={signInWithGoogle}>Sign in with Google</button> 
              }
            </div>
          </div>
        </header>
      </div>
    );
  }
}



const firebaseAppAuth = firebase.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(Homepage);
  