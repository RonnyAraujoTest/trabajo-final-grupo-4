import {
  findUserSignIn,  createNewClient, findAvailableFlights, formatTime , 
  toggleWindowScrolling, generateFlight, currentClients, reservedFlights as allReservedFlights,
  cancelFlight, reserveFlight, addFooter
} from "./utilityFunctions.js";
import {flights} from './clients.js'
let currentUsers = []
let currentReservedFlights = [];
let currentFlights = [];
const signUpButton = document.querySelector("#signing-options > button:first-of-type");
const signInButton = document.querySelector("#signing-options > button:last-of-type");
const switchButton = document.querySelector("#switch-button");
const flightStatus = document.querySelector("#main-options-container > button:nth-of-type(1)");
// const checkInNavButton = document.querySelector("#main-options-container > button:nth-of-type(2)");
const checkInPopOver = document.querySelector("#check-in-popover");
const bookFlightPopOver = document.querySelector("#book-flight-popover");
const bookFlightForm = document.querySelector("#book-flight-popover form");
const bookFlightNavButton = document.querySelector("#main-options-container > button:nth-of-type(2)");
const signInPopOver = document.querySelector("#sign-in-popover");
const signUpPopOver = document.querySelector("#sign-up-popover");
const closePopOverButtons = document.querySelectorAll(".close-popover-button");
const userInfoWrapper = document.querySelector("#user-info-wrapper");
const signOutButton = document.querySelector("#sign-out-button");
const signInForm = document.querySelector("#log-in-form");
const signUpForm = document.querySelector("#sign-up-form");
const companyNameInput = document.querySelector("#company-name");
const companyNameLabel = document.querySelector("#company-name-label");
const noChoiceHasCompany = document.querySelector("#no-choice");
const bookTripButton = document.querySelector("#call-to-action button:first-of-type");
const joinUsButton = document.querySelector("#call-to-action button:last-of-type");
const yesChoiceHasCompany = document.querySelector("#yes-choice");
let companyTextBoxEnabled = false;
const forms = document.querySelectorAll("form");

const fromInput = document.querySelector("#from-destination-box");
const toInput = document.querySelector("#to-destination-box");
const flightsContainer = document.querySelector("#available-flights-container");
const errorMsgElements = document.querySelectorAll('.error-message') 
const reserveFlightButtons = document.querySelectorAll('.reserve-flight-button')
const allInputs = document.querySelectorAll('input')
const cancelFlightButton = document.querySelector('#cancel-flight-button')
const cancelFlightPopOver = document.querySelector('#cancel-flight-popover')
const cancelFlightPopOverSearchButton = document.querySelector('#cancel-flight-popover > search-flight-button')
const cancelFlightForm = document.querySelector('#cancel-flight-popover form')
const cancelableFlightsContainer = document.querySelector("#cancelable-flights-container")
cancelFlightButton.addEventListener('click', () => {
  toggleWindowScrolling(false);
  cancelFlightPopOver.showModal()  
  cancelableFlightsContainer.innerHTML = ""
})
cancelFlightPopOver.addEventListener('close', () => {
  toggleWindowScrolling(true);
})
cancelFlightForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const flightNumber = parseInt(new FormData(cancelFlightForm).get('cancel-flight-input'))
  const reservedFlightsNow = JSON.parse(localStorage.getItem('reservedFlights'))
  const currentUserId = parseInt(JSON.parse(localStorage.getItem('userDetails')).id)
  const matchingReservedFlights = reservedFlightsNow.filter(flight => flight.flightId === flightNumber && flight.clientId === currentUserId)
  const allFlightsNow = [...JSON.parse(localStorage.getItem('currentFlights'))]
  // generate flights to cancel individually 
  if(matchingReservedFlights.length > 0){
    
    cancelableFlightsContainer.innerHTML = ""
    matchingReservedFlights.forEach(flight => {
      const flightDetails = {
        date: flight.flightDate,
        landingDate: flight.landingDate,
        seatType: flight.seatType,
        cost: flight.baseCost,
        flightId: flight.flightId
      };
      generateFlight(flightDetails, cancelableFlightsContainer, true, "Cancelar Vuelo")
    })
    cancelableFlightsContainer.querySelectorAll(".reserve-flight-button").forEach((button) => {

      const reservedGreenColor = 'red'
      button.addEventListener("click", (e) => {
          const parentNode = e.target.parentNode;      
          e.target.textContent = "Vuelo Cancelado";
          e.target.setAttribute("disabled", "disabled")
          e.target.style.backgroundColor = reservedGreenColor;
          e.target.style.pointerEvents = 'none';
          e.target.style.cursor = 'default';        
          parentNode.style.color = reservedGreenColor;
          parentNode.style.outline = `2px solid ${reservedGreenColor}`;
          const newFlights =reservedFlightsNow.filter(flight => matchingReservedFlights[0].flightId !== flight.flightId)
          const flightIndex = allFlightsNow.findIndex(flight => flight.flightId === flightNumber)
          if(flightIndex !== -1){
            allFlightsNow[flightIndex].flightStatus = "available"
            localStorage.setItem('currentFlights', JSON.stringify(allFlightsNow))
          }
          localStorage.setItem('reservedFlights', JSON.stringify(newFlights))          
      })
    })
    return 
  }
  alert("Vuelo no encontrado.")
}
)
addFooter()
const signInChanged = new Event("sign-in-changed");
allInputs.forEach((input)=> input.addEventListener('focus', () => disableErrorMessages()))
window.addEventListener('sign-in-changed',()=>{
   joinUsButton.style.display = userLoggedIn? 'none': 'initial'
   signedInMenu.style.display = !userLoggedIn ? "none" : "flex";
   toggleSignInSignUpOptions(userLoggedIn);
})
reserveFlightButtons.forEach(button => button.addEventListener('click', (e) => {
  alert("button clicked")
}))

