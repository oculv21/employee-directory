/**
 * Creates search form and appends it to the search container div
 */
const $searchForm = $('<form/>', {'action': '#', 'method': 'GET'});
const $searchInput = $('<input/>', {'type': 'search', 'id': 'search-input', 'class': 'search-input', 'placeholder': 'Search...'});
const $searchSubmit = $('<input/>', {'type': 'submit', 'value': 'Search', 'id': 'search-submit', 'class': 'search-submit'});

$searchForm.append($searchInput);
$searchForm.append($searchSubmit);
$('.search-container').append($searchForm);

/**
* Creates a card with a profile picture and info for each employee
*/
const $employeeCard =  data => {
  const $employees = data.results;

  for (let i = 0; i < $employees.length; i++) {
    const employee = $employees[i];
    console.log(employee);

    const $card = $('<div/>', {'class': 'card'});
    $('#gallery').append($card);

    const $imgContainer = $('<div/>', {'class': 'card-img-container'});
    $card.append($imgContainer);
    const $img = $('<img/>', {'class': 'card-img', 'src': `${employee.picture.large}`, 'alt': 'profile picture'});
    $imgContainer.append($img);

    const $infoContainer = $('<div/>', {'class': 'card-info-container'});
    $card.append($infoContainer);
    const $name = $('<h3/>', {'id': 'name', 'class': 'card-name cap'});
    $name.text(`${employee.name.first} ${employee.name.last}`);
    $infoContainer.append($name);
    const $email = $('<p/>', {'class': 'card-text'});
    $email.text(`${employee.email}`);
    $infoContainer.append($email);
    const $location = $('<p/>', {'class': 'card-text cap'});
    $location.text(`${employee.location.city}, ${employee.location.state}`)
    $infoContainer.append($location);
  }
}

/**
 * API request to generate random employees
 */
$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function (data) {
      $employeeCard(data)
    }
  });

