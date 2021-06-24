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
        .then(user => {
            if (user.length > 0) {
                res.send({ 'status': 403, 'message': '该用户名已经注册' });
            } else {
                const hashPwd = bcrypt.hashSync(req.body.password, 10)
                let newUser = models.User({
                    username: req.body.username,
                    password: hashPwd
                });
                newUser.save((err, data) => {
                    console.log('err --', err, 'data --', data);
                    if (err) {
                        res.send({ 'status': 401, 'message': '注册失败', 'error': err });
                    } else {
                        res.send({ 'status': 200, 'message': '注册成功' });
                    }
                });
            }
        })
})

app.post("/login", function (req, res) {
    models.User
        .find({
            username: req.body.username,
        })
        .then((user) => {
            if (user.length <= 0) {
                res.send({ 'status': 416, 'message': '用户未注册' });
                return
            }
            const isPwdValid = bcrypt.compareSync(req.body.password, user[0].password)
            if (!isPwdValid) {
                res.send({ 'status': 401, 'message': '密码错误' });
                return
            }
            const token = jwtSign({ _id: user[0]._id })
            res.send({ 'status': 200, 'message': '登录成功', 'data': { token: token, _id: user[0]._id } });
        })
})

app.post("/lists", jwtCheck, function (req, res) {
    models.List
        .find({
            year: req.body.year,
        })
        .then((datas) => {
            console.log('user lists reqqqqqqqqqqq -------------', req.query);
            console.log('user lists res -------------', datas);
            res.json(datas)
        })
})


app.post("/list/save", jwtCheck, function (req, res) {
    models.List
        .find({
            year: req.body.year,
            month: req.body.data.month,
        }).then(data => {
            if (data.length > 0) {    //edit
                console.log('edit !!!!!!!');
                models.List.updateOne({
                    year: Number(req.body.year),
                    month: Number(req.body.month),
                })
            } else {      //add
                console.log('add !!!!!!!');
                let temp = models.List({
                    year: req.body.year,
                    month: req.body.data.month,
                    realSalary: req.body.data.realSalary,
                    rent: req.body.data.rent,
                    utilities: req.body.data.utilities,
                    shop: req.body.data.shop,
                    deposit: req.body.data.deposit,
                    remark: req.body.data.remark,
                    action: req.body.data.action,
                })
                temp.save((err, data) => {
                    console.log('err --', err, 'data --', data);
                    if (err) {
                        res.send({ 'status': 401, 'message': '添加失败', 'error': err });
                    } else {
                        res.send({ 'status': 200, 'message': '添加成功' });
                    }
                });
            }
        })
        .save({
            year: Number(req.body.year),
            month: Number(req.body.month),
        })
        .then((data) => {
            console.log('user lists reqqqqqqqqqqq -------------', req.body);
            console.log('user lists res -------------', data);
            res.json(data)
        })
})
module.exports = app;
