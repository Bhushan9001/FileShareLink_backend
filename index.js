const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const File = require('./fileModel');
require('dotenv').config();
const app = express();
const upload = multer({ dest: 'uploads/' });



app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'))
  .catch((e) => {
    e.message;
  });



app.post('/upload', upload.single('file'), async (req, res) => {
  
    const filedata = {
        path  : req.file.path,
        originalName : req.file.originalname
    }
    if(req.body.password != null && req.body.password !== ""){
        filedata.password = bcrypt.hash(req.body.password,10);
    }

    try {
      const file = await File.create(filedata)
      res.status(200).json({path:`${process.env.BASE_URL}/file/${file._id}`});
      console.log(file);
      
    } catch (err) {
      res.status(500).json({errot:err.message})
      console.log(err.message);
      
    }
    

});
app.get('/file/:id', async(req,res)=>{
  try {
    const file  = await File.findById(req.params.id);
    res.download(file.path,file.originalName);
    
  } catch (err) {
     res.status(500).json({error:err.message});
  }
  

})
app.get('/',(req,res)=>{
    res.send("<h1>I am Inevitable!!</h1>");
})

app.listen(process.env.PORT||3333, () => {
  console.log('Server started on port 3333');
});
