// Set up
                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
//Importing Models
var Clients = require('./models/clients.model.js');
var pipeline = require('./models/pipeline.model.js');
var AgingReports = require('./models/agingReports.model.js');
var ClosingRatio = require('./models/closingRatio.model.js');

//Changing This order might affect the rendering 
var express  = require('express');
var app      = express();
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)\
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var expressValidator = require('express-validator');

//JWT
var jwt = require('jsonwebtoken');
//var expressJwt = require('express-jwt');
var config = require('./config'); // get our config file

//var router = express.Router();              // get an instance of the express Router


//Connecting to mongoose 
mongoose.connect(config.database);


//setting the dynamic port
app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/public'));


//app.use(expressJwt({secret: config.secret}).unless({path: ['/login','/authenticate','/api/pipeline']}))
//app.set('superSecret', config.secret); // secret variable
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(expressValidator());
app.use(methodOverride());
app.use(cors());



//Solves CROSS errors
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Routes



    /*************************************************************************************
     * Authentificating the user
    *************************************************************************************/

app.get('/authenticate', function(req, res) {
  // request received from Ionic Auth
  var mySharedSecret = config.secret;
  var redirectUri = req.query.redirect_uri;
  var state = req.query.state;

  try {
    var incomingToken = jwt.verify(req.query.token, mySharedSecret);
  } catch (ex) { // lots of stuff can go wrong while decoding the jwt
    console.error(ex.stack);
    return res.status(401).send('jwt error');
  }

  // TODO: Authenticate your own real users here
  var username = incomingToken.data.username;
  var password = incomingToken.data.password;
  var user_id;
  if (username == 'dan' && password == '123') {
    user_id = 'user-from-express';
  }

  // authentication failure
  if (!user_id) {
    return res.status(401).send('auth error');
  }

  // make the outgoing token, which is sent back to Ionic Auth
  var outgoingToken = jwt.sign({"user_id": user_id}, mySharedSecret);
  var url = redirectUri +
    '&token=' + encodeURIComponent(outgoingToken) +
    '&state=' + encodeURIComponent(state) +
    // TODO: Take out the redirect_uri parameter before production
    '&redirect_uri=' + 'https://api.ionic.io/auth/integrations/custom/success';

  return res.redirect(url);
});

 
    /*************************************************************************************
     * GETs all the leads in the pipeline collection and populates the idpeople field*****
    *************************************************************************************/
    app.get('/api/pipeline', function(req, res) {
  
        pipeline.find({"currentStatus" : "In progress"}).populate('_idPeople').exec(function(err,result){
                if(err){
                    res.send(err)
                }else{
                    res.json(result);   
                }
            });
    });

    /*************************************************************************************
     * GET aging reports******************************************************************
    *************************************************************************************/
    app.get('/api/agingReports', function(req, res) {
  
        AgingReports.find({}).populate('_idCustomer _idSalesRep _idCurrentSubContractor').exec(function(err,result){
                if(err){
                    res.send(err)
                }else{
                    res.json(result);   
                }
            });
    });

    /*************************************************************************************
     * GET closing ratio******************************************************************
     */
    app.get('/api/closingRatio', function(req, res) {
  
        ClosingRatio.find({}).populate('_idCustomer').exec(function(err,result){
                if(err){
                    res.send(err)
                }else{
                    console.log(result);
                    res.json(result);   
                }
            });
    });

     /*************************************************************************************
     * GETs the total number of leads per SALES REP and quarters
     *************************************************************************************/
        app.get('/api/closingRatio/totalQuarterSalesRep', function(req, res) {

        var newId = new mongoose.mongo.ObjectId(req.query.id);
        // use mongoose to get all reviews in the database
        var totalLeads = 0;
        var year = req.query.year;
        var global = {};
        var objClosingRatio = [];
        var quardersMatrix =[
            {
                startDate: new Date(year + "-01-01T00:00:00.767Z"),
                endDate: new Date(year + "-03-31T00:00:00.767Z")
            },
            {
                startDate: new Date(year + "-04-01T00:00:00.767Z"),
                endDate: new Date(year + "-06-30T00:00:00.767Z")
            },
            {
                startDate: new Date(year + "-07-01T00:00:00.767Z"),
                endDate: new Date(year + "-09-30T00:00:00.767Z")
            },
            {
                startDate: new Date(year + "-10-01T00:00:00.767Z"),
                endDate: new Date(year + "-12-31T00:00:00.767Z")
            }
        ];
        var count = 1;
        quardersMatrix.forEach(function(quarter) {
            ClosingRatio.aggregate([
                { $match: { _idCustomer: newId,createdAt: { $gte: quarter.startDate, $lte: quarter.endDate}}}
                ,{ $group : {
                    _id:{status: "$status"},
                    count: { $sum: 1 },
                }}   
        ],function(err, client) {
                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                    if (err)
                        res.send(err)
                    //res.json(client); // return all reviews in JSON format
                    var obj = [];
                    var templateObject ={sold: {name: "Sold", count: 0}, didNotBuy: {name: "Didn't buy", count: 0}, inProgress: {name: "In progress", count: 0}, totalLeads: {count: 0}, closingRatio: {count: 0}};
                    var countElements = 0;
                    var totalLeads = 0;
                    client.forEach(function(element) {
                        switch (element._id.status) {
                            case "Sold":
                                templateObject.sold.count = element.count;
                                break;
                            case "Didn't buy":
                                templateObject.didNotBuy.count = element.count;
                                break;
                            case "In progress":
                                templateObject.inProgress.count = element.count;
                                break;
                            default:
                                break;
                        }
                        if(countElements < 1){
                            objClosingRatio.push(templateObject);
                        }
                        countElements++;

                    }, this);
                    if(count === 4){
                        console.log(objClosingRatio);
                        res.json(objClosingRatio); 
                    }
                    count++;
                });
        }, this);
        });
 
    /*************************************************************************************
     * GETs the total number of leads per SALES REP and quarters
     *************************************************************************************/
        app.get('/api/closingRatio/totalQuarterCompany/:year', function(req, res) {

        // use mongoose to get all 
        var totalLeads = 0;
        var year = req.params.year;
        var global = {};
        var objClosingRatio = [];
        var quardersMatrix =[
            {
                startDate: new Date(year + "-01-01T00:00:00.767Z"),
                endDate: new Date(year + "-03-31T00:00:00.767Z")
            },
            {
                startDate: new Date(year + "-04-01T00:00:00.767Z"),
                endDate: new Date(year + "-06-30T00:00:00.767Z")
            },
            {
                startDate: new Date(year + "-07-01T00:00:00.767Z"),
                endDate: new Date(year + "-09-30T00:00:00.767Z")
            },
            {
                startDate: new Date(year + "-10-01T00:00:00.767Z"),
                endDate: new Date(year + "-12-31T00:00:00.767Z")
            }
        ];
        var count = 1;
        quardersMatrix.forEach(function(quarter) {
            ClosingRatio.aggregate([
                { $match: { createdAt: {$gte: quarter.startDate, $lte: quarter.endDate}}}
                ,{ $group : {
                    _id:{status: "$status"},
                    count: { $sum: 1 },
                }}   
        ],function(err, client) {
                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                    if (err)
                        res.send(err)
                    //res.json(client); // return all reviews in JSON format
                    var obj = [];
                    var templateObject ={sold: {name: "Sold", count: 0}, didNotBuy: {name: "Didn't buy", count: 0}, inProgress: {name: "In progress", count: 0}, totalLeads: {count: 0}, closingRatio: {count: 0}};
                    var countElements = 0;
                    var totalLeads = 0;
                    client.forEach(function(element) {
                        switch (element._id.status) {
                            case "Sold":
                                templateObject.sold.count = element.count;
                                break;
                            case "Didn't buy":
                                templateObject.didNotBuy.count = element.count;
                                break;
                            case "In progress":
                                templateObject.inProgress.count = element.count;
                                break;
                            default:
                                break;
                        }
                        if(countElements < 1){
                            objClosingRatio.push(templateObject);
                        }
                        countElements++;

                    }, this);
                    if(count === 4){
                        console.log(objClosingRatio);
                        res.json(objClosingRatio); 
                    }
                    count++;
                });
        }, this);
        });
 

   
    /*************************************************************************************
     * GETs one lead in the pipeline collection and populates the idpeople field**********
     *************************************************************************************/
    app.get('/api/pipeline/one', function(req, res) {
  
        pipeline.find({}).populate('_idPeople').exec(function(err,result){
                if(err){
                    res.send(err)
                }else{
                    console.log(result,"consoling result");
                    res.json(result);
                    
                }
            });
    });

    /*************************************************************************************
     * GETs one client in the clients collection and populates the idpeople field*****
     *************************************************************************************/
    app.get('/api/clients/one', function(req, res) {
  
        // use mongoose to get all reviews in the database
        Clients.findOne(function(err, client) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.json({error: true, message: 'testing'})
            res.json(client); // return all reviews in JSON format
        });
    });

    /*************************************************************************************
     * Inserts a client*****
     *************************************************************************************/
    app.post('/api/clients', function(req, res) {
        // create a review, information comes from request from Ionic
        Clients.create({
            firstName: req.body.firstName,
            middleName : req.body.lastName,
            lastName :req.body.middleName,
            zipCode: req.body.zip,
            primaryPhoneNumber: {
                number: req.body.primaryPhoneNumber.number,
                carrier: req.body.primaryPhoneNumber.carrier,
                countryCode: req.body.primaryPhoneNumber.countryCode,
                areaCode: req.body.primaryPhoneNumber.areaCode,
            }, 
        }, function(err, client) {
            if (err)
                res.send(err);
 
            // get and return all the clients after you create it
            Clients.find(function(err, clients) {
                if (err)
                    res.send(err)
                res.json(clients);
            });
        });
    });

    /*************************************************************************************
     *POSTS / chnages the status of the lead *****
     *************************************************************************************/
    app.put('/api/pipeline/updateStatus', function(req, res) {

        new pipeline({"currentStatus": req.body.status}).validate(function(error){
            if(!error){
                // Update status of the pipeline
                pipeline.update({
                    _id: req.body._id },
                    { $set: { 
                        currentStatus: req.body.status,
                        currentStatusNote: req.body.statusNote
                    },
                    },function(err,pipeline){
                    if(err){
                        res.status(500).send({error: 'error changing the status'});
                    }else{
                        res.json(pipeline);
                    }
                });    
            }else{
                console.log(error);
                res.status(500).send({status:"error", error: error})
            }
        });
    });


    /*************************************************************************************
     *Inserts create a new lead*****
     *************************************************************************************/
    app.post('/api/pipeline', function(req, res) {
        var insert  = new pipeline({
            _idPeople: "580824ce4111e31428dabebd",
            sector: "Agrario",
            marketing:{
                source: "Realtor",
                extraSource: "5807a86bf8d0c52d78d5140d"
            },
            address:{
                street:"500 N 200 E",
                apt:"5",
                zipCode:"84606",
                city:"PROVO",
                state:"UT",
                country:"USA",
            },
            lastNote: "Customer was not home",
            notesHistory:[{
                note: "Customer was not home",
            }],
            jobType: "RI",
            currentStatus:"In progress",
            lastModifiedBy:"5807a86bf8d0c52d78d5140d", 
            statusHistory:[{
                status:"In progress",
                notes:"Was not home",
                modifiedBy: "5807a86bf8d0c52d78d5140d"
            }],
            currentAssignedTo: {
                _id:"5807a86bf8d0c52d78d5140d"
            },
            assignedToHistory:[{
                _id:"5807a86bf8d0c52d78d5140d"
            }],
            currentAssignedBy:{
                _id:"5807a86bf8d0c52d78d5140d"
            },
            assignedByHistory:[{
                _id:"5807a86bf8d0c52d78d5140d"
            }]

        })

        insert.save(function(err){
            if(err)
             console.log(err)
            pipeline.find({}).populate('_idPeople').exec(function(err,result){
                if(err){

                }else{
                    console.log(result);
                }
            });
        });
    });


