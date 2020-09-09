import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route} from "react-router-dom";
import AddOrder from "./Components/Order/AddOrder";
import ViewOrder from './Components/Order/ViewOrder'
import Station from "./Components/Stations/Station";
import AddStation from "./Components/Stations/AddStation";
import Appbar from "./Components/NavBar/Appbar";
import Login from "./Components/Login/login";


class App extends React.Component {


    render() {
        return (
            <div className="App">

                <BrowserRouter>
                    <Appbar/>
                    <Route path="/add-order" exact component={AddOrder}/>
                    <Route path="/add-station" exact component={AddStation}/>
                    <Route path="/view-order" exact component={ViewOrder}/>
                    <Route path="/view-station" exact component={Station}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/" exact component={Login}/>


                </BrowserRouter>
            </div>

        );
    }
}

export default App;

