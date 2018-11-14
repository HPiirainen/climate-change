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
    this.handleCountryChanged = this.handleCountryChanged.bind(this);
    this.state = {
      selectedCountry: '',
    };
  }

  handleCountryChanged(e) {
    this.setState({ selectedCountry: e.target.value });
  }

  render() {
    const currentCountry = this.state.selectedCountry;
    return (
      <ApolloProvider client={ client }>
        <div id="app" className="text-center">
          <Hero />
          <Countries onCountryChanged={ this.handleCountryChanged } currentCountry={ currentCountry } />
          <Results currentCountry={ currentCountry } />
        </div>
      </ApolloProvider>
    );
  }

}

export default App;
