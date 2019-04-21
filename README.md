# Population Management System (PMS)
This is a basic API built with express.js that allows a user to create locations, update locations, fetch locations and delete locations.

## Features
- Create a location
- Retrieve all locations
- Retrieve a single location by ID
- Update a location by ID
- Delete a location by ID

# Technologies Used
- [Express](https://expressjs.com/) Fast, un-opinionated, minimalist web framework for Node.js
- [MongoDB](https://www.mongodb.com) MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need
- [Mongoose](https://mongoosejs.com/) is an elegant mongodb object modeling for NodeJs
- [Babel](https://babeljs.io/) is a JavaScript compiler for converting codes written in ES6 or JSX to ES5 that is supported by many browsers

## Installation
- Clone this repository using the command:
 ```git clone https://github.com/chykehyman/PMS.git```
- Navigate to the directory:
  ```cd PMS```
- Add your ```.env``` file with accurate variables as clearly defined in the `.env.sample` file
- Install all dependencies with ```yarn install```
- Make sure to have mongodb installed and running if you intend testing locally
  ```mongod```
- Start the development server by running:
  ```yarn start:dev``` OR
- Start the production server by running:
  ```yarn start:prod```
- Open up `PostMan` to test `localhost:7778` with the following required input data:
    `name - name of the location`
    `males - number of male occupants`
    `females - number of female occupants`
    `province - a principal division for that location`

## Test
Test were written using Mocha and Chai.
- Run tests using command `yarn test`
- N.B make sure your mongodb test database is connected and running
  `mongod`

## API Endpoints

<table>
<tr><th>USE CASE</th><th>HTTP METHOD</th><th>ENDPOINT</th></tr>
<tr><td>Create a location</td> <td>POST</td>  <td>/api/v1/locations</td></tr>

<tr><td>Retrieve all locations</td> <td>GET</td>  <td>/api/v1/location</td></tr>

<tr><td>Retrieve a single location</td> <td>GET</td>  <td>/api/v1/location/:id</td></tr>

<tr><td>Update a location</td> <td>PUT</td>  <td>/api/v1/location/:id</td></tr>

<tr><td>Delete a location</td> <td>DELETE</td>  <td>/api/v1/location/:id</td></tr>

</table>

## License and Copyright
[MIT](LICENSE)

## Author
* **Chinwoke Hyginus** - Software Developer and lover of art.

## FAQ

### Is this an Open-Source Application?

```
Yes it is, and contributing to the development of this application is by raising PRs.
```

### Who can contribute?

```
Anyone! This application is open to all those who want to contribute to open-source 
development and are willing to follow set standards for contributing.
```

### What language was used to develop this application?

```
This project is a server-side(NodeJs) based application.
```

### Can I clone this application for personal use?

```
Yes! This application is licensed under MIT, and is open for whatever you may choose 
to use it for.
```
