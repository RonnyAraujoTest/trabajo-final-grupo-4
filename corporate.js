import {flightAdmins, findAllFlights,} from './flightAdmins.js'
import {generateFlight, addFooter} from './utilityFunctions.js'
let adminSignedIn = localStorage.getItem('adminSignedIn') === 'true'
let adminUsers = localStorage.getItem('adminUsers') === null? [...flightAdmins]: JSON.parse(localStorage.getItem('adminUsers'))
const currentSignedInUser = null
localStorage.setItem('adminSignedIn', adminSignedIn)
localStorage.setItem('adminUsers', JSON.stringify(adminUsers))
const navBarOptions = document.querySelector('#main-options-container')
const addUserButton = navBarOptions.querySelector("button:nth-of-type(1)")
const deleteUserButton = navBarOptions.querySelector('button:nth-of-type(2)')
const updateUserButton = navBarOptions.querySelector("button:nth-of-type(3)")
const signInOptions = document.querySelector('#sign-in-options') 
const signInMenuContainer = document.querySelector('#signed-in-menu') 
const signInButton = document.querySelector("#sign-in-options > button:first-of-type")
const welcomeMessage = document.querySelector('#signed-in-sub-menu > span:first-of-type')
const signInSubMenuWrapper = document.querySelector('#signed-in-submenu-wrapper')
const signInSubMenu = document.querySelector('#signed-in-submenu')
const signInAdminProfileName = document.querySelector('#signed-in-menu > span:first-of-type')
const signOutButton = document.querySelector('#sign-out-button')
const signInPopOver = document.querySelector('#sign-in-popover')
const addNewUserPopOver = document.querySelector('#new-user-popover')
const deleteUserPopOver = document.querySelector('#delete-user-popover')
const updateUserPopOver = document.querySelector('#update-user-popover')
const closeButtons = document.querySelectorAll('.close-popover-button')
const dialogs = document.querySelectorAll('dialog')
const forms = document.querySelectorAll('form')
const findFlightsButton = document.querySelector('#main-options-container > button:nth-of-type(4)')
const findFlightsSubmitButton = document.querySelector('#get-flights-submit-button')
const findFlightsForm = document.querySelector('#all-flights-container-popover form')
const findFlightsPopOver = document.querySelector('#all-flights-container-popover')
const userLogInForm = document.querySelector('#user-log-in-form')
const flightsFoundContainer = document.querySelector('#all-flights-container')

addFooter()
document.addEventListener('DOMContentLoaded',()=>{
    document.body.style.setProperty('--bg-image', `url("./adminBG.webp")`)
})
signOutButton.onclick =()=> {
    signInButton.style.display = 'flex'
    signInMenuContainer.style.display = 'none'
    udpateSignIn(false)
    localStorage.setItem('adminSignedIn', false)
}
signInButton.onclick=()=>  signInPopOver.showModal()  
addUserButton.onclick=()=>      {
    if(adminSignedIn) addNewUserPopOver.showModal() 
    else signInPopOver.showModal()
}
deleteUserButton.onclick=()=>   {
    if(adminSignedIn) deleteUserPopOver.showModal() 
    else signInPopOver.showModal()
}
updateUserButton.onclick=()=>   {
    if(adminSignedIn) updateUserPopOver.showModal() 
    else signInPopOver.showModal()
}


dialogs.forEach((dialog, index) => {
    dialog.addEventListener("close", () => {
        forms[index].reset()
    });
});
closeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        dialogs[index].close()
    });
});
addNewUserPopOver.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = document.querySelector('#new-user-popover > form')
    const formData = new FormData(form)
    const user = Object.fromEntries(formData)
    let adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || []
    user.id = adminUsers[adminUsers.length-1].id + 1
    user.adminAccess = "create,update,delete".split(',')
    adminUsers.push(user)
    localStorage.setItem('adminUsers', JSON.stringify(adminUsers))
    addNewUserPopOver.close()
  })

deleteUserPopOver.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = document.querySelector('#delete-user-popover > form')
    const formData = new FormData(form)
    const userId = formData.get('user-to-delete')
    let adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || []
    adminUsers = adminUsers.filter(user => user.id !== parseInt(userId))
    alert(`usuario ${userId} borrado`)
    localStorage.setItem('adminUsers', JSON.stringify(adminUsers))    
    deleteUserPopOver.close()
  })
findFlightsSubmitButton.addEventListener('click', (e) => {
    e.preventDefault()    
    flightsFoundContainer.innerHTML = ''
    const formInfo = new FormData(findFlightsForm)
    const formData = Object.fromEntries(formInfo)
    console.log(formData)
    const currentFlights = findAllFlights()    
    currentFlights.forEach(flight => {
        const newFlight = {
            flightId: flight.flightId,
            date: flight.flightDate,
            landingDate: flight.landingDate,
            seatType: flight.seatType,
            cost: flight.baseCost,
        }
        generateFlight(newFlight, flightsFoundContainer, false, true) 
    })    
})

userLogInForm.addEventListener('submit', (e) => {
    e.preventDefault()
  
    const formData = new FormData(e.target)
    const getEmail = formData.get('sign-in-email')
    const getpassword = formData.get('sign-in-password') 
    const adminUsers = JSON.parse(localStorage.getItem('adminUsers'))
    const user = adminUsers.find(user => user.email === getEmail && user.password === getpassword)
    if(!user){
        alert("user not found"); 
        return
    }
    signInButton.style.display = 'none'
    signInMenuContainer.style.display = 'flex'
    const userName = user.fullName.split(' ')[0]
    signInAdminProfileName.innerHTML = `Saludos, ${userName}`
    udpateSignIn(true)
    localStorage.setItem('adminSignedIn', true)
    signInPopOver.close()
  })

  findFlightsButton.addEventListener('click', () => {    
    if(adminSignedIn) findFlightsPopOver.showModal()
    else signInPopOver.showModal()
  })
  findFlightsPopOver.addEventListener('close', () => {
      flightsFoundContainer.innerHTML = ''
  })
function udpateSignIn(newVal){
    adminSignedIn = newVal
}