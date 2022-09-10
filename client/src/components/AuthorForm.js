import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useMutation } from "@apollo/client";
import { useState } from "react";
import { getAuthors } from "../graphql-client/queries";
import { addSingleAuthor } from "../graphql-client/mutation";

const AuthorForm = () => {
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    age: "",
  });

  const { name, age } = newAuthor;

  const onInputChange = (event) => {
    setNewAuthor({
      ...newAuthor,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    addAuthor({
      variables: { name, age: parseInt(age) },
      refetchQueries: [{ query: getAuthors }],
    });

    setNewAuthor({ name: "", age: "" });
  };

  const [addAuthor, dataMutation] = useMutation(addSingleAuthor);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="invisible mb-3">
        <Form.Control />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Author name"
          name="name"
          onChange={onInputChange}
          value={name}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="number"
          placeholder="Author age"
          name="age"
          onChange={onInputChange}
          value={age}
          required
        />
      </Form.Group>
      <Button style={{ float: "right" }} variant="success" type="submit">
        Add Author
      </Button>
    </Form>
  );
};

export default AuthorForm;
