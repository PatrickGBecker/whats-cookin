var getData = (url) => {
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log('Looks like there was a problem!', error))
}

export default getData;
