import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import countryPresets from '../utils/countryPresets';

class Presets extends Component {
  render() {
    const { changeCountries } = this.props;
    const buttons = countryPresets.map(({ id, title, values }) => (
        <Button
          key={ title }
          size="sm"
          className="m-2"
          color="secondary"
          onClick={ () => changeCountries(values) }
        >
          { title }
        </Button>
    ));
    return (
      <Fragment>
        <p className="lead">{ "If you're fresh out of ideas, try these presets!" }</p>
        <p>{ buttons }</p>
      </Fragment>
    )
  }
}

Presets.propTypes = {
  changeCountries: PropTypes.func,
};

export default Presets;
