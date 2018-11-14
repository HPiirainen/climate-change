import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import CountryChart from './CountryChart';

class Results extends Component {

  formatPopulation(population) {
    return population
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    if (this.props.currentCountry === '') {
      return '';
    }
    return (
      <Query
        query={ gql`
          query Country($iso2Code: String!){
            country(iso2Code: $iso2Code) {
              name
              iso2Code
              id
              capitalCity
              populations {
                year: date
                population: value
              }
              emissions {
                year: date
                emission: value
              }
            }
          }
        `}
        variables={{ 'iso2Code': this.props.currentCountry }}
      >
      {({ loading, error, data }) => {

        if (loading) {
          return <p>Loading...</p>;
        }

        if (error) {
          return <p>Error</p>;
        }

        const proportionalEmissions = data.country.populations.reduce((results, item) => {
          const emissionObject = data.country.emissions.find((emission) => emission.year === item.year);
          if (emissionObject !== undefined) {
            const perPerson = (emissionObject.emission * 1000) / item.population;
            if (!isNaN(perPerson)) {
              results.push({
                year: item.year,
                emissionsPerPerson: perPerson.toFixed(2),
              });
            }
          }
          return results;
        }, []);

        let chart;

        if (proportionalEmissions.length > 0) {
          chart = <CountryChart chartData={ proportionalEmissions } />
        } else {
          chart = <h4>Not enough information</h4>
        }

        return (
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <h2>{ data.country.name }</h2>
                <p><strong>Capital city:</strong> { data.country.capitalCity }</p>
                <h3>CO<sup>2</sup> emissions per person</h3>
                { chart }
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
};

export default Results;
