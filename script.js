

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
signUpButton.addEventListener('click', (e)=> showPopOverModal(e, signUpPopOver))
signInButton.addEventListener('click', (e)=> showPopOverModal(e, signInPopOver))
checkInNavButton.addEventListener('click', (e)=> showPopOverModal(e, checkInPopOver))
bookFlightNavButton.addEventListener('click', (e)=> showPopOverModal(e, bookFlightPopOver))
let userLoggedIn = false

const userOptions = document.querySelector('#signed-in-menu')
window.addEventListener('load', ()=>{
    const isOnline = localStorage.getItem('isUserSignedIn') === 'true'
    userLoggedIn = isOnline 
    userOptions.style.display = !userLoggedIn? 'none': 'flex'
    toggleSignInSignUpOptions(userLoggedIn)
    localStorage.setItem('isUserSignedIn', isOnline)
})

function print(msg){
    console.log(msg)
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
    popOvers.forEach(popover => popover.close())
}