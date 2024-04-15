/**
 * Configuration object to be passed to MSAL instance on creation.
 */
const msalConfig = {
    auth: {
        // 'Application (client) ID'
        clientId: "c2e332d5-22db-494b-818f-ee14d07287ce",
        // Full directory URL
        authority: "https://login.microsoftonline.com/common/",
        // Full redirect URL
        redirectUri: "http://localhost:3000",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case msal.LogLevel.Error:
                        console.error(message);
                        return;
                    case msal.LogLevel.Info:
                        console.info(message);
                        return;
                    case msal.LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case msal.LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

const loginRequest = {
    scopes: ["User.Read", "Mail.Send"]
};


const tokenRequest = {
    scopes: ["User.Read", "Mail.Read", "Mail.Send"],
    forceRefresh: false
};
