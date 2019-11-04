'use strict';

// put your own value below!
const apiKey = '3qb7J4FBiTfp89AeSgp1jhI08CQOYSD8SDUzvkA6'; 
const searchURL = 'https://api.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${(key)}=${(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.length; i++){
    // for each object in the items 
    //array, add a list item to the results 
    //list with the full name, description,
    //and url
    $('#results-list').append(
      `<li><h3>${responseJson[i].fullName}</h3>
      <p>${responseJson[i].description}</p>
      <a href='${responseJson[i].url}' target='_blank'>link here</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getStateParks(query, limit=50, integer) {
  const params = {
    key: apiKey,
    stateCode: query,
    limit
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson.data))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getStateParks(searchTerm, maxResults);
  });
}

$(watchForm);
