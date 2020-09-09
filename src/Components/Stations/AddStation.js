import React from 'react'
import * as firebase from 'firebase'
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import TextField from "@material-ui/core/TextField/TextField";
import {Modal} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Table} from "react-bootstrap";


export default class AddStation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stationName: '',
            Stations: [],
            show: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);


    }

    componentDidMount() {
        firebase.database().ref().child('Station').orderByChild('step').on('value', snapshot => {
            let allStations = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allStations.push(snap.val());
            });
            this.setState({Stations: allStations});
        })

    }


    handleName(event) {
        this.setState({
            stationName: event.target.value
        })
    }


    handleSubmit(e) {
        e.preventDefault()

        firebase.database().ref('Station/' + this.state.stationName).set({
            stationName: this.state.stationName,
            step: this.state.Stations.length + 1
        }, () => {
            this.setState({
                stationName: '',
                step: ''
            })
        }).then(this.setState({show: false}))


    }


    render() {
        return (
            <div align="center">
                <Modal show={this.state.show} aria-labelledby="contained-modal-title-vcenter" size="md">
                    <Modal.Header closeButton onClick={() => {
                        this.setState({show: false})
                    }}>
                        <Modal.Title style={{color: "grey", fontWeight: 'bold'}}>
                            Add Station
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Col sm="12">
                                    <TextField
                                        type="text"
                                        label={<p style={{fontSize: 19}}>Station Name</p>}
                                        value={this.state.stationName}
                                        onChange={this.handleName}
                                        fullWidth
                                    />
                                </Col>
                            </Form.Group>
                            <Modal.Footer>
                                <Form.Group>
                                    <Col sm="12" style={{marginTop: 40}}>
                                        <Button variant="secondary" onClick={() => {
                                            this.setState({show: false})
                                        }}>Close</Button>
                                        <Button className="btn btn-info" style={{marginLeft: 15}}
                                                onClick={this.handleSubmit}
                                        >
                                            Add
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </Modal.Footer>

                        </Form>
                    </Modal.Body>


                </Modal>
                <div class="card" style={{width: "50rem", marginTop: 30}}>
                    <div class="card-body" align="center">
                        <div style={{marginTop: 30}}>
                            <Col sm={9}>
                                <h3 align="center" style={{marginBottom: 30}}>Station Details</h3>
                                <div align="left">
                                    <Button className="btn btn-info btn-md"
                                            style={{paddingLeft: 15, paddingRight: 15, marginBottom: 30}}
                                            onClick={() => {
                                                this.setState({show: true})
                                            }}>Add Station</Button>
                                </div>
                                <Table striped bordered hover size="md">
                                    <thead>
                                    <tr>
                                        <th>#Step No.</th>
                                        <th>StationName</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.Stations.map(s => {
                                            return <tr>
                                                <td>{s.step}</td>
                                                <td>{s.stationName}</td>

                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </Table>

                            </Col>

                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
