var template = function (recipient, token) {
    this.message = {
        from: 'team@projectfinder.com',
        to: recipient,
        subject: 'Your activation link for ProjectFinder',
        text: 'Please click this link to activate your account: http://10.0.0.5:3000/auth/verify?token=' + token
    }
};

module.exports = template;