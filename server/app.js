//mongodb+srv://vishnu:sruthi2001@@cluster0.obi7g.mongodb.net/test



const express =require("express");
const cors =require("cors");
const mongoose =require( 'mongoose');
var bodyParser = require('body-parser');
const http = require("http")
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb+srv://vishnu:sruthi2001@@cluster0.obi7g.mongodb.net/test",{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
		})
		

require("./models/User")
const {Room}=require("./models/Rooms")
// Room.collection.dropIndexes();
const  authRoutes =require("./routes/authRoutes.js")
const roomRoutes=require("./routes/roomRoutes");
const app = express()


const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})
io.on("connection", (socket) => {
	console.log("hiiiiiiii")
	socket.emit("me", socket.id)

	
	socket.on('message', ({ name, message }) => {
		io.emit('message', { name, message })
	  })

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		//io.to means the person we want to call and we send the data of that person
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})

	socket.on("chat",function(data){
		console.log(data)
		io.sockets.emit('chat',data);
	})


})





app.use(cors());
app.use(express.json())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));




app.use(express.static('images'));
app.use(authRoutes)
app.use("/api/rooms",roomRoutes)
app.use('/uploads', express.static('uploads'));
app.get('/', (req,res) => {
    res.send('API is running....')
})


const PORT = 5000
server.listen(
    PORT,
    console.log("port listens at 5000")
)

