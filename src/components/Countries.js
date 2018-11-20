import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import CountrySelector from './CountrySelector';

class Countries extends Component {
  render() {
    const { selectedCountries, onCountriesChanged } = this.props;
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <CountrySelector selectedCountries={ selectedCountries } onCountriesChanged={ onCountriesChanged } />
          </Col>
        </Row>
      </Container>
    )
  }
}

Countries.propTypes = {
  selectedCountries: PropTypes.array,
  onCountriesChanged: PropTypes.func,
};

export default Countries;
