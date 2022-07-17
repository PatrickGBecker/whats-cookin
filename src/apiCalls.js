// Your fetch requests will live here!
// const finalDestination = 'https://what-s-cookin-starter-kit.herokuapp.com';

function loadUsers() {
  return fetch(`${finalDestination}/api/v1/users`)
  .then(response => response.json())
  .then(data => data)
  .catch(error => console.log(error));
};

function loadIngredients() {
  return fetch(`${finalDestination}/api/v1/ingredients`)
  .then(response => response.json())
  .then(data => data)
  .catch(error => console.log(error));
};

function loadRecipes() {
  return fetch(`${finalDestination}/api/v1/recipes`)
  .then(response => response.json())
  .then(data => data.recipes)
  .catch(error => console.log(error))
}

export { loadUsers, loadIngredients, loadRecipes };


console.log('I will be a fetch request!')

const select = document.getElementById('breeds');
const card = document.querySelector('.card');
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
  return fetch(url)
         .then(checkStatus)
         .then(res => res.json())
         .catch(error => console.log('Looks like there was a problem', error))
}

Promise.all([
  fetchData('https://dog.ceo/api/breeds/list')
  .then(data => generateOptions(data.message)),
  fetch('htpps://dog.ceo/api/breeds/image/random')
  .then(data => generateImage(data.message))
])
.then(data => {
  const breedList = data[0].message;
  const randomImage = data[1].message;

  generateOptions(breedList);
  generateImage(randomImage);
})

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response) {
  if(response.ok) {
    return Promise.resolve(respons);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function generateOptions(data) {
  const options = data.map(item => `<option value='${item}'>${item}</option>`).join();
select.innerHTML = options;
}

function generateImage(data) {
  const html =
        `<img src='${data} alt>
        <p>Click to view images of ${select.value}s</p>`;
  card.innerhtml = html;

function fetchBreedImage() {
    const breed = select.value;
    const img = card.querySelector('img');
    const p = card.querySelector('p');
fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(data => {
      img.src = data.message;
      img.alt = breed;
      p.textContent = 'Click to view more ${breed}s`
    })
}
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);
form.addEventListener('submit', postData);

// ------------------------------------------
//  POST DATA
// ------------------------------------------
function postData(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const comment = document.getElementById('comment').value;

  const config = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, comment })
   })

  fetch('https://jsonplaceholder.typicode.com/comments', config)
    .then(checkStatus)
    .then(res => res.json())
    .then(data => console.log(data))
}
