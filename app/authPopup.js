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

/*function seeProfile() {
    getTokenPopup(loginRequest)
        .then(response => {
            callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
        }).catch(error => {
            console.error(error);
        });
}

function readMail() {
    getTokenPopup(tokenRequest)
        .then(response => {
            callMSGraph(graphConfig.graphMailEndpoint, response.accessToken, updateUI);
        }).catch(error => {
            console.error(error);
        });
}
*/
function sendMail(toList, subject, body) {
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
            })
            .catch(error => {
                console.error(error);
            });
        })
        .catch(error => {
            console.error(error);
        });
}



selectAccount();