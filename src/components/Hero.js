import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';

class Hero extends Component {
  render() {
    return (
      <Jumbotron fluid>
        <Container>
          <h1 className="display-1">Climate change, eh?</h1>
          <p className="lead">{ "Here's the description" }</p>
        </Container>
      </Jumbotron>
    )
  }
}

export default Hero;
