const express = require("express")

const TodoModel=require("../model/todo.model")

const todoRouter=express.Router()

todoRouter.get("/", async (req, res) => {
    const todos = await TodoModel.find()
    res.send(todos)
})

todoRouter.post("/create",async(req,res)=>{
    const payload=req.body
    
    try{
        const newtodo=new TodoModel(payload)
        await newtodo.save()
        res.send({"msg" : "todo created successfully"})
    } catch(err){
        console.log(err)
        res.send({"err" : "Something went wrong"})
    }
})
todoRouter.patch("/update/:todoID", async (req, res) => {
    const todoID = req.params.todoID
    
    
   
    
        await TodoModel.findByIdAndUpdate( todoID,{...req.body},{new:true})
        res.send({"msg" : "todo updated successfully"})
    
})

todoRouter.delete("/delete/:todoID", async (req, res) => {
try{
    const todoID = req.params.todoID
    let todo=await TodoModel.findByIdAndDelete(todoID)
    if(todo){
        res.send("Deleted sucessfully")
    }else{
        res.send("todo not found")
    }
}

catch(e){
    res.send(e.message)
}

})

module.exports= todoRouter