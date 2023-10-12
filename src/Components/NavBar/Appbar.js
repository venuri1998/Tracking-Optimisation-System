import React, {Component} from 'react'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import AuthService from '../Login/auth.service'
import {Link, NavLink, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";


export default class Appbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uname: '',
            role: ''
        }
    }

    componentDidMount() {
        const username = AuthService.getUsername();
        this.setState({uname: username})
    }

    loggingOut() {
        AuthService.logout();
        window.location.reload();
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand as={NavLink} to={"/view-order"}>Tracking & Optimisation System</Navbar.Brand>
                <Nav className="mr-auto">
                    {(() => {
                        if (this.state.uname != null) {
                            return <Nav className="mr-auto"> <Nav.Link as={NavLink} to={"/add-order"}>Add
                                Order</Nav.Link>

                                <Nav.Link as={NavLink} to={"/view-order"}>View Orders Hello </Nav.Link>
                                <Nav.Link as={NavLink} to={"/view-station"}>View Stations New</Nav.Link></Nav>
                        }
                    })()}
                    {(() => {
                        if (this.state.uname == 'admin') {
                            return <Nav.Link as={NavLink} to={"/add-station"}>Add Station New</Nav.Link>
                        }
                    })()}
                </Nav>
                {(() => {
                    if (this.state.uname != null) {
                        return <Navbar.Text className="justify-content-end">
                            Signed in as {this.state.uname}
                            <Button
                                style={{color: "white"}}
                                variant="default" size="small" onClick={() => {
                                this.loggingOut()
                            }}>Log Out</Button>
                        </Navbar.Text>
                    } else {
                        return <Nav className="justify-content-end">
                            <Nav.Link as={NavLink} to={"/login"} style={{color: "white"}}><h5>Login</h5></Nav.Link>
                        </Nav>
                    }
                })()}
            </Navbar>
        );
    }
}
