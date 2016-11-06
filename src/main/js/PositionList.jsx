import React from 'react'
import Position from './Position.jsx'
import { Table } from 'react-bootstrap'

class PositionList extends React.Component {

    render() {
        const positions = this.props.positions.map(p =>
            <Position
                key={p._id}
                position={p}
                showMap={this.props.showMap}
                deletePosition={this.props.deletePosition}
                />
        );
        if (positions.length == 0) {
            return (
                <h2>Nessuna posizione trovata!</h2>
            );
        }

        return (
            <Table bordered striped hover>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Descrizione</th>
                        <th>Coordinate</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {positions}
                </tbody>
            </Table>
        );
    }
}

export default PositionList;
