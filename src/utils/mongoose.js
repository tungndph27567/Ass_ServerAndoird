module.exports = {
    multiMongooseObject : function (mongoose){
        return mongoose.map((mongoose) => mongoose.toObject());
    },
    MongooseObject : function (mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    },

}