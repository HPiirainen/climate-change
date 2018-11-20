import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import CountryChartContainer from './CountryChartContainer';

class Results extends Component {

  render() {
    const { selectedCountries } = this.props;

    if (selectedCountries.length === 0) {
      return null;
    }

    return (
      <Query
        query={ gql`
          query Countries($iso2Codes: [String]!) {
            countries(iso2Codes: $iso2Codes) {
              country: name
              years {
                year: date
                population
                emission
                emissionPerPerson
              }
            }
          }
        `}
        variables={{ 'iso2Codes': selectedCountries.map((country) => country.value) }}
      >
      {({ loading, error, data }) => {

        if (loading) {
          return <span className="h1">Loading...</span>;
        }

        if (error) {
          console.log(error);
          return <p>Error</p>;
        }

        const validCountryObjects = data.countries.filter((countryObject) => {
          return countryObject.years.some(year => year.emissionPerPerson > 0);
        });

        const invalidCountryObjects = data.countries.filter((countryObject) => {
          return !validCountryObjects.includes(countryObject);
        });

        let chartContainer = null;
        let noResultsContainer = null;

        if (invalidCountryObjects.length > 0) {
          const invalidCountries = invalidCountryObjects.map(({ country }) => (
            <li key={ country }>{ country }</li>
          ));
          noResultsContainer = (
            <Fragment>
              <h4>Not enough information for:</h4>
              <ul className="list-unstyled">
                { invalidCountries }
              </ul>
            </Fragment>
          )
        }

        if (validCountryObjects.length > 0) {
          chartContainer = <CountryChartContainer
                            chartData={ validCountryObjects }
                           />
        }

        return (
          <Container>
            <Row>
              <Col>
                { chartContainer }
                { noResultsContainer }
              </Col>
            </Row>
          </Container>
        );
      }}
      </Query>
    )
  }
}

Results.propTypes = {
  currentCountry: PropTypes.string,
  selectedCountries: PropTypes.array,
};

export default Results;
