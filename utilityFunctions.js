import clients from './clients'

const currentClients = [...clients]
function findUserSignIn(userEmail, userPassword){
    const foundClientEmail = currentClients.find(client=> client.email === userEmail) === true
    const foundClientPassword = currentClients.find(clientPw=> clientPw.password === userPassword) === true
}