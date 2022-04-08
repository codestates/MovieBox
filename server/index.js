require('dotenv').config()
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const axios = require('axios')
const { sequelize } = require("./models");

const controllers = require('./controllers');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['https://localhost:3000', 'https://openapi.naver.com'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS']
  })
);
app.use(cookieParser());
app.get('/',);
app.post('/signup', controllers.signup);
app.post('/login', controllers.login);
app.get('/auth', controllers.auth);
app.post('/upload', controllers.upload)
app.get('/content', controllers.content)
app.get('/profile', )

app.get('/api/search', (req, res) => {
  const searchKeyword = req.query.query[0]
  const genre = req.query.query[1]
  
  const page = req.query.query[2]
  const start = String((Number(page)-1) * 20 + 1);
  
  console.log(start)

  if (searchKeyword === 'undefined') {
    res.send('검색어가 필요합니다')
  } else if (genre === '0' || genre === '') {
    axios.get('https://openapi.naver.com/v1/search/movie', {
        params: {
          // 영화 검색어 state값 추가되어야 함
          query: searchKeyword,
          start: start,
          display: 20
        },
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_API_ID,
          'X-Naver-Client-Secret': process.env.NAVER_API_SECRET
        }
      }
    )
    .then((response) => {
      const { data } = response;
      res.send(data)
    })
  } 
  else {
    axios.get('https://openapi.naver.com/v1/search/movie', {
        params: {
          // 영화 검색어 state값 추가되어야 함
          query: searchKeyword,
          genre: genre,
          start: start,
          display: 20
        },
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_API_ID,
          'X-Naver-Client-Secret': process.env.NAVER_API_SECRET
        }
      }
    )
    .then((response) => {
      const { data } = response;
      console.log(data)
      res.send(data)
    })
  }
})

let server;
server = https
  .createServer(
    {
      key: fs.readFileSync(__dirname + '/key.pem', 'utf-8'),
      cert: fs.readFileSync(__dirname + '/cert.pem', 'utf-8'),
    },
    app
  )
  .listen(4000);

module.exports = server;