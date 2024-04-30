//교보문고 베스트셀러 목록 get, post 연습

const express = require('express')
const app = express()
app.listen(1234)

//<DB세팅
var db = new Map()

let book1 = {
    title : "모순",
    author: "양귀자",
    date: "2013.04.01",
    price: 11700
}
let book2 = {
    title : "삼체 세트",
    author: "류츠신",
    date: "2020.07.06",
    price: 60300
}
let book3 = {
    title : "젊은작가 수상작품집",
    author: "김멜라 외",
    date: "2024.03.31",
    price: 6930
}
let book4 = {
    title : "흐르는 강물처럼",
    author: "셸리 리드",
    date: "2024.01.08",
    price: 15300
}
var id = 1
db.set(id++,book1)
db.set(id++,book2)
db.set(id++,book3)
db.set(id++,book4)
//DB세팅>

//<GET 전체 책 조회하기
app.get('/bestsellers',(req,res)=>{
    const bestsellers = {}
    console.log(db.get(1))

    dbSize = db.size
    for (let i=1; i<dbSize+1; i++){
        bestsellers[i] = db.get(i)
        console.log("실행중")
    }
    console.log(bestsellers)

    res.send(bestsellers)

})



//<GET 개별 책 조회하기
app.get('/bestsellers/:id', (req,res)=>{
    let {id} = req.params
    id = parseInt(id)
    let book = db.get(id)

    if (book == undefined){
        msg = '그런 책은 존재하지 않습니다'
    } else {
        msg = `${id}위 책은 ${book.date}에 출간된 ${book.author}의 ${book.title}입니다. 가격은 ${book.price}원 입니다.`
    }
    
    res.json({
        message : msg
    })
    
})
//GET>

//<POST 책 등록하기
app.use(express.json())

app.post('/bestsellers', (req,res)=>{
    let newBook = req.body
    db.set(id++,newBook)

    res.json({
        msg: `${newBook.author}의 ${newBook.title}이 추가되었습니다.`
    })

})

//POST>

//<DELETE 개별 책 삭제하기
app.delete('/bestsellers/:id', (req,res)=>{
    let {id} = req.params
    id = parseInt(id)
    var msg = ''

    const book = db.get(id)

    if (book == undefined) {
        msg = `${id}번이 존재하지 않습니다.`
    } else {
        const title = book.title
        db.delete(id)
        msg = `${title}이 삭제되었습니다.`
    }

    res.json({
        message : msg
    })

})//DELETE>

//<DELETE 전체 책 삭제하기
app.delete('/bestsellers', (req,res)=>{
    if (db.size > 0){
        db.clear()
        msg = `전체 책이 삭제되었습니다.`
    } else {
        msg = `책장이 비었습니다.`
    }

    res.json({
        message : msg
    })
})
//DELETE>

//<PUT 책 가격 수정하기
app.put('/bestsellers/:id', (req,res)=>{
    let {id} = req.params
    id = parseInt(id)
    const book = db.get(id)


    if (book == undefined){
        msg = '그런 책은 존재하지 않습니다.'
    } else {
        const oldPrice = book.price //밖으로 빼면 에러
        const newPrice = req.body.price
        book.price = newPrice

        msg =  `${book.author}의 ${book.title}이 ${oldPrice}원에서 ${book.price}원으로 가격이 인하되었습니다!!`
    }

    res.json({
        message: msg
    })

})
//PUT>
