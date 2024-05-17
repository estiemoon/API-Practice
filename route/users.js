const express = require('express');
const conn = require('../mariadb');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();
const router = express.Router();
router.use(express.json());

//회원가입
router.post('/join' , (req,res) => {
    let {name, email, password, nickname, number} = req.body

    if (Object.keys(req.body).length) {
        let sql = `INSERT INTO users (name, email, password, nickname, number) 
        VALUES (?,?,?,?,?)`
        let values = [name, email, password, nickname, number]
        conn.execute(sql, values,
            function (err, results) {
                    res.status(201).json({
                        message : `${name}님 성공적으로 회원가입이 되셨습니다.`
                    })
            }
        )
    } else {
        res.status(400).json({
            message : `잘못된 입력 정보입니다.`
        })
    }

})

//로그인
router.get('/login', (req,res) => {
    let {email, password} = req.body
    let sql = `SELECT * FROM users WHERE email = ?`
    let values = email

    conn.query(sql,values, 
        function(err,results) {
        console.log(results)
        loginUser = results[0]       
        if (loginUser && loginUser.password == password){

            const token = jwt.sign({email : loginUser.name, name : loginUser.name},
                 process.env.PRIVATE_KEY,
                 {expiresIn : "2 days",
                    issuer : "moon"
                 })
            res.cookie('token', token, {httponly:true})

            res.status(200).json({
                message : `${loginUser.name}님 로그인 되셨습니다.`
            })
        } else {
            res.status(400).json({
                message: '아이디가 없거나 비밀번호를 확인해주세요.'
            })
        }
    })
})

//개별회원조회
router.get('/users/:id', (req,res)=>{
    let {id} = req.params
    id = parseInt(id)
    let sql = `SELECT * FROM users WHERE id = ?`
    let values = id

    conn.query(sql,values, 
        function(err,results) {
        curUser = results[0]       
        
        if(curUser){
            res.status(200).json({
                message : `이름 : ${curUser.name} 닉네임: ${curUser.nickname} 전화번호 : ${curUser.number}`
            })
        } else {
            res.status(400).json({
                message: '조회하신 정보가 없습니다.'
            })
        }
    })
})

//회원탈퇴
router.delete('/users/:id', (req,res)=>{
    let {id} = req.params
    id = parseInt(id)
    let sql = `DELETE FROM users WHERE id = ?`
    let values = id

    conn.query(sql,values,
        function (err,results){
            res.status(200).json({
                message: '회원탈퇴가 완료되었습니다.'
            })
        }
    )
})

module.exports = router