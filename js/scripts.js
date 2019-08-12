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
* Creates a card with a profile picture and info plus a modal window with additional info for each employee
*/
const employeeInfo =  data => {
  const employees = data.results;

  //loops through employees to create a card 
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    const employeeImg = employee.picture.large;
    const employeeName = `${employee.name.first} ${employee.name.last}`
    const employeeEmail = employee.email;
    console.log(employee);
    const $card = $('<div/>', {'class': 'card'});
    $('#gallery').append($card);

    //creates div for profile picture and appends to card div
    const $imgContainer = $('<div/>', {'class': 'card-img-container'});
    $card.append($imgContainer);
    const $img = $('<img/>', {'class': 'card-img', 'src': employeeImg, 'alt': 'profile picture'});
    $imgContainer.append($img);

    //creates div for employee info and appends it to card div
    const $infoContainer = $('<div/>', {'class': 'card-info-container'});
    $card.append($infoContainer);
    const $name = $('<h3/>', {'id': 'name', 'class': 'card-name cap'});
    $name.text(employeeName);
    $infoContainer.append($name);
    const $email = $('<p/>', {'class': 'card-text'});
    $email.text(employeeEmail);
    $infoContainer.append($email);
    const $location = $('<p/>', {'class': 'card-text cap'});
    $location.text(`${employee.location.city}, ${employee.location.state}`);
    $infoContainer.append($location);

    //creates modal window for each employee
    const $modalContainer = $('<div/>', {'class': 'modal-container'});
    $('#gallery').after($modalContainer);
    $modalContainer.hide();
    const $modal = $('<div/>', {'class': 'modal'});
    $modalContainer.append($modal);
    const $closeBtn = $('<button/>', {'type': 'button', 'id': 'modal-close-btn', 'class': 'modal-close-btn'});
    $closeBtn.html('<strong>X</strong>');
    $modal.append($closeBtn);
    const $modalInfo = $('<div/>', {'class': 'modal-info-container'});
    $modal.append($modalInfo);
    const $modalImg = $('<img/>', {'class': 'modal-img', 'src': employeeImg, 'alt': 'profile picture'})
    $modalInfo.append($modalImg);
    const $modalName = $('<h3/>', {'id': 'name', 'class': 'modal-name cap'})
    $modalName.text(employeeName);
    $modalInfo.append($modalName);
    const $modalEmail = $('<p/>', {'class': 'modal-text'});
    $modalEmail.text(employeeEmail)
    $modalInfo.append($modalEmail);
    const $modalCity = $('<p/>', {'class': 'modal-text cap'});
    $modalCity.text(`${employee.location.city}`)
    $modalInfo.append($modalCity);
    const $modalPhone = $('<p/>', {'class': 'modal-text'});
    $modalPhone.text(`${employee.phone}`)
    $modalInfo.append($modalPhone);
    const $modalAddress = $('<p/>', {'class': 'modal-text'});
    $modalAddress.text(`${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`)
    $modalInfo.append($modalAddress);
  } 
}

/**
 * API request to generate 12 random employees
 */
$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function (data) {
      employeeInfo(data)
    }
  });

