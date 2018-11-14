import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import CountrySelector from './CountrySelector';

class Countries extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <CountrySelector onCountryChanged={ this.props.onCountryChanged } currentCountry={ this.props.currentCountry } />
          </Col>
        </Row>
      </Container>
    )
  }
}

Countries.propTypes = {
  onCountryChanged: PropTypes.func,
  currentCountry: PropTypes.string,
};

export default Countries;
