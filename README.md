# 💻 Node.js Smart Edu Project

#### Live Site URL: [Live Preview](https://nodejs-smartedu-project.herokuapp.com/)

<ul style="list-style-type:disc">
   <li>Coded a basic Node.js application for CRUD operations.</li>
   <li>Used UI template from <a href="https://html.design/download/smartedu-education-template/">html.design</a></li>
   <li>Created NOSql backend with MongoDB.</li>
   <li>Created pages by using EJS.</li>
</ul>

# 📌 Installation

### Clone
   ```bash
   git clone https://github.com/MhmtMutlu/nodejs-smart-edu.git
   ```

### Change connection URL
   ```bash
   // Create a database on MongoDB and change connection URL in app.js
   // For example

   mongoose.connect('mongodb://localhost/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   });
   ```

### Change session middleware's store
   ```bash
   // Use your database connection URL for session middleware
   // For example

   app.use(
     session({
       secret: "my_session_middleware",
       resave: false,
       saveUninitialized: true,
       store: MongoStore.create({ mongoUrl: "mongodb://localhost/smartedu-db" }),
     })
   );
   ```

### Install
   ```bash
   npm install
   ```

### Start
   ```bash
   npm start
   ```

# 🧰 Technologies

<ul style="list-style-type:disc">
   <li><a href="https://nodejs.org/en/">Node.js</a></li>
   <li><a href="https://ejs.co/">EJS</a></li>
   <li><a href="https://expressjs.com/">Express</a></li>
   <li><a href="https://mongoosejs.com/">Mongoose</a></li>
   <li><a href="https://www.mongodb.com/">MongooDB</a></li>
   <li><a href="https://www.npmjs.com/package/connect-mongo">Connect Mongo</a></li>
   <li><a href="https://nodemailer.com/about/">Nodemailer</a></li>
   <li><a href="https://www.npmjs.com/package/bcrypt">Bcrypt</a></li>
   <li><a href="https://www.npmjs.com/package/express-session">Express Session</a></li>
   <li><a href="https://www.npmjs.com/package/method-override">Method Override</a></li>
   <li><a href="https://www.npmjs.com/package/dotenv">Dotenv</a></li>
</ul>

# 📌 Todos

- [ ] Design UI Template
