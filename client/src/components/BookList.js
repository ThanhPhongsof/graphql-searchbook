import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookDetails from "./BookDetails";
import { useQuery } from "@apollo/client";
import { getBooks } from "../graphql-client/queries";
import { useState } from "react";

const BookList = () => {
  const [bookSelected, setBookSelected] = useState(null);

  const { loading, error, data } = useQuery(getBooks);

  if (loading) return <p>Loading books....</p>;
  if (error) return <p>Error loading book!</p>;

  const { books } = data;
  return (
    <Row>
      <Col
        xs={6}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
        }}
      >
        {books?.map((item) => (
          <Card
            key={item.id}
            border="info"
            text="info"
            className="text-center shadow"
            style={{ padding: "10px 20px" }}
            onClick={setBookSelected.bind(this, item.id)}
          >
            <Card.Body>{item.name}</Card.Body>
          </Card>
        ))}
      </Col>
      <Col>
        <BookDetails bookId={bookSelected} />
      </Col>
    </Row>
  );
};

export default BookList;
