import {findUserSignIn, createNewClient}  from './utilityFunctions.js'
// import {clients, flights, reservedFlights} from './clients.js'

const signUpButton = document.querySelector('#signing-options > button:first-of-type')
const signInButton = document.querySelector('#signing-options > button:last-of-type')
const switchButton = document.querySelector('#switch-button')
const checkInNavButton = document.querySelector('#main-options-container > button:nth-of-type(2)')
const checkInPopOver = document.querySelector('#check-in-popover')
const bookFlightPopOver = document.querySelector('#book-flight-popover')
const bookFlightNavButton = document.querySelector('#main-options-container > button:nth-of-type(3)')
const signInPopOver = document.querySelector('#sign-in-popover')
const signUpPopOver = document.querySelector('#sign-up-popover')
const closePopOverButtons = document.querySelectorAll('.close-popover-button')
const userInfoWrapper = document.querySelector("#user-info-wrapper")
const signOutButton = document.querySelector('#sign-out-button')
const signInForm = document.querySelector('#log-in-form')
const signUpForm = document.querySelector('#sign-up-form')
const companyNameInput = document.querySelector('#company-name')
const companyNameLabel = document.querySelector('#company-name-label')
const noChoiceHasCompany = document.querySelector('#no-choice')
const bookTripButton = document.querySelector('#call-to-action button:first-of-type')
const joinUsButton = document.querySelector('#call-to-action button:last-of-type')
const yesChoiceHasCompany = document.querySelector('#yes-choice')
let companyTextBoxEnabled = false
const forms = document.querySelectorAll('form') 
const body = document.body

const footer = `
    <footer>
      <div> © ${new Date().getFullYear()} Copyright: <span>Software Solution <strong>SRL</strong></span> <span>“Soluciones con un solo clic”</span></div>
    </footer>
`
body.insertAdjacentHTML('beforeend', footer)
signUpButton.addEventListener('click', (e)=> showPopOverModal(e, signUpPopOver))
signInButton.addEventListener('click', (e)=> showPopOverModal(e, signInPopOver))
checkInNavButton.addEventListener('click', (e)=> showPopOverModal(e, checkInPopOver))
bookFlightNavButton.addEventListener('click', (e)=> showPopOverModal(e, bookFlightPopOver))
signInForm.addEventListener('submit', validateSignIn)
signUpForm.addEventListener('submit', validateSignUp)
bookTripButton.addEventListener('click', ()=>bookFlightNavButton.click())
joinUsButton.addEventListener('click', ()=> signUpButton.click())
noChoiceHasCompany.addEventListener('click',()=>{
    companyTextBoxEnabled = false
    toggleCompanyTextBox(companyTextBoxEnabled)    
})
yesChoiceHasCompany.addEventListener('click',()=>{
    companyTextBoxEnabled = true
    toggleCompanyTextBox(companyTextBoxEnabled)
})
let userLoggedIn = false

const signedInMenu = document.querySelector('#signed-in-menu')
window.addEventListener('load', ()=>{
    toggleCompanyTextBox(companyTextBoxEnabled, false)
    uiUpdateOnSignIn()
    updateUserName()    
    forms.forEach(form=> form.reset())
})
signOutButton.addEventListener('click', userLogOut)
function print(msg){
    console.log(msg)
}
function uiUpdateOnSignIn(){
    const isOnline = localStorage.getItem('isUserSignedIn') === 'true'
    userLoggedIn = isOnline 
    signedInMenu.style.display = !userLoggedIn? 'none': 'flex'
    toggleSignInSignUpOptions(userLoggedIn)
    localStorage.setItem('isUserSignedIn', isOnline)
}
function toggleSignInSignUpOptions(userSignedIn){

    if(userSignedIn)
    {
        signUpButton.style.display = 'none'
        signInButton.style.display = 'none'
    }else
    {
        signUpButton.style.display = 'flex'
        signInButton.style.display = 'flex'
    }
}
function showPopOverModal(e, popOver){
    if(userLoggedIn) {
        popOver.showModal()
        return
    }
    if(e.target !== signUpButton){
        signInPopOver.showModal()
        return
    }
    signUpPopOver.showModal()
}
closePopOverButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        hidePopOver()
    })
})
function hidePopOver(){
    const popOvers = document.querySelectorAll('[popover]') 
    companyTextBoxEnabled = false
    forms.forEach(form=> form.reset())
    popOvers.forEach(popover => popover.close())
    toggleCompanyTextBox(companyTextBoxEnabled, false)
}

