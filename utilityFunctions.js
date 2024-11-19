import {clients, flights, reservedFlights} from './clients.js'

let currentClients = [...clients]
function findUserSignIn(userEmail, userPassword){
    const matchingClientFound = currentClients.find(client=> {
       return (client.email.toLowerCase() === userEmail.toLowerCase() && client.password === userPassword)? client: false       
    }) 
    if(matchingClientFound){
        console.table(matchingClientFound)
        return matchingClientFound
    }
    console.log("Error Password or email either incorrect, try again.")
    return 'undefined'
}

function findAvailableFlights(){
    const foundFlights = flights.filter(flight => flight.flightStatus === 'available')
    console.table(foundFlights)
    return foundFlights
}

function createNewClient(newClientInfo){
   currentClients = [...currentClients, newClientInfo]
   console.log(`Updated Clients List ${currentClients}`)
}

export {findUserSignIn , findAvailableFlights , createNewClient} 