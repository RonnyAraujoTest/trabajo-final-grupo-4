import { clients, flights, reservedFlights } from "./clients.js";

let currentClients = [...clients];
function findUserSignIn(userEmail, userPassword) {
  const matchingClientFound = currentClients.find((client) => {
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

function findAvailableFlights() {
  const foundFlights = flights.filter(
    (flight) => flight.flightStatus === "available"
  );
  // console.table(foundFlights)
  return foundFlights;
}

function createNewClient(newClientInfo) {
  currentClients = [...currentClients, newClientInfo];
  console.log(`Updated Clients List ${currentClients}`);
}
function formatTime(datetimeLong) {
  let date = new Date(datetimeLong);
  let hous = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const formattedTime = `${hous}:${minutes}`;
  return formattedTime;
}

function toggleWindowScrolling(enabled, body) {
  if (!enabled) {
    body.style.height = "100%";
    body.style.overflowY = "hidden";
    return;
  }
  body.style.height = "initial";
  body.style.overflowY = "initial";
}

function generateFlight(flight, flightsContainer) {
  const newFlight = `
      <div class="flight-template">
          <div>
              <span><strong>Departing Time:</strong> ${flight.date}</span>
              <span><strong>Arriving Time:</strong> ${flight.landingDate}</span>
          </div>
          <div><strong>Seat Type</strong>: ${flight.seatType}</div>
          <div><strong>Cost:</strong> ${flight.cost}</div>
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
export {
  findUserSignIn,  findAvailableFlights,  createNewClient,  formatTime,
  toggleWindowScrolling,  generateFlight, print
};
