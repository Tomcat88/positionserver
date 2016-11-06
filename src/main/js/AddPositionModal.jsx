import React from 'react'
import MapComponent from './MapComponent.jsx'
import { Button, Modal, ControlLabel, FormControl } from 'react-bootstrap'

class AddPositionModal extends React.Component {

  constructor(props) {
    super(props);
    console.log('add pos modal');
    console.log(props);
    
    this.state = {
      description: ""
    }
  }

  savePosition() {
    if (this.props.add) {
      console.log('saving position with desc = ' + this.state.description);
      this.props.savePosition(this.state);
    }
  }

  handleDescriptionChange(e) {
    if (this.props.add) {
      this.setState({
        description: e.target.value
      });
    }
  }

  close() {
    this.props.close();
  }

  handlePosisitonChange(coords) {
    if(this.props.add) {
      console.log('new pos');
      console.log(coords);
      this.setState({ coords: coords[0] });
    }
  }

  render() {
    if(!this.props.show) return null;
    console.log('modal render');
    const description = this.props.position ? this.props.position.description :  ""; 
    const coords = this.props.position ? [this.props.position.coords] : null;
    console.log(this.state);
    console.log(this.props);
    const title = this.props.add ? <Modal.Title>Aggiungi posizione</Modal.Title>
                                 : <Modal.Title>{description}</Modal.Title> 
    var saveButton;
    var descriptionTextBox;
    if (this.props.add) {
      saveButton = (<Button bsStyle="primary"
                            onClick={this.savePosition.bind(this)} >Salva</Button>)
      descriptionTextBox = (
              <div>
              <ControlLabel>Descrizione</ControlLabel>
              <FormControl
                type="text"
                onChange={this.handleDescriptionChange.bind(this)}
                disabled={!this.props.add}
              />
              </div>
              );
    }
    return(
      <Modal show={this.props.show}>
          <Modal.Header closeButton>
              {title}
          </Modal.Header>
          <Modal.Body>
              {descriptionTextBox}
              <MapComponent addingPos={this.props.add}
                            coords={coords} 
                            handlePositionChange={this.handlePosisitonChange.bind(this)} />
          </Modal.Body>
          <Modal.Footer>
              {saveButton}
              <Button onClick={this.close.bind(this)}
                      bsStyle="danger">
                        Chiudi
              </Button>
          </Modal.Footer>
      </Modal>
    );
  }

}

export default AddPositionModal;
