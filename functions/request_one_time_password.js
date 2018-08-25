const admin = require('firebase-admin');
const twilio = require('./twilio')  // My twilio.js

module.exports = function(req, res){

    // Validation
    if(!req.body.phone){
        return res.status(422).send({ error: 'You must provide a phone number.'});
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, '');

    // Find user by the phone (= uid)
    admin.auth().getUser(phone)
    .then( userRecord => {
        const code = Math.floor(Math.random() * 8999 + 1000);  // random number: 1000 - 9999

        // twilio doesn't return promise -> we have to use callback
        twilio.messages.create({
            body: `Your code is ${code}`,
            to: phone,
            from: '+17209437960'
        }, (err) => {
            if(err){
                return res.status(422).send({ error: 'twilio error' });
            }
            // 1. In Reattime Database, create a new collection (node) called 'users', 
            // 2. In the collection create a new entry, phone
            admin.database().ref('users/' + phone)
            .update({ code: code, codeValid: true }, () => {
                res.send({ success:true });
            })
        })
    })
    .catch((error)=>{
        res.status(422).send({ error: error });
    })


}