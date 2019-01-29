# Climate Change

A simple app for comparing key data and changes between selected countries over time.

The app can be viewed in [Heroku](https://climate-change-hpiirainen.herokuapp.com/).

See also the repo for the [back-end side](https://github.com/HPiirainen/climate-change-backend).

## Background

The app is based on the [Reaktor summer job challenge](https://www.reaktor.com/ennakkotehtava-ohjelmistokehittaja/).
Data is fetched from [The World Bank API](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-this-api-documentation).

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

### Prerequisites

* Node.js
* `npm` or `yarn`

### Install

Clone the repo

```
git clone https://github.com/HPiirainen/climate-change.git
cd climate-change
```

Install dependencies

```
yarn install
# or
npm install
```

Start development server

```
yarn start
# or
npm start
```

In order to use the app, you must also **install the [backend repo](https://github.com/HPiirainen/climate-change-backend)** and run it.

### Deployment

Production build can be created by running

```
yarn run build
# or
npm run build
```

The project includes an Express server `server.js` that is used f. ex. in Heroku according to `Procfile`.
