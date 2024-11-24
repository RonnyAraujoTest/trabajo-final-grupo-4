import {flights} from './clients.js'
const flightAdmins = [
    {
      id: 1,
      fullName: "Alice Johnson",
      email: "alice.johnson@example.com",
      password: "password123",
      adminAccess: ["create", "update", "delete"]
    },
    {
      id: 2,
      fullName: "Bob Smith",
      email: "bob.smith@example.com",
      password: "password456",
      adminAccess: ["create", "update", "delete"]
    },
    {
      id: 3,
      fullName: "Carol White",
      email: "carol.white@example.com",
      password: "password789",
      adminAccess: ["update", "delete"]
    },
    {
      id: 4,
      fullName: "David Brown",
      email: "david.brown@example.com",
      password: "password101",
      adminAccess: ["create", "update", "delete"]
    },
    {
      id: 5,
      fullName: "Eve Davis",
      email: "eve.davis@example.com",
      password: "password202",
      adminAccess: ["create", "update", "delete"]
    },
    {
      id: 6,
      fullName: "Frank Miller",
      email: "frank.miller@example.com",
      password: "password303",
      adminAccess: ["update", "delete"]
    }
  ];

function findAvailableFlights(flights){
    const availFlights = flights.filter(flight=> flight.flightStatus === "available")
    return availFlights
}
function deleteFlight(flights, flightId){
    const flightIndex = flights.findIndex(flightId)
    flights.splice(flightIndex, 1)
}
function findAllFlights(){
  const allFlights = localStorage.getItem('currentFlights') !== null? JSON.parse(localStorage.getItem('currentFlights')): [...flights];
  console.log(`flights ${allFlights}`)
  return allFlights
}
export {flightAdmins, findAllFlights}