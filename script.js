import {
  findUserSignIn,  createNewClient, findAvailableFlights, formatTime , 
  toggleWindowScrolling, generateFlight, currentClients
} from "./utilityFunctions.js";
// import {clients, flights, reservedFlights} from './clients.js'
let currentUsers = []
const signUpButton = document.querySelector(
  "#signing-options > button:first-of-type"
);
const signInButton = document.querySelector(
  "#signing-options > button:last-of-type"
);
const switchButton = document.querySelector("#switch-button");
const checkInNavButton = document.querySelector(
  "#main-options-container > button:nth-of-type(2)"
);
const checkInPopOver = document.querySelector("#check-in-popover");
const bookFlightPopOver = document.querySelector("#book-flight-popover");
const bookFlightForm = document.querySelector("#book-flight-popover form");
const bookFlightNavButton = document.querySelector(
  "#main-options-container > button:nth-of-type(3)"
);
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
const body = document.body;
const fromInput = document.querySelector("#from-destination-box");
const toInput = document.querySelector("#to-destination-box");
const flightsContainer = document.querySelector("#available-flights-container");
const errorMsgElement = signInPopOver.querySelector('span') 
const signInPopOverFormInputs = signInPopOver.querySelectorAll('form input') 
const footer = `
    <footer>
      <div> © ${new Date().getFullYear()} Copyright: <span>Software Solution <strong>SRL</strong></span> <span>“Soluciones con un solo clic”</span></div>
    </footer>
`;
const signInChanged = new Event("sign-in-changed");
window.addEventListener('sign-in-changed',()=>{
   joinUsButton.style.display = userLoggedIn? 'none': 'initial'
   signedInMenu.style.display = !userLoggedIn ? "none" : "flex";
   toggleSignInSignUpOptions(userLoggedIn);
})
body.insertAdjacentHTML("beforeend", footer);
signUpButton.addEventListener("click", (e) =>
  showPopOverModal(e, signUpPopOver)
);
signInButton.addEventListener("click", (e) =>
  showPopOverModal(e, signInPopOver)
);
checkInNavButton.addEventListener("click", (e) =>
  showPopOverModal(e, checkInPopOver)
);
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
  
  try{currentUsers = [...JSON.parse(localStorage.getItem('currentUsers'))]}
  catch(e){
    currentUsers = [...currentClients]
    localStorage.setItem('currentUsers', JSON.stringify(currentUsers))
    console.error("no users in local storage")
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
    toggleWindowScrolling(true, body);
    forms[index].reset();
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
  toggleWindowScrolling(false, body);
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
  toggleWindowScrolling(true, body);
  popOvers.forEach((popover) => popover.close());
  errorMsgElement.style.display = 'none'
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
  if (userDetails) {
    const spanElement = document.querySelector(`#signed-in-menu span:first-of-type`);
    userLoggedIn = true;
    spanElement.textContent = `Welcome, ${userDetails.firstName}`;
    // joinUsButton.style.display = "none";
    const userJson = JSON.stringify(userDetails);
    localStorage.setItem("isUserSignedIn", userLoggedIn)
    localStorage.setItem("userDetails", userJson);
    signInPopOver.close();
    uiUpdateOnSignIn();
    window.dispatchEvent(signInChanged)
    return
  }
  
  errorMsgElement.style.display = 'flex'
  // localStorage.setItem(
  //   "isUserSignedIn",
  //   userDetails !== "undefined" ? true : false
  // );  
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
  if (userCreatedPw.value !== userConfirmPw.value) {
    console.log("password must match");
    return;
  }
  const hasCompany =
    userCompanyName !== "undefined" ? userCompanyName.value : "";
  const newClient = {
    firstName: userName.value,
    lastName: userLastName.value,
    email: userEmail.value,
    password: userCreatedPw.value,
    address: userAddress.value,
    companyName: hasCompany,
    phoneNumber: userPhoneNum.value,
    milesAccumulated: 0,
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
  spanElement.textContent = `Welcome, ${userDetails.firstName}`;
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

  const allFlights = findAvailableFlights();

  const fromVal = fromInput.value.toLowerCase();
  const toVal = toInput.value.toLowerCase();
  let matchingFlights = allFlights.filter((flight) => {
    return (
      fromVal === flight.fromDestination.toLowerCase() &&
      toVal === flight.toDestination.toLowerCase()
    );
  });
  //empty the flights container
  flightsContainer.innerHTML = "";
  console.table(matchingFlights);
  if (matchingFlights.length === 0) {
    alert("No flights available");
    return;
  }
  
  matchingFlights.forEach((flight) => {
    const flightDetails = {
      date: formatTime(flight.flightDate),
      landingDate: formatTime(flight.landingDate),
      seatType: flight.seatType,
      cost: flight.baseCost,
    };
    generateFlight(flightDetails, flightsContainer);
  });
});
signInPopOverFormInputs.forEach(elem=> elem.addEventListener('focus',()=>{
  errorMsgElement.style.display = 'none'
}))