/*************************************************************************************
     * GETs personal info*****
     *************************************************************************************/
    app.get('/api/personalinfo', function(req, res) {
        // use mongoose to get all reviews in the database
        Clients.findOne({"_id":  new mongoose.mongo.ObjectId("5807a86bf8d0c52d78d5140d")},{ primaryEmailAddress: 1, primaryPhoneNumber: 1, primaryAddresse: 1},function(err, client) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            res.json(client); // return all reviews in JSON format
        });
    });

    app.put('/api/personalinfo/updateemail/:id', function(req, res) {
        new Clients({"primaryEmailAddress": req.body.email,"primaryPhoneNumber.number": 123456789}).validate(function(error){
            if(!error){
                // use mongoose to get all reviews in the database
                Clients.update({"_id":  new mongoose.mongo.ObjectId(req.params.id)},
                {$set:{"primaryEmailAddress": req.body.email}}
                ,function(err, client) {
                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                    if (err)
                        res.status(500).send({error: 'error updating email'});
                    res.json(client); // return all reviews in JSON format
                });     
            }else{
                console.log(error);
                res.status(500).send({status:"error", error: error})
            }
        });
    });


    app.put('/api/personalinfo/updatephonenumber/:id', function(req, res) {
        console.log(req.body);
        new Clients({"primaryPhoneNumber.number": req.body.phone}).validate(function(error){
            if(!error){
                Clients.update({"_id":  new mongoose.mongo.ObjectId(req.params.id)},
                    {$set:{"primaryPhoneNumber.number": req.body.phone, 
                        "primaryPhoneNumber.countryCode": req.body.countryCode,
                        "primaryPhoneNumber.carrier":req.body.carrier}}
                    ,function(err, client) {
                        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                        if (err)
                            res.status(500).send({status:"error", message: err.message, error: err})
                        res.json(client); // return the response
                });
            }else{
                res.status(500).send({status:"error", error: error})
            }
        });
    });

    app.put('/api/personalinfo/updateaddress/:id', function(req, res) {
        console.log(req.body);
        // use mongoose to get all reviews in the database
        Clients.update({"_id":  new mongoose.mongo.ObjectId(req.params.id)},
        {$set:{"primaryAddress.zip": req.body.zip, 
            "primaryAddress.country": req.body.country,
            "primaryAddress.state":req.body.state,
            "primaryAddress.city": req.body.city,
            "primaryAddress.address": req.body.address}}
        ,function(err, client) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.status(500).send({status:"error", message: err.message, error: err})
            res.json(client); // return all reviews in JSON format
        });
    });


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    //app.get('/login', function(req, res) {
      //      var token = jwt.sign({user: 'Alex'}, app.get('superSecret'));
        //    res.json({ message: 'hooray! with token!', token: token });
   /// });


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});