// import './App.css';
// import QuestionPage from './pages/QuestionPage'

// function App() {
//   return (
//     <div className="App">
//       <QuestionPage />
//     </div>
//   );
// }


// export default App;


// import React, { Component } from 'react';
// import withFirebaseAuth from 'react-with-firebase-auth'
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import logo from './logo.svg';
// import './App.css';


// class App extends Component {
//   render() {
//     const {
//       user,
//       signOut,
//       signInWithGoogle,
//     } = this.props;

//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           {
//             user
//               ? <p>Hello, {user.displayName}</p>
//               : <p>Please sign in.</p>
//           }

//           {
//             user
//               ? <button onClick={signOut}>Sign out</button>
//               : <button onClick={signInWithGoogle}>Sign in with Google</button>
//           }
//         </header>
//       </div>
//     );
//   }
// }

// const firebaseAppAuth = firebase.auth();

// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider(),
// };

// export default withFirebaseAuth({
//   providers,
//   firebaseAppAuth,
// })(App);


import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/homePage";
import Dashboard from "./pages/dashboardPage";
import LogIn from "./pages/LoginPage";
import SignUp from "./pages/signupPage";
import { AuthProvider } from "./pages/authPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;



// import React, { Component } from 'react';
// import withFirebaseAuth from 'react-with-firebase-auth'
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import firebaseConfig from './services/firebase';
// import logo from './logo.svg';
// import './App.css';


// class App extends Component {
//   render() {
//     const {
//       user,
//       signOut,
//       signInWithGoogle,
//     } = this.props;

//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           {
//             user
//               ? <p>Hello, {user.displayName}</p>
//               : <p>Please sign in.</p>
//           }

//           {
//             user
//               ? <button onClick={signOut}>Sign out</button>
//               : <button onClick={signInWithGoogle}>Sign in with Google</button>
//           }
//         </header>
//       </div>
//     );
//   }
// }

// const firebaseAppAuth = firebase.auth();

// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider(),
// };

// export default withFirebaseAuth({
//   providers,
//   firebaseAppAuth,
// })(App);
  