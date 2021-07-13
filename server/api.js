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
                    console.log('/register req --', req.body, '/register err --', err, '/register data --', data);
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
            console.log('/login req --', req.body, '/login data --', user);
            res.send({ 'status': 200, 'message': '登录成功', 'data': { token: token, _id: user[0]._id } });
        })
})

app.post("/editUser", function (req, res) {
    const hashPwd = bcrypt.hashSync(req.body.new_password, 10)
    models.User.updateOne({ _id: req.body._id }, { username: req.body.username, password: hashPwd }, function (err, data) {
        console.log("/editUser req ---", req.body, '/editUser err ---', err, '/editUser data ---', data);
        if (err) {
            res.send({ 'status': 401, 'message': '重置密码失败', 'error': err });
        } else {
            res.send({ 'status': 200, 'message': '重置密码成功' });
        }
    })
})

app.post("/lists", jwtCheck, function (req, res) {
    models.List
        .find({
            year: req.body.year,
        })
        .sort({ month: 1 })
        .then((data) => {
            console.log('/lists data ---', data);
            res.send(data)
        })
})

app.post("/list/add", jwtCheck, function (req, res) {
    models.List
        .find({
            year: req.body.year,
            month: req.body.month,
        }).then(data => {
            if (data.length > 0) {
                res.send({ 'status': 412, 'message': '添加失败，数据已存在，禁止重复' });
            } else {
                req.body.action = 'view'
                models.List(req.body).save((err, data) => {
                    console.log("/list/add req ---", req.body, '/list/add err ---', err, '/list/add data ---', data);
                    if (err) {
                        res.send({ 'status': 401, 'message': '添加失败', 'error': err });
                    } else {
                        res.send({ 'status': 200, 'message': '添加成功', data: { _id: data._id } });
                    }
                });
            }
        })
})

app.post("/list/edit", jwtCheck, function (req, res) {
    models.List
        .find({
            year: req.body.year,
            month: req.body.month,
        }).then(data => {
            if (data.length > 0) {
                if (data[0]._id != req.body._id) {
                    res.send({ 'status': 412, 'message': '编辑失败，数据已存在，禁止重复' });
                    return
                }
            }
            req.body.action = 'view'
            models.List.updateOne({
                _id: req.body._id
            }, req.body, function (err, data) {
                console.log("/list/edit req ---", req.body, '/list/edit err ---', err, '/list/edit data ---', data);
                if (err) {
                    res.send({ 'status': 401, 'message': '编辑失败', 'error': err });
                } else {
                    res.send({ 'status': 200, 'message': '编辑成功', data: { _id: req.body._id } });
                }
            })

        })
})

app.post("/list/delete", jwtCheck, function (req, res) {
    models.List
        .deleteOne({
            _id: req.body.id
        }).then(data => {
            console.log('/list/delete ---', data);
            if (data.ok == 0) {
                res.send({ 'status': 401, 'message': '删除失败', 'error': data });
            } else {
                res.send({ 'status': 200, 'message': '删除成功' });
            }
        })
})

module.exports = app;
