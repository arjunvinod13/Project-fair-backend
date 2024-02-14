const multer = require('multer')

//to store multer data
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    //create a new file name for images
    filename:(req,file,callback)=>{
        const filename=`image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

//filter
const filefilter = (req,file,callback)=>{
    const allowedMimeTypes = ['image/png' , 'image/jpeg' , 'image/jpg']

    if(allowedMimeTypes.includes(file.mimetype)){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error('invalid file type...'))
    }
}

const multerConfig = multer({
    storage,filefilter
})
module.exports=multerConfig
