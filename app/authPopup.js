// Create the main myMSALObj instance
// Configuration parameters are located at authConfig.js

const myMSALObj = new msal.PublicClientApplication(msalConfig);

let username = "";

function selectAccount() {
    const currentAccounts = myMSALObj.getAllAccounts();
    if (currentAccounts.length === 0) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add choose account code here
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        showWelcomeMessage(username);
    }
}

function handleResponse(response) {
    if (response !== null) {
        username = response.account.username;
        showWelcomeMessage(username);
    } else {
        selectAccount();
    }
}

function signIn() {
    myMSALObj.loginPopup(loginRequest)
        .then(handleResponse)
        .catch(error => {
            console.error(error);
        });
}

function signOut() {
    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
        mainWindowRedirectUri: msalConfig.auth.redirectUri
    };

    myMSALObj.logoutPopup(logoutRequest);
}

function getTokenPopup(request) {
    request.account = myMSALObj.getAccountByUsername(username);
    
    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            console.warn("silent token acquisition fails. acquiring token using popup");
            if (error instanceof msal.InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                return myMSALObj.acquireTokenPopup(request)
                    .then(tokenResponse => {
                        console.log(tokenResponse);
                        return tokenResponse;
                    }).catch(error => {
                        console.error(error);
                    });
            } else {
                console.warn(error);   
            }
    });
}

function sendMail() {
    var emailListText = document.querySelector('.email-list-diffusion').value.trim();
    var emailObject = document.querySelector('.email-object').value;
    var emailBody = document.querySelector('.text-zone').value;

    if (emailListText === '') {
        alert('Veuillez saisir une adresse e-mail.');
        return;
    }

    // Diviser le contenu en une liste d'adresses e-mail
    var emails = emailListText.split(',').map(email => email.trim());

    // Vérifier si le format de chaque adresse e-mail est valide
    for (var i = 0; i < emails.length; i++) {
        var email = emails[i];
        if (!validateEmail(email)) {
            alert('Veuillez saisir une adresse e-mail valide.');
            return;
        }
    }
    sendMailFunction(emails, emailObject, emailBody); // Utilisez 'emails' au lieu de 'email'
}

function validateEmail(email) {
    // Expression régulière pour valider une adresse e-mail
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function sendMailFunction(toList, subject, body) {
    getTokenPopup(tokenRequest)
        .then(response => {
            const accessToken = response.accessToken;
            const email = {
                message: {
                    subject: subject,
                    body: {
                        contentType: "Text",
                        content: body
                    },
                    toRecipients: toList.map(email => {
                        return {
                            emailAddress: {
                                address: email
                            }
                        };
                    })
                }
            };
            // Call to Microsoft Graph API to send the email
            fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + accessToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(email)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error sending email");
                }
                console.log("Email sent successfully!");
                alert("E-mail envoyé avec succès!");
                document.querySelector('.email-list-diffusion').value = '';
                document.querySelector('.email-object').value = '';
                document.querySelector('.text-zone').value = '';
            })
            .catch(error => {
                console.error(error);
                alert("Erreur lors de l'envoi de l'e-mail: " + error.message);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

selectAccount();