import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

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
                date
                value
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

        let populations = [];
        if ('populations' in data.country && data.country.populations.length) {
          populations = data.country.populations.map(({date, value}) => (
            <ListGroupItem key={ date }>
              <strong>Year:</strong> { date } <strong>Population:</strong> { this.formatPopulation(value) }
            </ListGroupItem>
          ));
        }

        return (
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <h2>{ data.country.name }</h2>
                <p><strong>Capital city:</strong> { data.country.capitalCity }</p>
                <h3>Populations</h3>
                <ListGroup>
                  { populations }
                </ListGroup>
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
