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
          <p className="lead">
            A simple app for comparing key data and
            changes between selected countries over time.
          </p>
          <p>
            The app is based on the <a href="https://www.reaktor.com/ennakkotehtava-ohjelmistokehittaja/">summer job challenge by Reaktor</a>.
            Data fetched from <a href="https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-this-api-documentation">The World Bank API</a>.
          </p>
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
