import React,{Component} from 'react'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link, NavLink, withRouter} from "react-router-dom";


export default class Appbar extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand as={NavLink} to={"/view-order"}>Tracking & Optimisation System</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to={"/add-order"}>Add Order</Nav.Link>
                    <Nav.Link as={NavLink} to={"/add-station"}>Add Station</Nav.Link>
                    <Nav.Link as={NavLink} to={"/view-order"}>View Orders</Nav.Link>
                    <Nav.Link as={NavLink} to={"/view-station"}>View Stations</Nav.Link>
                </Nav>
            </Navbar>
        );
    }}
