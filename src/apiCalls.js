// Your fetch requests will live here!
const finalDestination = `https://whats-cookin-api-data.herokuapp.com`;


const getData = Promise.all([
  fetch(`${finalDestination}/api/v1/users`)
    .then(response => response.json()),
  fetch(`${finalDestination}/api/v1/recipes`)
    .then(response => response.json()),
  fetch(`${finalDestination}/api/v1/ingredients`)
    .then(response => response.json())
])

export default getData;

console.log('I will be a fetch request!')
