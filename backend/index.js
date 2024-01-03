const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.post("/todo", async(req,res) => {
    const createPayLoad = req.body;
    const parsedPayLoad = createTodo.safeParse(createPayLoad);

    if(!parsedPayLoad.success){
        res.status(411).json({
            msg : "You sent the wrong inputs"
        });
        return;
    }

    try{
        await todo.create({
            title: createPayLoad.title,
            description: createPayLoad.description,
            completed: false
        });
         
        res.json({
            msg : "Todo created"
        });
    }catch(e){
        console.log(e);
    }

});

app.get("/todos", async (req,res) => {
   const todos =  await todo.find({});
   res.json({
    todos
   });
});

app.put("/completed", async (req,res) => {
    const updatePayLoad = req.body;
    const parsedPayLoad = updateTodo.safeParse(updatePayLoad);

    if(!parsedPayLoad.success){
        res.status(411).json({
            msg : "You sent the wrong inputs"
        });
        return;
    };

    await todo.updateOne({
        "_id" : req.body.id},
        { $set: { "completed": true } }
    );

    res.json({
        msg : "Todo marked as completed"
    });

});

app.listen(3000);
mongoose.connect("");
