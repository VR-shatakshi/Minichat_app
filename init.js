const mongoose = require("mongoose");
const chat    = require("./models/chat.js");

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

let allchats = [
    {
        from: "shatakshi ",
        to  : "priya",
        msg : "priya ! how are you ?",
        created_date:new Date(),
         },

         {
            from: "shatakhi ",
            to  : "shayam",
            msg : "khelne aa raha kiya aaj ?",
            created_date:new Date(),
             },
             
             {
                from: "shatakshi",
                to  : "swara",
                msg : "result kaisa aya kal?",
                created_date:new Date(),
            },
];

chat.insertMany(allchats);