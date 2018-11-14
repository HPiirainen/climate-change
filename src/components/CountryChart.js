import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from 'recharts';

class CountryChart extends Component {

  render() {
    const { chartData } = this.props;

    return (
      <ResponsiveContainer width="100%" height={ 400 }>
        <LineChart data={ chartData }>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line name="Emissions per person (tonnes)" type="monotone" dataKey="emissionsPerPerson" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    )
  }

}

CountryChart.propTypes = {
  chartData: PropTypes.array,
};

export default CountryChart;