signUpButton.addEventListener("click", (e) =>
  showPopOverModal(e, signUpPopOver)
);
signInButton.addEventListener("click", (e) =>
  showPopOverModal(e, signInPopOver)
);
// checkInNavButton.addEventListener("click", (e) =>
//   showPopOverModal(e, checkInPopOver)
// );
bookFlightNavButton.addEventListener("click", (e) =>
  showPopOverModal(e, bookFlightPopOver)
);
signInForm.addEventListener("submit", validateSignIn);
signUpForm.addEventListener("submit", validateSignUp);
bookTripButton.addEventListener("click", () => bookFlightNavButton.click());
joinUsButton.addEventListener("click", () => signUpButton.click());
noChoiceHasCompany.addEventListener("click", () => {
  companyTextBoxEnabled = false;
  toggleCompanyTextBox(companyTextBoxEnabled);
});
yesChoiceHasCompany.addEventListener("click", () => {
  companyTextBoxEnabled = true;
  toggleCompanyTextBox(companyTextBoxEnabled);
});
let userLoggedIn = localStorage.getItem('isUserSignedIn') === 'true';
switchButton.addEventListener("click", () => {
  const fromValue = fromInput.value;
  fromInput.value = toInput.value;
  toInput.value = fromValue;
});
const signedInMenu = document.querySelector("#signed-in-menu");
window.addEventListener("load", () => {
  const loadedUsers  = localStorage.getItem('currentUsers') 
  const loadedReservedFlights = localStorage.getItem('reservedFlights');
  currentFlights = localStorage.getItem('currentFlights') === null? [...flights]: JSON.parse(localStorage.getItem('currentFlights'))
  localStorage.setItem('currentFlights', JSON.stringify(currentFlights))
  if(loadedUsers === null){
    currentUsers =  [...currentClients];
    localStorage.setItem('currentUsers', JSON.stringify(currentUsers));
  }
  else{
    currentUsers = JSON.parse(localStorage.getItem('currentUsers'));
  }
  if (loadedReservedFlights === null){
    currentReservedFlights = [...allReservedFlights];
    localStorage.setItem('reservedFlights', JSON.stringify(currentReservedFlights));
  }
  else{
    currentReservedFlights = JSON.parse(localStorage.getItem('reservedFlights'));
  }

  toggleCompanyTextBox(companyTextBoxEnabled, false);
  uiUpdateOnSignIn();
  updateUserName();
  forms.forEach((form) => form.reset());
  joinUsButton.style.display = userLoggedIn ? "none" : "initial";
});
signOutButton.addEventListener("click", userLogOut);

