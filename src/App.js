import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Hero from './components/Hero';
import Countries from './components/Countries';
import Results from './components/Results';
import GHLogo from './images/GitHub-Mark-64px.png';
import './App.css';

const productionURL = 'https://climate-change-back-hpiirainen.herokuapp.com/graphql';
const localURL = 'http://localhost:4000/graphql';
const backendURL = process.env.NODE_ENV === 'production' ? productionURL : localURL;

const client = new ApolloClient({
  uri: backendURL
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
          <footer className="bg-light py-4">
            <div className="container">
              <p>
                &copy; Hermanni Piirainen
                <span className="ml-3">
                  <a href="https://github.com/HPiirainen">
                    <img src={GHLogo} width="32" height="32" alt="GitHub" />
                  </a>
                </span>
              </p>
            </div>
          </footer>
        </div>
      </ApolloProvider>
    );
  }

}

export default App;
