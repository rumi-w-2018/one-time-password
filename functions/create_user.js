const admin = require('firebase-admin');

module.exports = function(req, res) {
    
    // res.send(req.body);  // to send Json back to user 

    // Verify the user provided a phone
    if(!req.body.phone){
        return res.status(422).send({error: 'Bad Input'});
    }

    // Format the phone number to remove dashes and parens
    // 1. Make sure the phone is string first.
    // 2. Remove all non-digits 

    const phone = String(req.body.phone).replace(/[^\d]/g, '');

    // Create a new user account using that phone number
    // The phone number is used as ID (uid)
    // async reqeust to database - returns promise

    admin.auth().createUser({ uid: phone })
    .then((user) => res.status(400).send(user))
    .catch((error) => res.status(422).send({ error: error }));

    // Respond to the user request, saying the account was made
}
