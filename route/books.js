const express = require('express')
const router = express.Router()
const conn = require('../mariadb')

//책 등록
router.post('/books', (req,res)=>{
    let {title, author, price, information, user_id} = req.body

    let sql = `INSERT INTO books (name, author, price, description, user_id)
    VALUES (?,?,?,?,?)`
    let values = [title, author, price, information, user_id]

    conn.query(sql, values,
        function (err,results){
            if (results){
                res.status(201).json({
                    message : `${title} 등록이 완료되었습니다.`
                })
            } else {
                res.status(400).json({
                    message: '입력하신 정보를 다시 확인해주세요.'
                })
            }
        }
    )
})

//회원 별 전체 책 조회
router.get('/books', (req,res)=>{
    let {user_id} = req.body
    let sql = `SELECT * FROM books WHERE user_id = ?`
    let values = user_id

    conn.query(sql,values, 
        function(err,results) {
            if (results.length){
                res.status(200).json(results)
            } else {
                res.status(400).json({
                    message : `입력하신 회원의 정보를 다시 확인해주세요.`
                })
            }
    })
})

//개별 책 조회
router.get('/books/:id', (req,res)=>{
    let {id} = req.params
    id = parseInt(id)
    let sql = `SELECT * FROM books WHERE id = ?`
    let values = id

    conn.query(sql,values, 
        function(err,results) {
        curBook = results[0]       
        
        if(curBook){
            res.status(200).json({
                message : `제목 : ${curBook.name} 작가: ${curBook.author} 가격 : ${curBook.price}`
            })
        } else {
            res.status(400).json({
                message: '조회하신 정보가 없습니다.'
            })
        }
    })
})

//개별 책 수정
router.put('/books/:id', (req,res)=>{
    let {id} = req.params
    id = parseInt(id)
    let {price} = req.body

    let sql = `UPDATE books SET price = ? WHERE id = ?`
    let values = [price, id]
    conn.query(sql,values,
        function (err,results){
            if (results){
                res.status(200).json({
                    message: `책 가격이 ${price}로 변경이 완료되었습니다.`
                })
            } else {
                res.status(400).json({
                    message: `책의 정보를 다시 확인해주세요.`
                }) 
            }
        }
    )
})

//개별 책 삭제
router.delete('/books/:id', (req,res)=>{
    let {id} = req.params
    id = parseInt(id)
    let sql = `DELETE FROM books WHERE id = ?`
    let values = id

    conn.query(sql,values,
        function (err,results){
            res.status(200).json({
                message: `책 삭제가 완료되었습니다.`
            })
        }
    )
})


module.exports = router