const mongoose = require('mongoose');

async function connect (){
    try {
        await mongoose.connect('mongodb://127.0.0.1/Assigment'
        );
        console.log("connect succesfully");
    } catch (error) {
        console.log("connect failure");
    }

}
module.exports = {connect};
