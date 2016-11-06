import React from 'react';
import { Button, ControlLabel, FormControl } from 'react-bootstrap'

class AddTripForm extends React.Component {

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    saveTrip() {
        this.props.saveTrip({
            name: this.state.name,
            description: this.state.description
        });
    }

    close() {
        this.props.close();
    }

    render() {
        if (!this.props.show) {
            return null;
        } else {
            return (
                <div>
                    <ControlLabel>Nome</ControlLabel>
                    <FormControl
                        type="text"
                        onChange={this.handleNameChange.bind(this)}
                        />
                    <ControlLabel>Descrizione</ControlLabel>
                    <FormControl
                        type="text"
                        onChange={this.handleDescriptionChange.bind(this)}
                        />
                    <Button bsStyle="primary" onClick={this.saveTrip.bind(this)} >Salva</Button>
                    <Button onClick={this.close.bind(this)} bsStyle="danger">Chiudi </Button>
                </div>
            );
        }
    }
}

export default AddTripForm;