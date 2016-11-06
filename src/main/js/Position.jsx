import React from 'react'
import { Button, Glyphicon } from 'react-bootstrap'

class Position extends React.Component {
    constructor(props) {
        super(props);
    }

    handleShowMapClick() {
        this.props.showMap(this.props.position);
    }

    handleDeletePosition() {
        if(window.confirm('Vuoi veramente eliminare la posizione?')) {
            this.props.deletePosition(this.props.position);
        }
    }

    render() {
        const pos = this.props.position;
        const ts = new Date(pos.ts);
        const lat = parseFloat(pos.coords.lat).toFixed(2);
        const lng = parseFloat(pos.coords.lng).toFixed(2);
        return (
            <tr>
                <td>{ts.toLocaleString()}</td>
                <td>{pos.description}</td>
                <td>{lat}, {lng}</td>
                <td style={{textAlign: "center"}}>
                    <Button bsStyle="primary" bsSize="xsmall" onClick={this.handleShowMapClick.bind(this)}><Glyphicon glyph="map-marker" /> Mappa</Button>
                    <Button bsStyle="danger" bsSize="xsmall" style={{marginLeft: "10px"}} onClick={this.handleDeletePosition.bind(this)}><Glyphicon glyph="trash" /> Elimina</Button>
                </td>
            </tr>
        );
    }
}

export default Position;
