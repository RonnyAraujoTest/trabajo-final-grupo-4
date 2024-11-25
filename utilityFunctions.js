import { clients, flights, reservedFlights } from "./clients.js";

const currentClients = [...clients];
function findUserSignIn(userEmail, userPassword, allClients) {
  const matchingClientFound = allClients.find((client) => {
    return client.email.toLowerCase() === userEmail.toLowerCase() &&
      client.password === userPassword
      ? client
      : false;
  });
  if (matchingClientFound) {
    console.table(matchingClientFound);
    return matchingClientFound;
  }
  console.log("Error Password or email either incorrect, try again.");
  return "undefined";
}

function findAvailableFlights(flights) {
  const foundFlights = flights.filter(
    (flight) => flight.flightStatus === "available"
  );
  // console.table(foundFlights)
  return foundFlights;
}

function createNewClient(newClientInfo) {
  const updatedClients = [...currentClients, newClientInfo];
  console.log(`Updated Clients List ${currentClients}`);
  return updatedClients
}
function formatTime(datetimeLong) {
  let date = new Date(datetimeLong);
  let hous = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const formattedTime = `${hous}:${minutes}`;
  return formattedTime;
}

function toggleWindowScrolling(enabled) {
  const body = document.body;
  if (!enabled) {
    body.style.height = "100%";
    body.style.overflowY = "hidden";
    return;
  }
  body.style.height = "initial";
  body.style.overflowY = "initial";
}

function generateFlight(flight, flightsContainer, isFlightInteractible=true, buttonText="Reservar Vuelo", editable=false) {
  const landingDate = flight.landingDate !== undefined ? `<span class="flight-landing-date"><strong>Hora de llegada:</strong> ${formatTime(flight.landingDate)}</span>`: ""
  const button = isFlightInteractible ? `
    <button 
      data-flight-id="${flight.flightId}"
      data-flight-date="${flight.date}"
      data-flight-seat-type="${flight.seatType}"
      data-flight-cost="${flight.cost}"   
      data-flight-number="${flight.flightNumber}"         
    type="submit" class="button-styling reserve-flight-button">${buttonText}</button>
  ` : "";
  const newFlight = `
      <div class="flight-template">
          <div>
              <span class="flight-date"><strong>Hora de salida:</strong> <span contenteditable="${editable}">${formatTime(flight.date)}</span></span>
              ${landingDate}
          </div>
          <div class="flight-seat-type"><strong>Tipo de asiento</strong>: ${flight.seatType}</div>
          <div><strong>ID de Vuelo:</strong> ${flight.flightId}</div>
          <div class="flight-cost"><strong>Costo:</strong> ${flight.cost}</div>
          ${button}
      </div>
      `;
  flightsContainer.insertAdjacentHTML("beforeend", newFlight);
}
function print(msg) {
    console.log(msg);
  }

function formCustomErrorMessage(inputElement, message){
  inputElement.setCustomValidity(message);
  inputElement.reportValidity();
}
function reserveFlight(flightInfo,  clientId, flightsReserved, flights){
  const flightsThisTime = [...flights]
  flightsReserved.push({
    reservedId: flightsReserved[flightsReserved.length-1].reservedId+1,
    flightDate: flightInfo.flightDate,
    clientId: clientId,
    flightId: flightInfo.flightId,
    baseCost: flightInfo.baseCost,
    seatType: flightInfo.seatType
  })  
  const flightIndex = flightsThisTime.findIndex(flight => flight.flightId === flightInfo.flightId)
  if(flightIndex !== -1){
    flightsThisTime[flightIndex].flightStatus = "reserved"
    localStorage.setItem('currentFlights', JSON.stringify(flightsThisTime))
    localStorage.setItem('reservedFlights', JSON.stringify(flightsReserved))
    return 
  }
  console.log(`Flight with id ${flightsThisTime} not found`)
}
function cancelFlight(flightNumber, flightsReserved){
  const updatedFlightsReserved = flightsReserved.filter(flightToCancel=> flightToCancel.ClientId !== flightNumber)
  const currentFlightsList = localStorage.getItem('currentFlights') !== null? JSON.parse(localStorage.getItem('currentFlights')): [...flights];
  const flightIndex = currentFlightsList.findIndex(flight => flight.flightId === flightNumber)
  currentFlightsList[flightIndex].flightStatus = "available"
  localStorage.setItem('currentFlights', JSON.stringify(currentFlightsList))
  localStorage.setItem('reservedFlights', JSON.stringify(updatedFlightsReserved))
  return updatedFlightsReserved
}
function addFooter(){
  const body = document.body;
  const footer = `
      <footer>
        <div> © ${new Date().getFullYear()} Copyright: <span>Software Solution <strong>SRL</strong></span> <span>“Soluciones con un solo clic”</span></div>
      </footer>
  `;
  body.insertAdjacentHTML("beforeend", footer);
}
export {
  findUserSignIn,  findAvailableFlights,  createNewClient,  formatTime,
  toggleWindowScrolling,  generateFlight, print, currentClients, 
  reservedFlights, cancelFlight, reserveFlight, addFooter
};
