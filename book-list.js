//교보문고 베스트셀러 목록 get, post 연습

const express = require('express')
const app = express()
app.listen(2345)

//<DB세팅
db = new Map()

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
    book = db.get(id)
    
    res.send(`${id}위 책은 ${book.date}에 출간된 ${book.author}의 ${book.title}입니다. 가격은 ${book.price}입니다.`)
    
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
