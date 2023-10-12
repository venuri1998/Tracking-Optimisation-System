import React from 'react'
import * as firebase from 'firebase'
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();
        // hardcoded sample data
        const normal_uname = 'user';
        const admin_uname = 'admin';
        firebase.database().ref('Login/'+admin_uname).set({
            userName:admin_uname,
            password:"123456",
            role:"admin"
        })
    }



    render() {
        return (
            <div align="center">
                <Form>
                    <Form.Group>

                            <Button  className="btn btn-info" style={{marginLeft:15}} onClick={this.handleSubmit}>Register</Button>
            <h1>Onna babo athinniy</h1>
            <p>Menna mehe waren bn</p>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}
