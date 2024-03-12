// Select DOM elements to work with
const welcomeDiv = document.getElementById("WelcomeMessage");
const signInButton = document.getElementById("SignIn");
const mailArea = document.getElementById("mailArea");
const spamType = document.getElementById("spamType");
const mailButton = document.getElementById("sendMail");

function showWelcomeMessage(username) {
    // Reconfiguring DOM elements
    mailArea.style.display = 'initial';
    spamType.style.display = 'initial';
    //welcomeDiv.innerHTML = `Bienvenue ${username} !`;
    signInButton.setAttribute("onclick", "signOut();");
    signInButton.setAttribute('class', "btn btn-success")
    signInButton.innerHTML = "Déconnexion";
}

