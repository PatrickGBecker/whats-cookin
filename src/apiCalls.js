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


function loadUsers() {
  return fetch(`${finalDestination}/api/v1/users`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
}

function loadIngredients() {
  return fetch(`${finalDestination}/api/v1/ingredients`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
}

function loadRecipes() {
  return fetch(`${finalDestination}/api/v1/recipes`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}

export default getData;
export { loadUsers, loadIngredients, loadRecipes }
console.log('I will be a fetch request!')
