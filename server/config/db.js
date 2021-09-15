const mongoose =require( 'mongoose');

const connectDB = async () => {
    try {
        const conn =  await mongoose.connect("mongodb+srv://vishnu:sruthi2001@@cluster0.obi7g.mongodb.net/test",{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

       console.log("database connected")
    } catch (error) {
        
        process.exit(1)
    }
}
module.exports= connectDB