const express = require('express')
const router = express.Router()
const conn = require('../mariadb')

router.use(express.json())

//회원가입
router.post('/users' , (req,res) => {
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

//개별회원조회

//회원탈퇴

module.exports = router