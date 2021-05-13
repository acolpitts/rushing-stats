# Rushing Stats

Example web application based on Node and React to display football player's rushing stats.

## Installation and running this solution

### Requirements

1. MongoDB v4+
1. Node v12+

### Backend

Start by getting the backend server up and running. With a valid mongodb URI in hand:

1. change into the backend directory
1. make two copies of the .env.sample file: `.env` and `.env.test`
1. edit `.env`

```
MONGODBURI="mongodb://localhost/rushing-stats_dev"
```

1. edit `.env.test`

```
NODE_ENV="test"
MONGODBURI="mongodb://localhost/rushing-stats_test"
```

1. install dependencies `npm install`
1. ensure test suite passes `npm run test`

```
  routes : football
    GET /api/v1/football
      ✓ should return all rushing stats

  models : player
    when creating a new model
      ✓ should create a new player given valid props
      ✓ should throw an error given invalid props
    when reading models
      ✓ should find player with the name of Joe Banyard


  4 passing (233ms)
```

3. with the test suite passing, let's seed the development DB using the command `npm run db:seed`
1. now fire up the api server `npm run dev`
1. GET `http://localhost/api/v1/football` in a browser or REST client

You should now have the backend server up and running. Let's switch to the frontend

### Frontend

// TODO
