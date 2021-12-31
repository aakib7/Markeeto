import React from 'react';

import productSer from '../../Serives/./ProductSer';
import { FormControl, Col, Container, InputGroup, Row, Button } from 'react-bootstrap';
const NewProduct = (props) => {

  const [model, setModel] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [rom, setRom] = React.useState(0);
  const [ram, setRam] = React.useState(0);
  const [company, setCompany] = React.useState("");
  const [color, setColor] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  return (<>


    <h1>Add Mobile</h1>
    <Container>
      <Row>
        <Col sm={4}>
          <>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">Model</InputGroup.Text>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={model}
                onChange={(e) => {
                  setModel(e.target.value)
                }}
              />
            </InputGroup>

            <br />
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">Price</InputGroup.Text>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={price}
                onChange={(e) => { setPrice(e.target.value) }}
              />

            </InputGroup>

            <br />
            <InputGroup className="sm-3">
              <InputGroup.Text id="inputGroup-sizing-default">company</InputGroup.Text>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={company}
                onChange={(e) => { setCompany(e.target.value) }}
              />
            </InputGroup>

            <br />

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">colour</InputGroup.Text>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={color}
                onChange={(e) => { setColor(e.target.value) }}
              />
            </InputGroup>
            <br />
                        <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">Rom</InputGroup.Text>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={rom}
                onChange={(e) => { setRom(e.target.value) }}
              />
            </InputGroup>
            <br />
                        <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">Ram</InputGroup.Text>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={ram}
                onChange={(e) => { setRam(e.target.value) }}
              />
            </InputGroup>
            <br />
                        <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">category</InputGroup.Text>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={category}
                onChange={(e) => { setCategory(e.target.value) }}
              />
            </InputGroup>
            <br />
                        <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">description</InputGroup.Text>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
              />
            </InputGroup>



          </>
        </Col >
      </Row>
    </Container>
    <Button variant="success" onClick={


      (e) => {

        productSer.addProduct({ model, price, company, color,ram,rom,description,category })
          .then((data) => {
            console.log(data);

          });
      }}
    >Add Mobile</Button>
  </>);
}

export default NewProduct;