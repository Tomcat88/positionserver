import React from 'react';
import { Panel, Button, ControlLabel, FormControl, Col } from 'react-bootstrap'

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
                <Panel>
                    <Col md={6}>
                        <FormControl
                            type="text"
                            onChange={this.handleNameChange.bind(this)}
                            placeholder="Nome"
                            />
                    </Col>
                    <Col md={6}>
                        <FormControl
                            type="text"
                            onChange={this.handleDescriptionChange.bind(this)}
                            placeholder="Descrizione"
                            />
                    </Col>
                    <Col md={12} style={{ marginTop: "10px" }}>
                        <Button
                            bsStyle="primary"
                            onClick={this.saveTrip.bind(this)}
                            style={{ marginRight: "10px" }}>
                            Salva
                        </Button>
                        <Button
                            onClick={this.close.bind(this)}
                            bsStyle="danger">
                            Chiudi
                            </Button>
                    </Col>
                </Panel>
            );
        }
    }
}

export default AddTripForm;