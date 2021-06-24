const bcrypt = require('bcrypt')
const express = require('express');
const models = require('./db');
const { jwtSign, jwtCheck } = require('./jwt')

const app = express();
app.get('/', function (req, res) {
    res.send('<h1>hello Nodejs</h1>')
})

app.post("/register", function (req, res) {
    models.User
        .find({
            username: req.body.username
        })
        .then(user=>{
            if(err){
                
              }else{
                
              }
        })
        .catch(err=>{
            // res.send({'status': 416, 'message': '查询失败', 'error_message': err});
        })
})

app.post("/login", function (req, res) {
    models.User
        .find({
            username: req.body.username,
        })
        .then((user) => {
            if (user.length <= 0) {
                res.send({ 'status': 416, 'error_message': '用户未注册' });
            }


            const isPwdValid = bcrypt.compareSync(JSON.stringify(req.body.password), JSON.stringify(user[0].password))
            console.log('isPwdValid', isPwdValid);
            console.log('isPwdValid11', req.body.password, user[0].password);

            console.log('user login reqqqqqqqqqqq -------------', req.body);
            console.log('user login res -------------', user);
            res.json(user)
        })
        .catch((err) => {
            console.log('models.User err ---', err);
        })
})

app.get("/lists", function (req, res) {
    models.List
        .find({
        })
        .then((lists) => {
            console.log('user login reqqqqqqqqqqq -------------', req.body);
            console.log('user login res -------------', lists);
            res.json(lists)
        })
        .catch((err) => {
            console.log('models.List err ---', err);
        })
})

module.exports = app;
