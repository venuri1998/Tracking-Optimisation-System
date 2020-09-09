import React, {Component} from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Form from "react-bootstrap/Form";
import * as firebase from 'firebase';
import './viewStation.css'
import Col from "react-bootstrap/Col";

export default class Station extends Component {

    constructor(props) {
        super(props);
        this.handleStation = this.handleStation.bind(this);
        this.state = {
            Orders: [],
            Stations: [],
            status: '',
            station: '',
            selected_station: ''
        }
    }

    componentDidMount() {
        firebase.database().ref().child('Station').orderByChild('step').on('value', snapshot => {
            let allStations = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allStations.push(snap.val());
            });
            this.setState({Stations: allStations});
            if (this.state.Stations.length != 0) {
                this.setState({
                    selected_station: allStations[0].stationName
                })
            }
        })
        firebase.database().ref().child('Order').orderByKey().on('value', snapshot => {
            let allOrders = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allOrders.push(snap.val());
            });
            this.setState({Orders: allOrders}, () => {
                this.setStaion()
            });
        })

    }

    handleStation(event) {
        this.setState({
            selected_station: event.target.value
        })


    }

    status_update_inprogress = (id) => {
        firebase.database().ref('Order/' + id).update({
            current_status: 'In Progress'
        })
    }

    status_update_done = (id, sts) => {
        const index = this.state.Stations.map(e => e.stationName).indexOf(sts);
        console.log("jdjdjdjd" + index + "dgdggd" + this.state.Stations.length)

        /*
        firebase.database().ref('Order/' + id).update({
            current_status:'Pending',
            current_station: this.state.Stations[index+1].stationName
        })*/
        if (index + 1 === this.state.Stations.length) {
            firebase.database().ref('Order/' + id).update({
                current_status: 'Done',
                current_station: sts
            })

        } else {
            firebase.database().ref('Order/' + id).update({
                current_status: 'Pending',
                current_station: this.state.Stations[index + 1].stationName
            })
        }
    }

    setStaion = () => {
        this.state.Orders.map(e => {
            const index = this.state.Stations.map(l => l.stationName).indexOf(e.current_station);
            if (index > 0) {
                console.log(index)
                for (let i = 0; i < index; i++) {
                    console.log(i)
                    const obj = {

                        createDate: e.createDate,
                        color: e.color,
                        current_status: 'Done',
                        current_station: this.state.Stations[i].stationName,
                        orderId: e.orderId,
                        style: e.style,
                        size: e.size
                    }
                    //var newStateArray = this.state.Orders.slice();
                    //newStateArray.push(obj);
                    //this.setState({Orders: newStateArray});

                    this.state.Orders.push(obj);
                    //console.log(this.state.Orders)
                    this.setState({}, () => {
                        this.state.Orders.sort(function (a, b) {
                            return a.current_station - b.current_station;
                        });
                    })
                }
            } else if (index === this.state.Stations.length) {
                const obj = {

                    createDate: e.createDate,
                    color: e.color,
                    current_status: 'Done',
                    current_station: this.Stations[this.Stations.length].stationName,
                    orderId: e.orderId,
                    style: e.style,
                    size: e.size
                }
                //var newStateArray = this.state.Orders.slice();
                //newStateArray.push(obj);
                //this.setState({Orders: newStateArray});

                this.state.Orders.push(obj);
            }
        })

    }

    displayData() {

        let data1 = [];
        this.state.Orders.map(o => {
            if (o.current_station == this.state.selected_station) {
                data1.push(o);
            }
        })
        return data1;
    }

    render() {
        const columns = [
            {
                Header: "Ordre Id",
                accessor: "orderId",
                getProps: (state, rowInfo, column) => {
                    return {
                        style: {
                            background: rowInfo && rowInfo.row.current_status === 'Pending' ? '#ff928b' : rowInfo && rowInfo.row.current_status === 'In Progress' ? '#ffe94e' :
                                rowInfo && rowInfo.row.current_status === 'Done' ? '#5dd39e' : null

                        },
                    };
                },
                style: {
                    textAlign: "center",
                    color: "black",

                },
                width: 200, minwidth: 200, maxwidth: 200
            },
            {
                Header: "Created Date",
                accessor: "createDate",
                getProps: (state, rowInfo, column) => {
                    return {
                        style: {
                            background: rowInfo && rowInfo.row.current_status === 'Pending' ? '#ff928b' : rowInfo && rowInfo.row.current_status === 'In Progress' ? '#ffe94e' :
                                rowInfo && rowInfo.row.current_status === 'Done' ? '#5dd39e' : null

                        },
                    };
                },
                style: {
                    textAlign: "center",

                },
                width: 150, minwidth: 200, maxwidth: 200
            },
            {
                Header: "Color",
                accessor: "color",
                getProps: (state, rowInfo, column) => {
                    return {
                        style: {
                            background: rowInfo && rowInfo.row.current_status === 'Pending' ? '#ff928b' : rowInfo && rowInfo.row.current_status === 'In Progress' ? '#ffe94e' :
                                rowInfo && rowInfo.row.current_status === 'Done' ? '#5dd39e' : null

                        },
                    };
                },
                style: {
                    textAlign: "center",

                },
                width: 120, minwidth: 200, maxwidth: 200
            },
            {
                Header: "Style",
                accessor: "style",
                getProps: (state, rowInfo, column) => {
                    return {
                        style: {
                            background: rowInfo && rowInfo.row.current_status === 'Pending' ? '#ff928b' : rowInfo && rowInfo.row.current_status === 'In Progress' ? '#ffe94e' :
                                rowInfo && rowInfo.row.current_status === 'Done' ? '#5dd39e' : null

                        },
                    };
                },
                style: {
                    textAlign: "center",

                },
                width: 120, minwidth: 200, maxwidth: 200
            },
            {
                Header: "Size",
                accessor: "size",
                filterable: true,
                getProps: (state, rowInfo, column) => {
                    return {
                        style: {
                            background: rowInfo && rowInfo.row.current_status === 'Pending' ? '#ff928b' : rowInfo && rowInfo.row.current_status === 'In Progress' ? '#ffe94e' :
                                rowInfo && rowInfo.row.current_status === 'Done' ? '#5dd39e' : null

                        },
                    };
                },
                style: {
                    textAlign: "center",

                },
                width: 100, minwidth: 200, maxwidth: 200
            },
            {
                Header: "Status",
                getProps: (state, rowInfo, column) => {
                    return {
                        style: {
                            background: rowInfo && rowInfo.row.current_status === 'Pending' ? '#ff928b' : rowInfo && rowInfo.row.current_status === 'In Progress' ? '#ffe94e' :
                                rowInfo && rowInfo.row.current_status === 'Done' ? '#5dd39e' : null

                        },
                    };
                },
                accessor: "current_status",
                style: {
                    textAlign: "center",

                },
                width: 100, minwidth: 200, maxwidth: 200
            },
            {
                Header: "Actions",
                getProps: (state, rowInfo, column) => {
                    return {
                        style: {
                            background: rowInfo && rowInfo.row.current_status === 'Pending' ? '#ff928b' : rowInfo && rowInfo.row.current_status === 'In Progress' ? '#ffe94e' :
                                rowInfo && rowInfo.row.current_status === 'Done' ? '#5dd39e' : null

                        },
                    };
                }, style: {
                    textAlign: "center",

                },
                Cell: props => {
                    return (
                        <div>
                            {(() => {
                                if (props.original.current_status === "Pending") {
                                    return (
                                        <Button size="small"
                                                onClick={() => this.status_update_inprogress(props.original.orderId)}
                                                variant="contained"

                                        >To Progess</Button>
                                    )
                                } else if (props.original.current_status === "In Progress") {
                                    return (<Button size="small"
                                                    onClick={() => this.status_update_done(props.original.orderId, props.original.current_station)}
                                                    variant="contained"
                                    >Complete</Button>)
                                }
                            })()}


                        </div>
                    )
                }, width: 200, minwidth: 200, maxwidth: 200,
                filterable: false
            }
        ]


        return (
            <div align="center">
                <Typography component="h1" variant="h4" align="center" style={{marginTop: 30, marginBottom: 30}}>
                    List of Station Orders
                </Typography>
                <div className="card" style={{width: "90%", marginTop: 30, marginBottom: 30}}>
                    <div className="card-body" align="center">
                        <div style={{marginTop: 10}}>
                            <Col sm={6}>
                                <Form>
                                    <Form.Control as="select" style={{marginLeft: '30px', marginRight: '30px'}}
                                                  onChange={this.handleStation}>
                                        <option>Select Station to View Orders</option>
                                        {this.state.Stations.map(name => (
                                            <option
                                                key={name}
                                                value={name.stationName}
                                            >
                                                {name.stationName}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form>
                                <h3 align="center"
                                    style={{marginBottom: 20, marginTop: 20}}>{this.state.selected_station}</h3>
                            </Col>

                            <ReactTable
                                columns={columns}
                                data={this.displayData()}
                                filterable
                                sorted={[
                                    {
                                        id: 'current_station',
                                        asc: true
                                    }
                                ]}
                                defaultFilterMethod={this.filterCaseInsensitive}
                                defaultPageSize={5}
                                style={{marginBottom: 20}}
                                className="-striped -highlight"
                                noDataText={"Please Wait......"}>
                            </ReactTable>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        const content = row[id];
        if (typeof content !== 'undefined') {
            // filter by text in the table or if it's a object, filter by key
            if (typeof content === 'object' && content !== null && content.key) {
                return String(content.key).toLowerCase().includes(filter.value.toLowerCase());
            } else {
                return String(content).toLowerCase().includes(filter.value.toLowerCase());
            }
        }

        return true;
    };
}
