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
import { Table } from 'reactstrap';
import Chroma from 'chroma-js';
import './CountryChart.css';

class CountryChart extends Component {

  constructor(props) {
    super(props);
    this.renderTooltip = this.renderTooltip.bind(this);
  }

  renderTooltip(e) {
    if (e.active) {
      const payload = e.payload;
      const { xAxisDataKey, lineDataKey, unit, tooltipFormatter } = this.props;
      const countryRows = payload.sort((a, b) => {
          const aValue = parseFloat(a.payload[lineDataKey]);
          const bValue = parseFloat(b.payload[lineDataKey]);
          if (aValue > bValue) {
            return -1;
          }
          if (aValue < bValue) {
            return 1;
          }
          return 0;
        })
        .map(({ name, stroke, payload }) => (
          <tr key={ name }>
            <td><strong style={{ color: stroke }}>{ name }</strong></td>
            <td className="text-right">{ tooltipFormatter !== undefined ? tooltipFormatter(payload[lineDataKey]) : payload[lineDataKey] } { unit }</td>
          </tr>
      ));
      return (
        <div className="custom-tooltip bg-white border border-primary px-2 pt-2">
          <h4>{ payload[0].payload[xAxisDataKey] }</h4>
          <Table borderless size="sm" className="text-left">
            <tbody>
              { countryRows }
            </tbody>
          </Table>
        </div>
      )
    }
    return null;
  }

  render() {
    const {
      chartData,
      chartHeight,
      xAxisDataKey,
      yAxisOrientation,
      yAxisTickFormatter,
      lineDataKey,
    } = this.props;

    const colors = Chroma.scale(['red', 'blue', 'green', 'black']).colors(chartData.length);
    const lines = chartData.map(({ country, years }, index) => (
      <Line
        key={ country }
        legendType="circle"
        data={ years }
        name={ country }
        type="monotone"
        dataKey={ lineDataKey }
        stroke={ colors[index] }
      />
    ));

    return (
      <ResponsiveContainer width="100%" height={ chartHeight }>
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            scale="time"
            type="number"
            domain={['dataMin', 'dataMax']}
            dataKey={ xAxisDataKey }
            allowDuplicatedCategory={ false }
          />
          <YAxis
            orientation={ yAxisOrientation }
            tickFormatter={ yAxisTickFormatter }
          />
          <Tooltip content={ this.renderTooltip } />
          <Legend />
          { lines }
        </LineChart>
      </ResponsiveContainer>
    )
  }

}

CountryChart.propTypes = {
  chartData: PropTypes.array,
  chartHeight: PropTypes.number,
  xAxisDataKey: PropTypes.string,
  yAxisOrientation: PropTypes.string,
  yAxisTickFormatter: PropTypes.func,
  lineDataKey: PropTypes.string,
  tooltipFormatter: PropTypes.func,
  unit: PropTypes.string,
};

export default CountryChart;
