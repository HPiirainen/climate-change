import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class CountrySelector extends Component {
  render() {
    return (
      <Query
        query={ gql`
          {
            allCountries {
              id
              name
              iso2Code
              capitalCity
            }
          }
        `}
      >
      {({ loading, error, data }) => {

        if (loading) {
          return <p>Loading...</p>;
        }

        if (error) {
          return <p>Error</p>;
        }

        const countries = data.allCountries.map(({ id, name, iso2Code, capitalCity }) => (
          <option key={ id } value={ iso2Code }>{ name }</option>
        ));

        return (
          <Form>
            <FormGroup>
              <Label for="country">Select country</Label>
              <Input type="select"
                value={ this.props.currentCountry }
                onChange={ this.props.onCountryChanged }
              >
                <option value="">----</option>
                { countries }
              </Input>
            </FormGroup>
          </Form>
        );
      }}
      </Query>
    )
  }
}

CountrySelector.propTypes = {
  onCountryChanged: PropTypes.func,
  currentCountry: PropTypes.string,
};

export default CountrySelector;
