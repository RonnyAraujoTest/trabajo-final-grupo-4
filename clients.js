
const clients = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St, Anytown, USA",
    isCorporateClient: true,
    companyName: "TechCorp Inc.",
    email: "john.doe@techcorp.com",
    password: "password123",
    phoneNumber: "555-123-4567",
    milesAccumulated: 5000
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    address: "456 Elm St, Othertown, USA",
    isCorporateClient: false,
    email: "jane.smith@example.com",
    password: "password456",
    phoneNumber: "555-234-5678",
    milesAccumulated: 3000
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    address: "789 Oak St, Sometown, USA",
    isCorporateClient: true,
    companyName: "Innovate Solutions",
    email: "alice.johnson@innovatesolutions.com",
    password: "password789",
    phoneNumber: "555-345-6789",
    milesAccumulated: 7000
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Brown",
    address: "101 Pine St, Anothertown, USA",
    isCorporateClient: false,
    email: "bob.brown@example.com",
    password: "password101",
    phoneNumber: "555-456-7890",
    milesAccumulated: 2000
  },
  {
    id: 5,
    firstName: "Carol",
    lastName: "Davis",
    address: "202 Maple St, Yetanothertown, USA",
    isCorporateClient: true,
    companyName: "Enterprise Holdings",
    email: "carol.davis@enterprise.com",
    password: "password202",
    phoneNumber: "555-567-8901",
    milesAccumulated: 6000
  }
];

const flights = [
  {
    flightId: 1,
    flightDate: "2025-02-15T10:00:00-05:00",
    fromDestination: "ATL",
    toDestination: "BOS",
    flightNumber: "UA607",
    confirmationNumber: "88990011",
    landingDate: "2025-02-15T13:00:00-05:00",
    seatId: "25B",
    seatType: "Economy",
    baseCost: 200,
    flightStatus: "available",
  },
  {
    flightId: 2,
    flightDate: "2025-02-16T11:00:00-05:00",
    fromDestination: "LAX",
    toDestination: "JFK",
    flightNumber: "AA123",
    confirmationNumber: "12345678",
    landingDate: "2025-02-16T19:00:00-05:00",
    seatId: "12A",
    seatType: "First Class",
    baseCost: 500,
    flightStatus: "reserved",
  },
  {
    flightId: 3,
    flightDate: "2025-02-17T12:00:00-05:00",
    fromDestination: "ORD",
    toDestination: "MIA",
    flightNumber: "UA456",
    confirmationNumber: "87654321",
    landingDate: "2025-02-17T16:00:00-05:00",
    seatId: "14C",
    seatType: "Economy",
    baseCost: 150,
    flightStatus: "unavailable",
  },
  {
    flightId: 4,
    flightDate: "2025-02-18T13:00:00-05:00",
    fromDestination: "SFO",
    toDestination: "SEA",
    flightNumber: "DL789",
    confirmationNumber: "11223344",
    landingDate: "2025-02-18T15:00:00-05:00",
    seatId: "15D",
    seatType: "Economy",
    baseCost: 120,
    flightStatus: "available",
  },
  {
    flightId: 5,
    flightDate: "2025-02-19T14:00:00-05:00",
    fromDestination: "DFW",
    toDestination: "DEN",
    flightNumber: "AA202",
    confirmationNumber: "33445566",
    landingDate: "2025-02-19T16:00:00-05:00",
    seatId: "18A",
    seatType: "First Class",
    baseCost: 400,
    flightStatus: "reserved",
  },  
];

const reservedFlights = [
    {
      reservedId: 1,
      flightDate: "2024-12-01T10:00:00-05:00",
      clientId: 1,
      flightId: 1,
      baseCost: 200,
      seatType: "Economy"
    },
    {
      reservedId: 2,
      flightDate: "2025-01-15T11:00:00-05:00",
      clientId: 1,
      flightId: 2,
      baseCost: 500,
      seatType: "First Class"
    },
    {
      reservedId: 3,
      flightDate: "2024-12-05T12:00:00-05:00",
      clientId: 2,
      flightId: 3,
      baseCost: 150,
      seatType: "Economy"
    }
  ];
export { clients, flights, reservedFlights };
