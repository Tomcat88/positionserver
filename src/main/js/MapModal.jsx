import React from 'react'
import MapComponent from './MapComponent.jsx'
import { Button, Modal, ControlLabel, FormControl } from 'react-bootstrap'
import _ from 'underscore'

class MapModal extends React.Component {

  close() {
    this.props.close();
  }

  render() {
    if (this.props.positions) {
      const coords = _.map(this.props.positions, (p) => p.coords)
      return(
        <Modal show={this.props.show} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
                <Modal.Title>Tutte le posizione</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MapComponent readOnly={true} coords={coords}/>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="danger" onClick={this.close.bind(this)}>Chiudi</Button>
            </Modal.Footer>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

export default MapModal;
