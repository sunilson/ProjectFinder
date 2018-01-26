module.exports = {
    projectTitle: {
        minLength: 3,
        maxLength: 99
    },
    projectDescription: {
        minLength: 5,
        maxLength: 9999
    },
    locationName: {
        minLength: 1,
        maxLength: 50
    },
    chatMessage: {
        minLength: 1,
        maxLength: 120
    },
    maxMemberAmount: {
        min: 2,
        max: 10,
        default: 5
    },
    duration: {
        minLength: 86400000
    },
    projectApplication: {
        minLength: 10,
        maxLength: 9999
    },
    tags: {
        minLength: 2,
        maxLength: 100
    },
    search: {
        radius: 10000
    },
    resetToken: {
        expiresIn: 1800000
    }
}