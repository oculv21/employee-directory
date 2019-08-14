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
* Creates a card with a profile picture and info and appends it to the gallery
* @param {employee}
*/
const createCard = employee => {
  const employeeImg = employee.picture.large;
  const employeeName = `${employee.name.first} ${employee.name.last}`;
  const employeeEmail = employee.email;
  const $card = $('<div/>', {'class': 'card'});
  $card.html(`
    <div class="card-img-container">
      <img class="card-img" src=${employeeImg} alt="profile picture">
    </div>
    <div class="card-info-container">
      <h3 id="name" class="card-name cap">${employeeName}</h3>
      <p class="card-text">${employeeEmail}</p>
      <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
    </div>`);
    $('#gallery').append($card);
}

/**
 * Creates a modal window with additional information
 * @param {employee} 
 */
const createModal = (employee, i) => {
  const employeeCard = $('.card').eq(i);
  const employeeImg = employee.picture.large;
  const employeeName = `${employee.name.first} ${employee.name.last}`;
  const employeeEmail = employee.email;
  const $modalContainer = $('<div/>', {'class': 'modal-container'});
  $modalContainer.html(`
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
        <img class="modal-img" src=${employeeImg} alt="profile picture">
        <h3 id="name" class="modal-name cap">${employeeName}</h3>
        <p class="modal-text">${employeeEmail}</p>
        <p class="modal-text cap">${employee.location.city}</p>
        <hr>
        <p class="modal-text">${employee.phone}</p>
        <p class="modal-text">${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
      </div>
    </div>
  `)
  $('body').append($modalContainer)
  $modalContainer.hide();

  //click event listeners for opening and closing modal window
  employeeCard.click(function() {
    $modalContainer.show();
  });
  const closeBtn = $('.modal-close-btn');
  closeBtn.click(function() {
    $modalContainer.hide()
  });
}


const employeeInfo =  data => {
  const employees = data.results;

  //loops through employees to create a card and modal window
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    createCard(employee);
    createModal(employee, i); 
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

