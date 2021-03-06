import { tripsUrl, positionsUrl, loginUrl } from './index.js'
import React from 'react'
import fetch from 'node-fetch'
import { ListGroup, ListGroupItem, Col, Button, Modal, ControlLabel, FormControl, Panel, Glyphicon } from 'react-bootstrap'
import PositionList from './PositionList.jsx'
import AddPositionModal from './AddPositionModal.jsx'
import MapModal from './MapModal.jsx'
import TripList from './TripList.jsx'
import TripPositions from './TripPositions.jsx'
import AddTripForm from './AddTripForm.jsx'
import LoginControl from './LoginControl.jsx'
import _ from 'underscore'
import jsBase64 from 'js-base64'
import * as Cookies from 'js-cookie'

class App extends React.Component {
    constructor(props) {
        super(props);
        var maybeToken = Cookies.get('token');
        this.state = {
            trips: [],
            selectedTrip: null,
            showModal: false,
            positions: [],
            mapPosition: {},
            add: true,
            token: maybeToken || null
        };
        if (this.state.token) {
            this.loadTrips();
        }
    }

    componentDidMount() {
        
    }

    loadTrips() {
        fetch(tripsUrl, {headers : this.getTokenHeader()})
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
        fetch(positionsUrl, { method: 'PUT', body: JSON.stringify(position), headers: this.getTokenHeader() })
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
        fetch(positionsUrl + '?id=' + position._id, { method: 'DELETE', headers: this.getTokenHeader() })
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
        fetch(positionsUrl + '?trip=' + trip.name, {headers : this.getTokenHeader()})
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
        fetch(tripsUrl, { method: 'PUT', body: JSON.stringify(trip), headers: this.getTokenHeader() })
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
        if (trip) {
            fetch(tripsUrl + '?name=' + trip.name, { method: "DELETE", headers: this.getTokenHeader() })
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

    login(user,password) {
        fetch(loginUrl, {method: 'POST', body: JSON.stringify({user: user, password: password})})
            .then(res => res.json())
            .then(json => {
                Cookies.set('token', json.token);
                this.setState({
                    token: json.token
                });
                this.loadTrips();
            })
    }

    logout() {
        Cookies.remove('token');
        this.setState({
            token: null
        });
    }

    getTokenHeader() {
        if (this.state.token) {
            return {
                "Authorization": jsBase64.Base64.encode("Password:" + this.state.token)
            }
        } else {
            return {};
        }
    }

    render() {
        if (this.state.token) {
            return (
                <Col md={12}>
                    <Col md={4}>
                        <Panel>
                            <Button bsStyle="primary" bsSize="small" onClick={this.onAddTripClick.bind(this)}><Glyphicon glyph="plus" /> Aggiungi viaggio</Button>
                            <Button className="pull-right" bsStyle="warning" bsSize="small" onClick={this.logout.bind(this)}><Glyphicon glyph="log-out" /> Logout</Button>
                        </Panel>
                        <AddTripForm
                            show={this.state.addTrip}
                            saveTrip={this.saveTrip.bind(this)}
                            close={this.closeAddTrip.bind(this)} />
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
        } else {
            return (
                <LoginControl login={this.login.bind(this)} />
            )
        }
    }
}

export default App;
