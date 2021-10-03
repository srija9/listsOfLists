const CartList = require('../models/cartlist');
const TaskCard = require('../models/taskcard');
const User = require('../models/user');

exports.getLists = async (req, res, next) => {
    try{
        const Lists = await CartList.find()
        .populate('tasks')       

        res.status(200).json({
            message: "Fetched all cards",
            lists: Lists,
            });
        }
        catch (err) {
           if(!err.statusCode) {
               err.statusCode = 500;       
             }
            next(err);
        }   
}

exports.postCard = async (req, res, next) => {
    const title = req.body.title ? req.body.title : " ";
    const card = new CartList({
        title: title,
        tasks: []
    });
    try {
        await card.save();
        //const user = await User.findById(req.userId);
       // user.cartlists.push(card);
       // await user.save();

        let Lists;
        try{
            const List = await CartList.find()
            .populate('tasks')   
            Lists = List;       
         }
         catch (err) {
            if(!err.statusCode) {
                err.statusCode = 500;       
              }
             next(err);
         } 

         res.status(200).json({
            message: "card created",
            lists: Lists,
            });

        }
    catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;       
          }
         next(err);
        }
};

exports.postTask = async (req, res, next) => {
    const cardId = req.params.cardId;
    const title = req.body.title ? req.body.title : "";
    const description = req.body.description ? req.body.description : "";
    
    const task = new TaskCard({
        title: title,
        description: description,
    });

    try {
        await task.save();
        const card = await CartList.findById(cardId);
        card.tasks.push(task);
        await card.save();

        let Lists;
        try{
            const List = await CartList.find()
            .populate('tasks')   
            Lists = List;       
         }
         catch (err) {
            if(!err.statusCode) {
                err.statusCode = 500;       
              }
             next(err);
         } 

        res.status(200).json({
            message: "task created",
            lists: Lists,
        });

    }
    catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;       
          }
         next(err);
        }
};

exports.updateCard = async (req, res, next) => {
    const cardId = req.params.cardId;

    const title = req.body.title;
    try{
        const card = await CartList.findById(cardId);
        card.title = title;
        await card.save();

        let Lists;
        try{
            const List = await CartList.find()
            .populate('tasks')   
            Lists = List;       
         }
         catch (err) {
            if(!err.statusCode) {
                err.statusCode = 500;       
              }
             next(err);
         } 
        
        res.status(200).json({
            message: "card updated",
            lists: Lists,
        });
    }
    catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;       
          }
         next(err);
        }
};

exports.updateTask = async (req, res, next) => {
    //const cardId = req.params.cardId;
    const taskId = req.params.taskId;

    const title = req.body.title;
    const description = req.body.description;
    try{
        const task = await TaskCard.findById(taskId);
        task.title = title;
        task.description = description;
        await task.save();

        let Lists;
        try{
            const List = await CartList.find()
            .populate('tasks')   
            Lists = List;       
         }
         catch (err) {
            if(!err.statusCode) {
                err.statusCode = 500;       
              }
             next(err);
         } 

        res.status(200).json({
            message: "task updated",
            lists: Lists,
        });
    }
    catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;       
          }
         next(err);
        }
};

exports.deleteCard = async (req, res, next) => {
    const cardId = req.params.cardId;
    try{
        //const card = await CartList.findById(cardId);
        
        await CartList.findByIdAndRemove(cardId);
        
        // const user = await User.findById(req.userId);
        // user.cartlists.pull(cardId);
        // await user.save();

        let Lists;
        try{
            const List = await CartList.find()
            .populate('tasks')   
            Lists = List;       
         }
         catch (err) {
            if(!err.statusCode) {
                err.statusCode = 500;       
              }
             next(err);
         } 

        res.status(200).json({
            message: "card deleted",
            lists: Lists,
        });
    }
    catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;       
          }
         next(err);
        }
};

exports.deleteTask = async (req, res, next) => {
    const taskId = req.params.taskId;
    const cardId = req.params.cardId;
    try{
        //const card = await CartList.findById(cardId);
        
        await TaskCard.findByIdAndRemove(taskId);

        const card = await CartList.findById(cardId);
        card.tasks.pull(taskId);
        await card.save();

        let Lists;
        try{
            const List = await CartList.find()
            .populate('tasks')   
            Lists = List;       
         }
         catch (err) {
            if(!err.statusCode) {
                err.statusCode = 500;       
              }
             next(err);
         } 

        res.status(200).json({
            message: "card deleted",
            lists: Lists,
        });
    }
    catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;       
          }
         next(err);
        }
};