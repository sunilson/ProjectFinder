module.exports = {
    userName: {
        minLength: 5,
        maxLength: 15
    },
    password: {
        minLength: 6,
        maxLength: 15
    },
    type: {
        standard: "standard",
        google: "google"
    },
    name: {
        minLength: 2,
        maxLength: 50,
    },
    auth: {
        accessExpire: "60m",
        refreshExpire: "1000d"
    },
    deletion: {
        userID: "123",
        projectID: "123",
        applicationID: "123",
        token: {
            expiresIn: 1800000
        }
    }
}