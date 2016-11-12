import { tripsUrl, positionsUrl } from './index.js'
import React from 'react'
import fetch from 'node-fetch'
import { ListGroup, ListGroupItem, Col, Button, Modal, ControlLabel, FormControl, Panel, Glyphicon } from 'react-bootstrap'
import PositionList from './PositionList.jsx'
import AddPositionModal from './AddPositionModal.jsx'
import MapModal from './MapModal.jsx'
import TripList from './TripList.jsx'
import TripPositions from './TripPositions.jsx'
import AddTripForm from './AddTripForm.jsx'
import _ from 'underscore'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: [],
            selectedTrip: null,
            showModal: false,
            positions: [],
            mapPosition: {},
            add: true
        };
    }

    componentDidMount() {
        console.log(tripsUrl);
        fetch(tripsUrl)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    trips: json
                })
                console.log(json);
            });
    }

    savePosition(position) {
        console.log('saving position');
        console.log(position);
        position.trip = this.state.selectedTrip.name;
        fetch(positionsUrl, { method: 'PUT', body: JSON.stringify(position) })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                const positions = this.state.positions;
                positions.push(res);
                this.setState({ positions, showModal: false });
            });
    }

    deletePosition(position) {
        console.log('delete position');
        console.log(position);
        fetch(positionsUrl + '?id=' + position._id, { method: 'DELETE' })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                const positions = this.state.positions;
                this.setState({
                    positions: positions.filter(p => p._id !== position._id),
                });
            });
    }

    onAddClick() {
        this.setState({
            showModal: true,
            add: true,
            mapPosition: null
        })
    }

    onTripClick(trip) {
        fetch(positionsUrl + '?trip=' + trip.name)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({
                    positions: json,
                    selectedTrip: trip
                });
            });
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }

    showMapModal(position) {
        console.log("show map");
        console.log(position);
        this.setState({
            showModal: true,
            add: false,
            mapPosition: position
        });
    }

    onShowAllClick() {
        this.setState({
            showAll: true
        })
    }

    closeMapModal() {
        this.setState({
            showAll: false
        })
    }

    onAddTripClick() {
        this.setState({
            addTrip: true
        });
    }

    saveTrip(trip) {
        fetch(tripsUrl, {method: 'PUT', body: JSON.stringify(trip)})
            .then(res => res.json())
            .then(json => {
                const trips = this.state.trips;
                trips.push(json);
                this.setState({
                   trips,
                   addTrip: false 
                });
            });
    }

    closeAddTrip() {
        this.setState({
            addTrip: false
        });
    }

    onDeleteTripClick() {
        const trip = this.state.selectedTrip;
        if(trip) {
            fetch(tripsUrl + '?name=' + trip.name, {method: "DELETE"})
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    const trips = this.state.trips;
                    this.setState({
                        selectedTrip: null,
                        trips: _.filter(trips, t => t.name !== trip.name)
                    });
                });
        }
    }

    render() {
        return (
            <Col md={12}>
                <Col md={4}>
                    <Panel>
                        <Button bsStyle="primary" bsSize="small" onClick={this.onAddTripClick.bind(this)}><Glyphicon glyph="plus" /> Aggiungi viaggio</Button>
                    </Panel>
                    <AddTripForm 
                        show={this.state.addTrip} 
                        saveTrip={this.saveTrip.bind(this)} 
                        close={this.closeAddTrip.bind(this)}/>
                    <TripList
                        trips={this.state.trips}
                        onTripClick={this.onTripClick.bind(this)}
                        />
                </Col>
                <Col md={6}>
                    <TripPositions
                        trip={this.state.selectedTrip}
                        positions={this.state.positions}
                        showMapModal={this.showMapModal.bind(this)}
                        deletePosition={this.deletePosition.bind(this)}
                        onAddClick={this.onAddClick.bind(this)}
                        onShowAllClick={this.onShowAllClick.bind(this)}
                        onDeleteTripClick={this.onDeleteTripClick.bind(this)}
                        />
                    <AddPositionModal
                        position={this.state.mapPosition}
                        add={this.state.add}
                        show={this.state.showModal}
                        close={this.closeModal.bind(this)}
                        savePosition={this.savePosition.bind(this)}
                        />
                    <MapModal
                        show={this.state.showAll}
                        positions={this.state.positions}
                        close={this.closeMapModal.bind(this)}
                        readOnly={true}
                        />
                </Col>
            </Col>
        )
    }
}

export default App;
