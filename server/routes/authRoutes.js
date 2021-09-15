
const  express =require( 'express');
const User =require( '../models/User.js')
const jwt =require( 'jsonwebtoken');
const mailer=require("nodemailer");

const handleErrors=(err)=>{

let errors={name:'',email:'',person:'',password:''};
if (err.code===11000)
{
    errors.email="That email is already registered";
    return errors;
}
 
if(error.message=== "Incorrect email")
{
error.email="Incorrect email"
}

if(error.message=== "Incorrect password")
{
error.email="Incorrect password"
}
if(err.message.includes('user validation failed'))
{
   Object.values(err.errors).forEach(error=>{
      errors[error.properties.path]=error.properties.message;

   })
}

return errors;
}
const maxAge=3*24*60*60;
const createToken=(id)=>{
    return jwt.sign({id},'Eadgroup0120202021',{
        expiresIn:maxAge
    });
}

const router=express.Router();




router.post('/signup',async (req,res)=>{
const {name,email,person,password}=req.body;
console.log("dndjd")

try{
    const user=await User.create({name,email,person,password});
    const token=createToken(user._id);
    
   
            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
          
            
            res.status(201).json({name:user.name});
            

}
    

catch(err)
{
   const errors= handleErrors(err);
   res.status(400).json({errors});
    
}
});


router.post('/addtowatch',  (req, res) => {
    console.log("gjkdf")
    console.log(req.body)
    User.findOne({ _id: req.body._id }, (err, userInfo) => {
        let duplicate = false;

        console.log(userInfo)

        userInfo.watch.forEach((item) => {
            if (item.id == req.query.roomId) {
                duplicate = true;
            }
        })


        if (duplicate) {
           console.log("fddj")
         res.status(200).json(userInfo.watch)
                
            
        } else {
            User.findOneAndUpdate(
                { _id: req.body._id },
                {
                    $push: {
                        watch: {
                            id: req.query.roomId,
                          
                            date: Date.now()
                        }
                    }
                },
             
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    console.log("hi")
                    res.status(200).json(userInfo.watch)
                }
            )
        }
    })
});


router.post('/removetowatch',async(req,res)=>{

    console.log("dsfjj")
    console.log(req.body._id);
    console.log(req.query.roomId);
    //console.log(User.findOne({ _id: req.body._id }))
    const vis=await User.findOne({_id:req.body._id});
    console.log(vis.watch)
    const abc=vis.watch.filter(item=>item.id!=req.query.roomId);
    vis.watch=abc;
    vis.save();
    console.log(vis)
    res.status(200).json(vis.watch)

})


router.post('/login',async (req,res)=>{
    const {name,password}=req.body;
    console.log(name,password);
    try{

    const user = await User.login(name,password);
    console.log(user);
   
    const token=createToken(user._id);
    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});

    res.status(200).json({id:user._id,token:token,name:name});

    
    
}
    catch(err)
    {
        console.log(err)
//         const errors=handleErrors(err);
// res.status(400).json({errors});
    }
    })

router.post("/contact",async(req,res)=>{
console.log(req.body);
var transport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "gvishnuvardhan01@gmail.com",
      pass: "Jongkook@2001",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  
  var mailOptions = {
    from: "gvishnuvardhan01@gmail.com",
    to: req.body.email,
    subject: req.body.subject,
   
    html:
    "<h4> Hi I am interested in your house . Here are my details name :"+req.body.name+" email :"+req.body.useremail+
      '</h4><p>' +
      req.body.message +
      '</p>',
  };
  return transport.sendMail(
    mailOptions,
    function (email_err, email_data) {
      if (email_err) {
        
      } else {
        
        res.send("sent succesfully");
      }
    }
  );

})

router.get('/:id',async(req,res)=>{
    try{
    const user=await User.findById(req.params.id);
    if(user)
    {
    res.json(user);
    }
    else{
        res.send("No such user");
    }
}catch(err)
{
    // console.log(err);
}
})





module.exports=router