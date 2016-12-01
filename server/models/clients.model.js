var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//model and schema of the clients collection
//It guarantees the structure and definition of the collection
var clientsSchema = new Schema({
    firstName:{ type: String, required: false, unique: false },
    middleName:{ type: String, required: false, unique: false },
    lastName:{ type: String, required: false, unique: false },
    gender:{ type: String, required: false, unique: false },
    race:{ type: String, required: false, unique: false },
    primaryPhoneNumber: {
          number:{ type: String, required: true, unique: false,validate: {
          validator: function(val) {
            return /^[0-9]*$/.test(val);
          },
          message: '{VALUE} is not a valid phone number!'
        }
     },
          carrier: { type: String, required: false, unique: false },
            countryCode: { type: String, required: false, unique: false,validate: {
            validator: function(val) {
                return /^[0-9]*$/.test(val);
            },
            message: '{VALUE} is not a valid country code!'
            }
        },
          areaCode: { type: String, required: false, unique: false,validate: {
            validator: function(val) {
                return /^[0-9]*$/.test(val);
            },
            message: '{VALUE} is not a valid area code!'
            }
         }
    }, 
    otherPhoneNumbers: [{
          number:{ type: Number, required: false, unique: false },
          carrier: { type: String, required: false, unique: false },
          countryCode: { type: String, required: false, unique: false },
          areaCode: { type: String, required: false, unique: false }
    }],
    primaryAddress:{
          address: { type: String, required: false, unique: false },
          apt: { type: String, required: false, unique: false },
          zip: { type: String, required: false, unique: false },
          city: { type: String, required: false, unique: false },
          state: { type: String, required: false, unique: false },
          country: { type: String, required: false, unique: false }
      },
    otherAddresses:[{
          address: { type: String, required: false, unique: false },
          apt: { type: String, required: false, unique: false },
          Zip: { type: String, required: false, unique: false },
          City: { type: String, required: false, unique: false },
          State: { type: String, required: false, unique: false },
          Country: { type: String, required: false, unique: false }
    }],
    primaryEmailAddress: {
    type: String,
    validate: function(email) {
      return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    }
  },
    emailAddresses:[{
        email: { type: String, required: false, unique: false }
    }],
    trade:[{ type: String, required: false, unique: false }]

});

//It should be singular because mongoose makes it plural
var Clients = mongoose.model('Client', clientsSchema);

module.exports = Clients;