//pop overs close event for returning page scrolling back to normal
const popOvers = document.querySelectorAll("dialog");
popOvers.forEach((popoverElement, index) =>
  popoverElement.addEventListener("close", () => {
    toggleWindowScrolling(true);
    companyTextBoxEnabled = false;
    toggleCompanyTextBox( false, false)
    flightsContainer.innerHTML = "";
  })
);
function uiUpdateOnSignIn() {
  const isOnline = localStorage.getItem("isUserSignedIn") === "true";
  userLoggedIn = isOnline;
  signedInMenu.style.display = !userLoggedIn ? "none" : "flex";
  toggleSignInSignUpOptions(userLoggedIn);
  localStorage.setItem("isUserSignedIn", isOnline);
}
function toggleSignInSignUpOptions(userSignedIn) {
  if (userSignedIn) {
    signUpButton.style.display = "none";
    signInButton.style.display = "none";
  } else {
    signUpButton.style.display = "flex";
    signInButton.style.display = "flex";
  }
}
function showPopOverModal(e, popOver) {
  toggleWindowScrolling(false);
  if (userLoggedIn || popOver === bookFlightPopOver) {
    popOver.showModal();
    return;
  }
  if (e.target !== signUpButton) {
    signInPopOver.showModal();
    return;
  }
  signUpPopOver.showModal();
}
closePopOverButtons.forEach((button) => {
  button.addEventListener("click", () => {
    hidePopOver();
  });
});
function hidePopOver() {
  // const popOvers = document.querySelectorAll('[popover]')
  companyTextBoxEnabled = false;
  forms.forEach((form) => form.reset());
  toggleCompanyTextBox(companyTextBoxEnabled, false);
  toggleWindowScrolling(true);
  popOvers.forEach((popover) => popover.close());
  disableErrorMessages()
}

function userLogOut() {
  // alert("clicked")
  userLoggedIn = false;  
  // joinUsButton.style.display = "initial";
  localStorage.setItem("isUserSignedIn", userLoggedIn);
  window.dispatchEvent(signInChanged)
}

function validateSignIn(e) {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const userDetails = findUserSignIn(email, password, currentUsers);
  if (userDetails !== "undefined") {
    const spanElement = document.querySelector(`#signed-in-menu span:first-of-type`);
    userLoggedIn = true;
    spanElement.textContent = `Saludos, ${userDetails.firstName}`;
    const userJson = JSON.stringify(userDetails);
    localStorage.setItem("isUserSignedIn", userLoggedIn)
    localStorage.setItem("userDetails", userJson);
    signInPopOver.close();
    uiUpdateOnSignIn();
    window.dispatchEvent(signInChanged)
  }  
  enableErrorMessages()
}
function validateSignUp(e) {
  e.preventDefault();
  const userName = document.querySelector("#user-name");
  const userLastName = document.querySelector("#last-name");
  const userEmail = document.querySelector("#user-email");
  const userCreatedPw = document.querySelector("#create-user-password");
  const userConfirmPw = document.querySelector("#confirm-password");
  const userAddress = document.querySelector("#user-address");

  const userCompanyName = companyTextBoxEnabled
    ? document.querySelector("#company-name")
    : "undefined";
  const userPhoneNum = document.querySelector("#phone-number");
  if (userCreatedPw.value !== userConfirmPw.value){
    console.log("password must match");
    enableErrorMessages()
    return;
  }
  const hasCompany = userCompanyName !== "undefined" ? userCompanyName.value : "";  
  const lastUserId = currentUsers[currentUsers.length-1].id
  const newClientId = lastUserId + 1
  const newClient = {
    id: newClientId,
    firstName: userName.value,
    lastName: userLastName.value,
    email: userEmail.value,
    password: userCreatedPw.value,
    address: userAddress.value,
    companyName: hasCompany,
    phoneNumber: userPhoneNum.value,
    milesAccumulated: 0,
    isCorporateClient: userCompanyName === "undefined"? false: true
  };
  localStorage.setItem("userDetails", JSON.stringify(newClient));
  localStorage.setItem("isUserSignedIn", true);
  updateUserName();
  currentUsers = createNewClient(newClient);
  localStorage.setItem('currentUsers', JSON.stringify(currentUsers))
  uiUpdateOnSignIn();
  window.dispatchEvent(signInChanged)
  signUpPopOver.close();
}

function updateUserName() {
  const spanElement = document.querySelector(
    `#signed-in-menu span:first-of-type`
  );
  const userDetails = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : "undefined";
  if (userDetails === "undefined") return;
  spanElement.textContent = `Saludos, ${userDetails.firstName}`;
}

