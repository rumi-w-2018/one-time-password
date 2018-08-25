const admin = require('firebase-admin');

module.exports = function(req, res){
    if(!req.body.phone || !req.body.code){
        return res.status(422).send({error: 'Phone and code must be provided'});
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, ''); // phone has to be a string
    const code = parseInt(req.body.code);    // code has to be a number

    admin.auth().getUser(phone)
    .then(() => {

        // Look at users collection using phone number
        const ref = admin.database().ref('users/' + phone);

        // on - Event handler. Find the record with matching phone value, then take snapshot of the record
        ref.on('value', snapshot => {

            // Important!! - Event handler needs to be detached.
            ref.off();
            const user = snapshot.val();

            if(user.code !== code || !user.codeValid){
                return res.status(422).send({ error: 'Code not valid' });
            }

            // Update codeValid = false
            ref.update({ codeValid: false });

           // Generate JWT (Json Web Token)
           // createCustomToken requires id
           admin.auth().createCustomToken(phone)
           .then( token => res.send({ token: token}))
        });
    })
    .catch( error => res.status(422).send({ error: error }))
}