function userLogOut(){
    // alert("clicked")
    userLoggedIn = false 
    signedInMenu.style.display = !userLoggedIn? 'none': 'flex'
    toggleSignInSignUpOptions(userLoggedIn)
    joinUsButton.style.display = 'initial'
    localStorage.setItem('isUserSignedIn', userLoggedIn)
    // uiUpdateOnSignIn()
}

function validateSignIn(e){
    e.preventDefault()
    const email = document.querySelector('#email').value 
    const password = document.querySelector('#password').value
    const userDetails = findUserSignIn(email, password)
    if(userDetails !== 'undefined'){
        const spanElement = document.querySelector(`#signed-in-menu span:first-of-type`)
        spanElement.textContent= `Welcome, ${userDetails.firstName}`
        joinUsButton.style.display = 'none'
        const userJson = JSON.stringify(userDetails)
        localStorage.setItem('userDetails', userJson)
    }
    localStorage.setItem('isUserSignedIn', userDetails !== 'undefined'? true: false)
    signInPopOver.close()
    uiUpdateOnSignIn()
}
function validateSignUp(e){
    e.preventDefault()
    const userName = document.querySelector('#user-name')
    const userLastName = document.querySelector('#last-name')
    const userEmail = document.querySelector('#user-email')
    const userCreatedPw = document.querySelector('#create-user-password')
    const userConfirmPw = document.querySelector('#confirm-password')
    const userAddress = document.querySelector('#user-address')

    const userCompanyName = companyTextBoxEnabled? document.querySelector('#company-name'): 'undefined'
    const userPhoneNum = document.querySelector('#phone-number')
    if(userCreatedPw.value !== userConfirmPw.value){
        console.log("password must match")
        return
    }
    const hasCompany = userCompanyName !== 'undefined'? userCompanyName.value: ""
    const newClient = {
        firstName: userName.value, lastName: userLastName.value, email: userEmail.value, password: userCreatedPw.value,
        address: userAddress.value, companyName: hasCompany, phoneNumber: userPhoneNum.value, milesAccumulated: 0
    }
    localStorage.setItem('userDetails', JSON.stringify(newClient))
    localStorage.setItem('isUserSignedIn', true)
    updateUserName()
    createNewClient(newClient)
    signUpPopOver.close()
    uiUpdateOnSignIn()
}

function updateUserName(){
    const spanElement = document.querySelector(`#signed-in-menu span:first-of-type`)
    const userDetails = localStorage.getItem('userDetails')? JSON.parse(localStorage.getItem('userDetails')): 'undefined'
    if(userDetails === 'undefined') return
    spanElement.textContent= `Welcome, ${userDetails.firstName}`    
}

function toggleCompanyTextBox(textBoxEnabled, removeChecked = true){
    if(textBoxEnabled) companyNameInput.setAttribute('required',"required")
    else companyNameInput.removeAttribute('required')
    if(removeChecked)noChoiceHasCompany.removeAttribute('checked')
    else noChoiceHasCompany.setAttribute('checked', 'checked')
    const value = textBoxEnabled? 'flex': 'none'
    companyNameInput.style.display = value
    companyNameLabel.style.display = value
}

function generateFlight(flight){
    const newFlight = 
    ` 
    <div class="flight-template">
        <div>
            <span>${flight.date}</span>
            <span>${flight.landingDate}</span>
        </div>
        <div>${flight.seatType}</div>
        <div>${flight.cost}</div>
    </div>
    `
    const flightsContainer = document.querySelector('#available-flights-container')
    flightsContainer.insertAdjacentHTML('beforeend', newFlight)
}