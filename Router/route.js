//define all paths here

//1 import express
const express=require('express')

//import usercontroller
const userController = require('../Controllers/userController')
const projectController=require('../Controllers/projectController')
const jwtMiddleware=require('../middleware/jwtMiddleware')
 
const multerConfig = require('../middleware/multerMiddleware')

//create a router object of express to define paths
const router=new express.Router()

//register api routes-url/register
router.post('/register',userController.register)

//login route
router.post('/login',userController.login)



//add user project api
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)

//get user project api routes
router.get('/project/all-user-projects',jwtMiddleware,
projectController.getUserProject)

//get all project routes
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

//get home page routes
router.get('/project/home-projects',projectController.getHomeProject)

//update project routes
router.put('/project/update-project/:id',jwtMiddleware,multerConfig.single('projectImage'), projectController.editproject)

//delete project routes
router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject)



module.exports=router