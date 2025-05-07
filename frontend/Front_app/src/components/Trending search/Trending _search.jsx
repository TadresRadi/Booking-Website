import "react-datepicker/dist/react-datepicker.css";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from "./tend.module.css";


export function Trendinrserch() {
  return (<>

<div className={styles["trending_section"]}>
        <p className={styles["para2"]}>Trending search</p>
        <div className={styles["trending_card"]}>
        <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
              <Col key={idx}>
                <Card>
                  <Card.Img variant="top" src="holder.js/100px160" />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                      lead-in to additional content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      </>
  
  );
}

