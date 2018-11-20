import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import CountryChart from './CountryChart';
import { fullPopulation, shortPopulation } from '../utils/populationFormatter';

class CountryChartContainer extends Component {

  render() {
    const { chartData } = this.props;

    const filteredData = chartData.map((country) => {
      const filteredYears = country.years.filter(year => year.emissionPerPerson > 0);
      return Object.assign({}, country, { years: filteredYears });
    });

    return (
      <Fragment>
        <Row>
          <Col>
            <div className="my-3">
              <h2>CO<sup>2</sup> emissions per person</h2>
              <CountryChart
                chartData={ filteredData }
                chartHeight={ 400 }
                xAxisDataKey="year"
                yAxisOrientation="left"
                lineDataKey="emissionPerPerson"
                unit="tonnes"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="my-3">
              <h2>Population</h2>
              <CountryChart
                chartData={ chartData }
                chartHeight={ 400 }
                xAxisDataKey="year"
                yAxisOrientation="left"
                yAxisTickFormatter={ shortPopulation }
                lineDataKey="population"
                tooltipFormatter={ fullPopulation }
                unit=""
              />
            </div>
          </Col>
        </Row>
      </Fragment>
    )
  }

}

CountryChartContainer.propTypes = {
  chartData: PropTypes.array,
};

export default CountryChartContainer;
