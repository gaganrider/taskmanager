var express = require("express");
var router = express.Router();
var validator = require("email-validator");
const validatePhoneNumber = require("validate-phone-number-node-js");
const User = require("../models/userModel");
const Excel = require('exceljs');



/* GET home page. */
router.get('/',async(req, res, next)=>{
  const docs= await User.find({});
  res.render('index',{title:'',data:docs})
});

router.post('/',(req, res, next)=>{
  if (validator.validate(req.body.email)&&validatePhoneNumber.validate(req.body.phone)){
    User.create(req.body)
    res.redirect("/") 
  }
 else{
  res.send('invalid credentials')
 }
});
// ===================================================================
router.get('/user',async(req, res, next)=>{
  res.render('user',{title:''})
});

router.post('/user',(req, res, next)=>{
  User.create(req.body)
    res.redirect("/") 
});
// ======================================================================
router.get('/task',async(req, res, next)=>{
  const docs= await User.find({});
  res.render('task',{title:'',data:docs})
});

router.post('/task',async (req, res, next)=>{
 const doc= await User.findOne({name:req.body.name})
    doc.task.push({task:req.body.task,status:req.body.status})
    await doc.save()
    res.redirect("/") 
});
// ====================================================
router.get('/user/:id',async(req, res, next)=>{
  const docs= await User.find({_id:req.params.id});
  console.log(docs[0].task)
  res.render('user',{title:'user',user:docs[0], task:docs[0].task})
});
// ========================================================
router.get('/excel',async(req, res, next)=>{
  const docs= await User.find({});
  const workbook = new Excel.Workbook();
    const workbook2 = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Users');
    const worksheet2 = workbook2.addWorksheet('tasks');
    worksheet.columns = [
      { header: 'Sr.no', key: 's_no', width: 10 },
      { header: 'Name', key: 'name', width: 10 },
      { header: 'Email', key: 'email', width: 10 },
    ];
    worksheet2.columns = [
      { header: 'Sr.no', key: 's_no' },
      { header: 'Name', key: 'name' },
      { header: 'Task', key: 'status' },
    ];


    let count = 1;
    docs.forEach((user) => {
      user.s_no = count;
      worksheet.addRow(user);
      count++;
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        workbook.xlsx.writeFile('users.xlsx')
      })
    })
      let tag = 1;
      docs.forEach((data) => {
        data.task.forEach((list)=>{
          list.s_no = tag;
          worksheet2.addRow(list);
          tag++;
          worksheet2.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
            workbook2.xlsx.writeFile('task.xlsx')
        })
        })
      })
      res.send('<h1>Done</h1><a href="/">Go back</a>')
    
});
module.exports = router;
