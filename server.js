const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
var port = (process.env.PORT || 3000);
const dburl = 'mongodb+srv://phani:test123@nodeone.tz1c8.mongodb.net/Node-one?retryWrites=true&w=majority';
mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true })
.then(result=> app.listen(port, (port) => {console.log(`server started at ${port}`)}))
.catch(err=>console.log(err));

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)