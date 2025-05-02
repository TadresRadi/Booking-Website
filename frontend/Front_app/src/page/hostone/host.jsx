import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './hostone.css';

export function Add_property() {
  return (
    <div className="property-wrapper">
      <Card className="property-card">
        <Card.Body>
          <Card.Title>Step 1</Card.Title>
          <Card.Text>
            <h1>Hotel Details</h1>
            <p>The basics — Add your hotel name, address, facilities, and more.</p>
          </Card.Text>
          <a href="#">Add</a>
        </Card.Body>
      </Card>

      <Card className="property-card">
        <Card.Body>
          <Card.Title>Step 2</Card.Title>
          <Card.Text>
            <h1>Rooms</h1>
            <p>Add rooms, layouts, bed options, and rates.</p>
          </Card.Text>
          <a href="#">Add Room</a>
        </Card.Body>
      </Card>

      <Card className="property-card">
        <Card.Body>
          <Card.Title>Step 3</Card.Title>
          <Card.Text>
            <h3>Photos</h3>
            <p>Share photos of your hotel so guests know what to expect.</p>
          </Card.Text>
          <a href="#">Add Photos</a>
        </Card.Body>
      </Card>

      <Card className="property-card">
        <Card.Body>
          <Card.Title>Step 4</Card.Title>
          <Card.Text>
            <h3>Final Step</h3>
            <p>Set up payment and invoicing before opening for bookings.</p>
          </Card.Text>
          <a href="#">Add Final Details</a>
        </Card.Body>
      </Card>
    </div>
  );
}
