import React from 'react'
import { Panel, Button, Glyphicon } from 'react-bootstrap'
import PositionList from './PositionList.jsx'

class TripPositions extends React.Component {

    deleteTrip() {
        if(window.confirm('Vuoi davvero eliminare questo viaggio?')) {
            this.props.onDeleteTripClick();
        }
    }

    render() {
        if (!this.props.trip) {
            return null;
        } else {
            return (
                <div>
                    <Panel>
                        <Button bsStyle="primary" bsSize="small" onClick={this.props.onAddClick.bind(this)}><Glyphicon glyph="plus" /> Aggiungi</Button>
                        <Button bsStyle="primary" bsSize="small" onClick={this.props.onShowAllClick.bind(this)} style={{ marginLeft: '10px' }} ><Glyphicon glyph="map-marker" /> Mostra tutti</Button>
                        <Button className="pull-right" bsStyle="danger" bsSize="small" onClick={this.deleteTrip.bind(this)} ><Glyphicon glyph="trash" /> Elimina viaggio</Button>
                    </Panel>
                    <PositionList
                        positions={this.props.positions}
                        showMap={this.props.showMapModal.bind(this)}
                        deletePosition={this.props.deletePosition.bind(this)}
                        />
                </div>
            );
        }
    }
}

export default TripPositions;