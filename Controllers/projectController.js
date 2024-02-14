const projects = require('../Models/projectSchema')

//add project logic
exports.addUserProject =async(req,res)=>{
    console.log('inside addUserProject');
    // res.status(200).json("add project")
   // user id get
    const userId = req.payload
    //get add project details
    const {title,language,github,link,overview} = req.body
    //get the image
    projectImage = req.file.filename
    console.log(projectImage);
    //logic of adding new user project
    
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("project already existed")
        }
        else{
            const newProject = new projects({title,language,github,link,overview,projectImage,userId})
            await newProject.save() //save new project details into mongodb
            res.status(200).json(newProject) //send response to the client
        }
    }
    catch(err){
        res.status(200).json({message:err.message})
    }
}

//get user project
exports.getUserProject=async(req,res)=>{
//get user id
const userId= req.payload
//api request
try{
//get info of particular user
const userProject=await projects.find({userId})
console.log(userProject);
res.status(200).json(userProject)
}
catch(err){
res.status(401).json(err.message)
}

}

//get all projects
exports.getAllProjects = async(req,res)=>{
    const searchKey=req.query.search
    const query={
        language:{
            $regex:searchKey,
            $options:"i"
        }
    }

try{
const Allprojects = await projects.find(query)
res.status(200).json(Allprojects)
}
catch(err){
res.status(401).json(err.message)
}

}

//get home projects
exports.getHomeProject = async(req,res)=>{
try{
const HomeProject = await projects.find().limit(3)
res.status(200).json(HomeProject)
}
catch(err){
res.status(401).json(err.message)
}


}

//edit project details
exports.editproject = async(req,res)=>{
    const {title,language,github,link,overview,projectImage}=req.body;
    const uploadImage = req.file?req.file.filename:projectImage;
    const userId= req.payload
    const {id}= req.params
    try{
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,link,overview,projectImage:uploadImage,userId},{new:true})

        await updateProject.save()

        res.status(200).json(updateProject)

    }
    catch(err){
        res.status(401).json(err)
    }
}

//delete project
exports.deleteProject = async(req,res)=> {
    const{pid}=req.params
try{
    const deleteData = await projects.findByIdAndDelete({_id:pid})
    res.status(200).json(deleteData)
}
catch(err){
    res.status(401).json(err)
}
}

