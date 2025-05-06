import Axios from 'axios';
import DatePicker from "react-datepicker";
import     "react-datepicker/dist/react-datepicker.css";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from "./home.module.css";
import { SearchInput } from "../../components/search_input/searchInput";
export function Homepage() {
  

  return (
    <div className={styles["main_container"]}>

       <SearchInput></SearchInput>


      {/* Recent Searches Section */}
      <div className={styles["recent_searches_section"]}>
        <p className={styles["para"]}>Your recent searches</p>
        <div className={styles["card_home"]}>
          <Row xs={1} md={2} className="g-4">
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

      {/* Trending Section */}
      <div className={styles["trending_section"]}>
        <p className={styles["para2"]}>Trending search</p>
        <div className={styles["trending_card"]}>
          <Row xs={1} md={2} className="g-4">
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

      {/* Top Destination Section */}
      <div className={styles["top_destination_section"]}>
        <p className={styles["para3"]}>Top destination in Egypt</p>
        <div className={styles["topdistination_card"]}>
          <Row xs={1} md={2} className="g-4">
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
    </div>
  );
}
