import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Form, FormGroup } from 'reactstrap';

class CountrySelector extends Component {

  render() {
    const { selectedCountries, onCountriesChanged } = this.props;
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

        const countryOptions = data.allCountries.map(({ name, iso2Code }) => {
          return { value: iso2Code, label: name };
        });

        return (
          <Form>
            <FormGroup>
              <span id="country-selector" className="sr-only">Select countries</span>
              <Select
                options={ countryOptions }
                isMulti={ true }
                placeholder="Select countries..."
                onChange={ onCountriesChanged }
                value={ selectedCountries }
                aria-labelledby="country-selector"
              />
            </FormGroup>
          </Form>
        );
      }}
      </Query>
    )
  }
}

CountrySelector.propTypes = {
  selectedCountries: PropTypes.array,
  onCountriesChanged: PropTypes.func,
};

export default CountrySelector;
