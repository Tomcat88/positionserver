import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import _ from 'underscore'

class TripList extends React.Component {

    onClick(t) {
        this.props.onTripClick(t);
    }

    render() {
        const trips = _.map(this.props.trips, (t) => (<ListGroupItem key={t._id} 
                                                                     header={t.name}
                                                                     href="#"
                                                                     onClick={this.onClick.bind(this,t)}>
                                                            {t.description}
                                                      </ListGroupItem>))
        if (trips.length == 0) {
            return <h2>Nessun viaggio trovato!</h2>
        } else {
            return (
                <ListGroup>
                    {trips}
                </ListGroup>
                );
        }
    }
}

export default TripList;