import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation, useQuery } from "@apollo/client";
import { getAuthors, getBooks } from "../graphql-client/queries";
import { useState } from "react";
import { addSingleBook } from "../graphql-client/mutation";

const BookForm = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const { name, genre, authorId } = newBook;

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooks }],
    });

    setNewBook({
      name: "",
      genre: "",
      authorId: "",
    });
  };

  const { loading, error, data } = useQuery(getAuthors);

  const [addBook, dataMutation] = useMutation(addSingleBook);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Book name"
          name="name"
          onChange={handleInputChange}
          value={name}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Book genre"
          name="genre"
          value={genre}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        {loading ? (
          <p>Loading authors...</p>
        ) : (
          <Form.Control
            as="select"
            name="authorId"
            onChange={handleInputChange}
            value={authorId}
          >
            <option value="" disabled>
              Select author
            </option>
            {data.authors?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Control>
        )}
      </Form.Group>
      <Button style={{ float: "right" }} variant="success" type="submit">
        Add Book
      </Button>
    </Form>
  );
};

export default BookForm;
