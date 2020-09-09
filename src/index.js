import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

const firebaseConfig = {
    apiKey: "AIzaSyDtKGWJzPDitWVqKQwez1HxXoQZB-Olr-I",
    authDomain: "united-skyline-252405.firebaseapp.com",
    databaseURL: "https://united-skyline-252405.firebaseio.com",
    projectId: "united-skyline-252405",
    storageBucket: "united-skyline-252405.appspot.com",
    messagingSenderId: "296846306489",
    appId: "1:296846306489:web:606fb093bef0554b99bf68",
    measurementId: "G-ZQ388J7DWK"
}
firebase.initializeApp(firebaseConfig)

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

