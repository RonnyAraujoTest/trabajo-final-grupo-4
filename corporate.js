import {flightAdmins, findAllFlights} from './flightAdmins.js'
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
const signInMenuContainer = document.querySelector('signed-in-menu') 
const signInButton = document.querySelector("#sign-in-options > button:first-of-type")
const welcomeMessage = document.querySelector('#signed-in-sub-menu > span:first-of-type')
const signInSubMenuWrapper = document.querySelector('#signed-in-submenu-wrapper')
const signInSubMenu = document.querySelector('#signed-in-submenu')
const signOutButton = document.querySelector('#sign-out-button')
const signInPopOver = document.querySelector('#sign-in-popover')
const addNewUserPopOver = document.querySelector('#new-user-popover')
const deleteUserPopOver = document.querySelector('#delete-user-popover')
const updateUserPopOver = document.querySelector('#update-user-popover')
const closeButtons = document.querySelectorAll('.close-popover-button')
const dialogs = document.querySelectorAll('dialog')
const forms = document.querySelectorAll('form')
const findFlightsButton = document.querySelector('#main-options-container > button:nth-of-type(4)')
const userLogInForm = document.querySelector('#user-log-in-form')
signOutButton.onclick =()=> localStorage.setItem('adminSignedIn', false)
signInButton.onclick=()=> signInPopOver.showModal()
addUserButton.onclick=()=> addNewUserPopOver.showModal()
deleteUserButton.onclick=()=> deleteUserPopOver.showModal()
updateUserButton.onclick=()=> updateUserPopOver.showModal()


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
    user.adminAccess = [user.create, user.update, user.delete]
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
findFlightsButton.addEventListener('click', () => {
    findAllFlights()
})

userLogInForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = document.querySelector('#user-log-in-form')
    const formData = new FormData(form)
    const adminUserDetails = formData.get('user-to-delete')
    let adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || []
    adminUsers = adminUsers.filter(user => user.id !== parseInt(userId))
    alert(`usuario ${userId} borrado`)
    localStorage.setItem('adminUserDetails', JSON.stringify(adminUserDetails))    
    signInPopOver.close()
  })