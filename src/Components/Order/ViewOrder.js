import React, {Component} from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import './vieworder.css'
import Typography from "@material-ui/core/Typography";
import * as firebase from 'firebase'

export default class ViewOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Orders: []
        }
    }

    componentDidMount() {
        firebase.database().ref().child('Order').orderByKey().on('value', snapshot => {
            let allOrders = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allOrders.push(snap.val());
            });
            this.setState({Orders: allOrders});
        })

    }


    render() {
        const columns = [
            {
                Header: "Ordre Id",
                accessor: "orderId",
                style: {
                    textAlign: "center",
                    color: "black"
                },
                width: 200, minwidth: 200, maxwidth: 200
            },
            {
                Header: "Created Date",
                accessor: "createDate",
                style: {
                    textAlign: "center"
                },
                width: 150, minwidth: 200, maxwidth: 200
            },
            {
                Header: "Color",
                accessor: "color",
                style: {
                    textAlign: "center"
                },
                width: 120, minwidth: 200, maxwidth: 200
            },
            {
                Header: "Style",
                accessor: "style",
                style: {
                    textAlign: "center"
                },
                width: 120, minwidth: 200, maxwidth: 200
            },
            {
                Header: "Size",
                accessor: "size",
                style: {
                    textAlign: "center"
                },
                width: 100, minwidth: 200, maxwidth: 200
            }
        ]

        return (
            <div>
                <Typography component="h1" variant="h4" align="center" style={{marginTop: 30, marginBottom: 30}}>
                    List of Orders
                </Typography>
                <div align="center">
                    <ReactTable
                        columns={columns}
                        data={this.state.Orders}
                        filterable
                        defaultFilterMethod={this.filterCaseInsensitive}
                        defaultPageSize={5}
                        className="-striped -highlight -order"
                        noDataText={"Please Wait......"}>
                    </ReactTable>
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

