import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './host.module.css';
import { useNavigate } from 'react-router-dom';



export function Add_property() {
    const navigate = useNavigate();
  return (
    <div className={styles.bodylike}>
    <div className={styles.propertyWrapper}>
      <Card className={styles.propertyCard}>
        <Card.Body>
          <Card.Title>Step 1</Card.Title>
          <Card.Text>
            <h1>Hotel Details</h1>
            <p>The basics — Add your hotel name, address, facilities, and more.</p>
          </Card.Text>
          
          <a href="#" onClick={() => navigate('/add-hotel')}>Add</a>

        </Card.Body>
      </Card>

      <Card className={styles.propertyCard}>
        <Card.Body>
          <Card.Title>Step 2</Card.Title>
          <Card.Text>
            <h1>Rooms</h1>
            <p>Add rooms, layouts, bed options, and rates.</p>
          </Card.Text>
          
          <a href="#" onClick={() => navigate('/add-room')}>Add</a>
        </Card.Body>
      </Card>

      <Card className={styles.propertyCard}>
        <Card.Body>
          <Card.Title>Step 3</Card.Title>
          <Card.Text>
            <h3>Photos</h3>
            <p>Share photos of your hotel so guests know what to expect.</p>
          </Card.Text>
          
          <a href="#" onClick={() => navigate('/add-images')}>Add</a>
        </Card.Body>
      </Card>

    </div>
    </div>
  );
}
