This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A simple MOCK Javascript test runner, built with ReactJS

## Installation
- Run `npm install` in this folder
- Run `npm start`

## Test
This app was tested with testing-library/react
Run `npm test` to run all the test

## Deployment
This app was depolyed with heroku

## Tech
This problem was solved using `Promise.all` and promises.
`Promise.all` was chosen because it has no implied ordering in the execution of the array of Promises it contains.
This makes it a good fit to solve this problem aginst other native alternatives like `async await` which would force you to wait for each promise to resolve sequentially which is not the behaviour we want.
