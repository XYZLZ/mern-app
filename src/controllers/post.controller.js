import Post from '../models/Post.js' 



// * encontrar todas las tareas => task.routes
const findAllPost = async(req, res) => {
    try {
        const {limit = 5, page = 1} = req.query
        const posts =  await Post.paginate({owner:req.user._id, isGlobal:false}, {limit, page})
        
        res.json({
            data:posts
        })
    } catch (error) {
        res.status(500).json({
            message:'Somthing goes wrong on the server (findAllTAsk)'
        })
    }
}

// // * crear tarea => task.routes
// const createPost = async(req, res) => {
//     console.log(req.body);
//     const {title, description} = req.body

//     if (!title || !description){
//         return res.status(400).json({
//             message:'datos incorrecrtos favor mandar un title y un description'
//         })
//     }

//     try{
//         const newTask = new Post({...req.body, owner:req.user._id});
    
//         await newTask.save()
//         res.status(201).json({
//             message:'task created',
//             response: newTask
//         })
//     }catch(error){
//         res.status(500).json({
//             message:'Somthing goes wrong on the server (createTask)',
//             error
//         })
//     }
// }



// * encontrar tarea por id => task.routes
const findOnePost = async(req, res) => {
    try {
        const task = await Post.findOne({_id:req.params.id, owner:req.user._id});

        if (!task) {
            return res.status(404).json({message:'task not found'})
        }

        res.json({
            data:task
        })

    }catch(error){
        res.status(500).json({
            message:'Somthing goes wrong on the server (findOneTAsk)',
            error
        })
    }
}




// * buscar tareas => task.routes
const serchPost = async(req, res) => {
    try {
        const task = await Post.paginate({title:req.query.search, owner:req.user._id});

        res.json({
            data:task
        })
    } catch (err) {
        console.log(err);
    }
}


// * actualizar tareas => task.routes
const updatePost = async(req, res) => {
    console.log(req.body);

    const reqFields = Object.keys(req.body);
    const allowedFields = ['title', 'description', 'isCompleted'];

    const result = reqFields.every(key => allowedFields.includes(key));

    if (!result || reqFields.length > allowedFields.length || req.body == {}) {
        return res.status(400).json({message:'invalid update'})
    }

    try {
        const updatedTask = await Post.findOneAndUpdate({_id:req.params.id, owner:req.user._id}, req.body);

        if (!updatedTask) {
            return  res.status(404).json({message:'task not found'});
        }

        res.json({
            message:'Updated successfuly',
            updateted:updatedTask
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:'Somthing goes wrong on the server (updateTask)',
            error
        })
    }
}



export {findAllPost, findOnePost,  updatePost, serchPost}