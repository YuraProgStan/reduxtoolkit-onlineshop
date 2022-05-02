const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 5500;



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.resolve(__dirname,'static','images')));
app.use(fileUpload({}));
app.post('/api',(req,res)=>{
    try {
        const pathYear = path.join(__dirname, 'static','images',String(new Date().getFullYear()));
        const pathMonth = path.join(__dirname,'static','images',String(new Date().getFullYear()),String(new Date().getMonth()));
        if(!fs.existsSync(pathYear)){
            fs.mkdirSync(pathYear);
        }
        if(!fs.existsSync(pathMonth)){
            fs.mkdirSync(pathMonth)
        };
        let {name} = req.body;
        const {img} = req.files;
        const reqName = img.name;
        const str = reqName.split('.');
        const data = new Date();
        const dateMonth = String(data.getDate())+String('0'+data.getMonth())+'-';
        const firstName = dateMonth+str[0];
        const fileName = [firstName,str[1]].join('.');
        img.mv(path.join(pathMonth, fileName));
        return res.status(200).json({fileName,name});
    } catch (e) {
       console.log(e)
    }
})
app.get('/api', (req, res) =>{
   return  res.json({text:'Hello'})
})
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))