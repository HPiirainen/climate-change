import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Container } from 'reactstrap';
import Presets from './Presets';

class Hero extends Component {
  render() {
    const { changeCountries } = this.props;
    return (
      <Jumbotron fluid>
        <Container>
          <h1 className="display-1">Climate change, eh?</h1>
          <p className="lead">{ "Here's the description" }</p>
          <Presets changeCountries={ changeCountries } />
        </Container>
      </Jumbotron>
    )
  }
}

Hero.propTypes = {
  changeCountries: PropTypes.func,
}

export default Hero;
