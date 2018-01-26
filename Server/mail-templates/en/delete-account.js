var template = function (user, token) {
    this.message = {
        from: 'team@projectfinder.com',
        to: user.email,
        subject: 'Your password reset link for ProjectFinder',
        text: 'Please click this link to reset your password: http://10.0.0.5:3000/auth/resetPassword?token=' + token + '" '
    }
};

module.exports = template;