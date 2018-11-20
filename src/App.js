import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Hero from './components/Hero';
import Countries from './components/Countries';
import Results from './components/Results';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  constructor(props) {
    super(props);
    this.handleCountriesChanged = this.handleCountriesChanged.bind(this);
    this.state = {
      selectedCountries: [],
    };
  }

  handleCountriesChanged(value) {
    this.setState({ selectedCountries: value });
  }

  render() {
    const { selectedCountries } = this.state;

    return (
      <ApolloProvider client={ client }>
        <div id="app" className="text-center">
          <Hero changeCountries={ this.handleCountriesChanged } />
          <Countries
            selectedCountries={ selectedCountries }
            onCountriesChanged={ this.handleCountriesChanged }
          />
          <Results
            selectedCountries={ selectedCountries }
          />
        </div>
      </ApolloProvider>
    );
  }

}

export default App;
