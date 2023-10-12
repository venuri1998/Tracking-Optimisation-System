import React from 'react'
import * as firebase from 'firebase'
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import TextField from "@material-ui/core/TextField/TextField";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from "@material-ui/core/Select/Select";
import {Alert} from "react-bootstrap";
import Button from "@material-ui/core/Button/Button";


export default class AddOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: '',
            createDate: '',
            cdate: '',
            color: '',
            style: '',
            size: '',
            Stations: [],
            getOrders: [],
            current_status: 'Pending',
            current_station: '',
            show: false,
            showSuccess: false,
            idError: '',
            emptyError: '',
            dateError: '',
            colorError: '',
            styleError: '',
            sizeError: ''

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOrderId = this.handleOrderId.bind(this);
        this.handleCreateDate = this.handleCreateDate.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleStyle = this.handleStyle.bind(this);
        this.handleSize = this.handleSize.bind(this);

    }

    componentDidMount() {
        firebase.database().ref().child('Order').on('value', snapshot => {
            let allOrders = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allOrders.push(snap.val());
            });
            this.setState({getOrders: allOrders});
        })

        firebase.database().ref().child('Station').orderByChild('step').on('value', snapshot => {
            let allStations = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allStations.push(snap.val());
            });
            this.setState({Stations: allStations});
            if (this.state.Stations.length != 0) {
                this.setState({
                    current_station: this.state.Stations[0].stationName
                })
            } else {
                this.setState({
                    show: true
                })
            }
        })


    }

    componentDidMount222323() {
        firebase.database().ref().child('Order').on('value', snapshot => {
            let allOrders = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allOrders.push(snap.val());
            });
            this.setState({getOrders: allOrders});
        })

        firebase.database().ref().child('Station').orderByChild('step').on('value', snapshot => {
            let allStations = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allStations.push(snap.val());
            });
            this.setState({Stations: allStations});
            if (this.state.Stations.length != 0) {
                this.setState({
                    current_station: this.state.Stations[0].stationName
                })
            } else {
                this.setState({
                    show: true
                })
            }
        })


    }

    handleOrderId(event) {
        this.setState({
            orderId: event.target.value
        })

    }

    handleCreateDate(event, datee) {
        this.setState({
            createDate: datee
        })

    }

    handleColor(event) {
        this.setState({
            color: event.target.value
        })
    }

    handleSize(event) {
        this.setState({
            size: event.target.value
        })
    }

    handleStyle(event) {
        this.setState({
            style: event.target.value
        })
    }

    isValid = () => {
        let idError = '';
        let dateError = '';
        let colorError = '';
        let styleError = '';
        let sizeError = '';
        let emptyError = '';

        if (this.state.getOrders.length != 0) {
            for (let j = 0; j < this.state.getOrders.length; j++) {
                if ((this.state.orderId === this.state.getOrders[j].orderId) || !this.state.orderId) {
                    idError = "Invalid Order Id"
                }
            }
        } else {
            if (!this.state.orderId) {
                emptyError = "Invalid Order Id"
            }
        }
        if (!this.state.color) {
            colorError = "Color cannot be empty"
        }
        if (!this.state.style) {
            styleError = "Style cannot be empty"
        }
        if (!this.state.size) {
            sizeError = "Size cannot be empty"
        }
        if (!this.state.createDate) {
            dateError = "Invalid date"
        }
        if (idError || dateError || colorError || sizeError || styleError || emptyError) {
            this.setState({
                idError, dateError, colorError, sizeError, styleError, emptyError
            })
            return false;
        }
        this.setState({
            idError: '',
            dateError: '',
            colorError: '',
            sizeError: '',
            styleError: '',
            emptyError: ''
        })
        return true;
    }

    handleSubmit(e) {
        e.preventDefault()
        const validate = this.isValid();
        if (validate === true) {
            if (this.state.Stations.length != 0) {
                firebase.database().ref('Order/' + this.state.orderId).set({
                    orderId: this.state.orderId,
                    createDate: this.state.createDate,
                    color: this.state.color,
                    size: this.state.size,
                    style: this.state.style,
                    current_status: this.state.current_status,
                    current_station: this.state.current_station
                }, () => {
                    this.setState({
                        orderId: '',
                        createDate: '',
                        color: '',
                        size: '',
                        style: '',
                        showSuccess: true
                    })
                })
            } else {
                this.setState({
                    show: true
                })

            }
        }
    }

    render() {
        return (
            <div align="center">

                <div class="card" style={{width: "50rem", marginTop: 30}}>
                    <div class="card-body" align="center">
                        <Alert show={this.state.show} variant="danger"
                               onClose={() => this.setState({show: false}, () => {
                                   window.location.reload()
                               })} dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                Stations are empty.
                                Add Stations before adding any orders.
                                If Added dismissed this warning.
                            </p>
                        </Alert>
                        <Alert show={this.state.showSuccess} variant="success"
                               onClose={() => this.setState({showSuccess: false}, () => {
                                   window.location.reload()
                               })} dismissible>
                            <p>
                                Order is Successfully Added !
                            </p>
                        </Alert>
                        <div style={{marginTop: 30}}>
                            <Col sm={9}>
                                <h3 align="center" style={{marginBottom: 30}}>Add Order</h3>
                                <Form>
                                    <Form.Group>
                                        <Col sm="12">
                                            <TextField
                                                type="text"
                                                label={<p style={{fontSize: 19}}>Order Id</p>}
                                                value={this.state.orderId}
                                                onChange={this.handleOrderId}
                                                fullWidth
                                            />
                                        </Col>
                                        <div style={{fontSize: 16, color: "red", marginLeft: '50px'}}>
                                            {this.state.idError}
                                        </div>
                                        <div style={{fontSize: 16, color: "red", marginLeft: '50px'}}>
                                            {this.state.emptyError}
                                        </div>
                                    </Form.Group>
                                    <Form.Group>
                                        <Col sm="12">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    fullWidth
                                                    variant="inline"
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    default="hghg"
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                    onChange={this.handleCreateDate}
                                                    value={this.state.createDate}
                                                    disablePast
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group>
                                        <Col sm="12">
                                            <Select
                                                native
                                                value={this.state.color}
                                                onChange={this.handleColor}
                                                fullWidth
                                            >
                                                <option aria-label="None" value="">Select Color</option>
                                                <option value="Red">Red</option>
                                                <option value="Yellow">Yellow</option>
                                                <option value="Green">Green</option>
                                                <option value="Blue">Blue</option>
                                            </Select>
                                        </Col>
                                        <div style={{fontSize: 16, color: "red", marginLeft: '50px'}}>
                                            {this.state.colorError}
                                        </div>
                                    </Form.Group>
                                    <Form.Group>
                                        <Col sm="12" style={{marginTop: 40}}>
                                            <Select
                                                native
                                                value={this.state.style}
                                                onChange={this.handleStyle}
                                                fullWidth
                                            >
                                                <option aria-label="None" value="">Select Style</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                            </Select>
                                        </Col>
                                        <div style={{fontSize: 16, color: "red", marginLeft: '50px'}}>
                                            {this.state.styleError}
                                        </div>
                                    </Form.Group>
                                    <Form.Group>
                                        <Col sm="12" style={{marginTop: 40}}>
                                            <Select
                                                native
                                                value={this.state.size}
                                                onChange={this.handleSize}
                                                fullWidth
                                            >
                                                <option aria-label="None" value="">Select Size</option>
                                                <option value="S">S</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                            </Select>
                                        </Col>
                                        <div style={{fontSize: 16, color: "red", marginLeft: '50px'}}>
                                            {this.state.sizeError}
                                        </div>
                                    </Form.Group>
                                    <Form.Group>
                                        <Col sm="12" style={{marginTop: 40}}>
                                            <Button variant="contained" color="primary"
                                                    onClick={this.handleSubmit}
                                            >
                                                Add Order
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

