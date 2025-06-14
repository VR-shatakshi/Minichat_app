const express = require("express");
const app     = express ();
const mongoose = require("mongoose");
const path    = require("path");
const chat    = require("./models/chat.js");
const methodoverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride ("_method"));

main ()
.then((res)=>{
    console.log("connection is successful");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/chatapp");
}

app.get(("/"),(req,res)=>{
      res.send("root is working");
});

app.get("/chats", async(req,res)=>{
    let chats= await chat.find();
   console.log(chats);
    res.render("index.ejs", {chats});
});

app.get("/chats/new",(req,res)=>{
       res.render("new.ejs");
});

app.post("/chats", (req,res)=>{
     let{from , to , msg}= req.body;

     let newchat = new chat ({
          from : from , 
          to : to , 
          msg :msg ,
          created_date: new Date(),
     });

     newchat.save()
     .then ((res)=>{
        console.log("chat was saved");
     })
     .catch((err)=>{
        console.log(err);
     })

     res.redirect("/chats");
});


app.get("/chats/:id/edit", async (req,res)=> {
      let { id }= req.params;
      let chats = await chat.findById(id);
      res.render("edit.ejs", {chats});
});




/*app.put("/chats/:id" , async (req,res)=>{
    let { id }= req.params;
    
    let { msg :newmsg } = req.body;
     
    let updatechat = await chat.findByIdAndUpdate(
        id,
        {msg : newmsg },
        {runValidators : true , new :true },
    );

    console.log(updatechat);
    res.redirect("/chats");
});*/

app.delete("/chats/:id", async(req,res)=>{
       let { id } = req.params ;
       id = id.trim();
       let deletedchats= await chat.findByIdAndDelete(id);
       console.log(deletedchats);
       res.redirect("/chats");

});

app.listen(8080, ()=>{
    console.log("server is listening on port 8080");
});