function toggleCompanyTextBox(textBoxEnabled, removeChecked = true) {
  if (textBoxEnabled) companyNameInput.setAttribute("required", "required");
  else companyNameInput.removeAttribute("required");
  if (removeChecked) noChoiceHasCompany.removeAttribute("checked");
  else noChoiceHasCompany.setAttribute("checked", "checked");
  const value = textBoxEnabled ? "flex" : "none";
  companyNameInput.style.display = value;
  companyNameLabel.style.display = value;
}
bookFlightForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const getFlights = localStorage.getItem('currentFlights') !== null? JSON.parse(localStorage.getItem('currentFlights')): [...flights];
  console.log(`flights ${getFlights}`)
  const allFlights = findAvailableFlights(getFlights);

  const fromVal = fromInput.value.toLowerCase();
  const toVal = toInput.value.toLowerCase();
  let matchingFlights = allFlights.filter((flight) => {
    return (
      fromVal === flight.fromDestination.toLowerCase() &&
      toVal === flight.toDestination.toLowerCase() && flight.flightStatus === "available"
    );
  });
  //vacia el contenerdor de vuelos encontrados
  flightsContainer.innerHTML = "";
  console.table(matchingFlights);
  if (matchingFlights.length === 0) {
    alert("No se encontraron vuelos disponibles");
    return;
  }
  
  matchingFlights.forEach((flight) => {
    const flightDetails = {
      date: (flight.flightDate),
      landingDate: (flight.landingDate),
      seatType: flight.seatType,
      cost: flight.baseCost,
      flightId: flight.flightId
    };
    generateFlight(flightDetails, flightsContainer);
  });
  //esto consigue cada uno de los botones de reserva y les agrega el poder reservar el vuelo
  // si el usuario esta registrado y con una sesion activa
  flightsContainer.querySelectorAll(".reserve-flight-button").forEach((button) => {
    if(!userLoggedIn){
      button.style.display = 'none'
      return 
    }
    const reservedGreenColor = '#22291C'
    button.addEventListener("click", (e) => {
        const parentNode = e.target.parentNode;      
        e.target.textContent = "Vuelo Reservado";
        e.target.setAttribute("disabled", "disabled")
        e.target.style.backgroundColor = reservedGreenColor;
        e.target.style.pointerEvents = 'none';
        e.target.style.cursor = 'default';        
        parentNode.style.color = reservedGreenColor;
        parentNode.style.outline = `2px solid ${reservedGreenColor}`;
        const clientId = parseInt(JSON.parse(localStorage.getItem('userDetails')).id)
        const flightDetails = {
          flightDate: e.target.dataset.flightDate,
          flightId: parseInt(e.target.dataset.flightId),
          seatType: e.target.dataset.flightSeatType,
          baseCost: parseInt(e.target.dataset.flightCost),    
        }
        const flightsReservedNow = [...JSON.parse(localStorage.getItem('reservedFlights'))]
        const flightsNow = [...JSON.parse(localStorage.getItem('currentFlights'))]
        reserveFlight(flightDetails, clientId, flightsReservedNow, flightsNow)
    })
  })
});

function disableErrorMessages(){
  errorMsgElements.forEach(element => element.style.display = 'none')
}
function enableErrorMessages(){
  errorMsgElements.forEach(element => element.style.display = 'flex')
}

const checkFlightStatusContainer = document.querySelector('#flight-status-container')
const checkFlightStatusPopOver = document.querySelector('#check-flight-status-popover')
flightStatus.addEventListener('click', () => {
  
  if(!userLoggedIn) signInButton.click()
  else{
    checkFlightStatusPopOver.showModal()
    toggleWindowScrolling(false)
    getAllReservedUserFlights()
  }
})

checkFlightStatusPopOver.addEventListener('close', () => {
  checkFlightStatusContainer.innerHTML = ""
  toggleWindowScrolling(true);
})

function getAllReservedUserFlights(){
  const reservedFlightsNow = JSON.parse(localStorage.getItem('reservedFlights'))
  const currentUserId = parseInt(JSON.parse(localStorage.getItem('userDetails')).id)
  const matchingReservedFlights = reservedFlightsNow.filter(flight => flight.clientId === currentUserId)
  // generate flights to cancel individually 
  if(matchingReservedFlights.length > 0){      
    checkFlightStatusContainer.innerHTML = ""
      matchingReservedFlights.forEach(flight => {
        const flightDetails = {
          date: flight.flightDate,
          landingDate: flight.landingDate,
          seatType: flight.seatType,
          cost: flight.baseCost,
          flightId: flight.flightId
        };
        generateFlight(flightDetails, checkFlightStatusContainer, false)
      })
  }
}