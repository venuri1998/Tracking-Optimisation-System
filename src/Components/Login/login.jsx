import React from "react";
import AuthService from './auth.service';
import {withRouter} from 'react-router-dom'
import * as firebase from "firebase";
import {Alert} from "react-bootstrap";
import './login.css'


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            Login: [],
            loginError:'false'
        };

        this.handleUserName = this.handleUserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        firebase.database().ref().child('Login').on('value', snapshot => {
            let allUsers = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allUsers.push(snap.val());
            });
            this.setState({Login: allUsers});
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.state.Login.map(l => {
            if (l.userName == this.state.userName && l.password === this.state.password) {
                const userObject = {
                    userName: this.state.userName,
                    password: this.state.password
                }
                AuthService.login(userObject);
                this.props.history.push('/view-order');
                window.location.reload();

            } else {
               this.setState({
                   loginError:true
               })
            }
        })

    }

    handleUserName(event) {
        this.setState({
            userName: event.target.value,

        });
    }

    handlePassword(event) {
        this.setState({
            password: event.target.value,

        });
    }

    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first" style={{marginBottom: 30, marginTop: 30}}>
                        <h5>Login</h5>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="login" className="fadeIn second inputFields types"
                               value={this.state.userName} onChange={this.handleUserName}
                               style={{marginTop:20,marginBottom:5}} placeholder="User Name"/>
                        <input type="password" id="password" className="fadeIn third inputFields types"
                               style={{marginTop:20}}
                               placeholder="Password"
                               value={this.state.password} onChange={this.handlePassword}
                        />
                        <input type="submit" className="fadeIn fourth inputButtons" value="LogIn" style={{marginTop:20,marginBottom:25}}
                        />
                    </form>
                    <div id="formFooter">
                        <Alert show={this.state.loginError} variant="warning"
                               onClose={() => this.setState({loginError: false}, () => {
                                   window.location.reload()
                               })} dismissible>
                            <h6>
                                Please enter valid login details
                            </h6>
                        </Alert>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(Login);
