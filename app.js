const express = require("express");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

const mysql = require("mysql2/promise");

// session
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "dreamstreet",
});

app.get("/", (req, res) => {
  console.log (req.session)
  if (req.session.usuario) {
    res.locals.usuario = req.session.usuario;
}
  res.render("index");
});

app.get("/produto", (req, res) => {
  res.render("produto");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const sql = "SELECT * FROM usuarios where email = ?";
    const [rows] = await pool.query(sql, [email]);

    if (rows.length === 0) {
      return res.redirect("/login");
    }

    console.log (rows[0])

    if (rows[0].senha == password) {
      req.session.usuario = rows;
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao logar usuário" });
  }
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.post("/cadastro", async (req, res) => {
  const { primeiro_nome, sobrenome, email, celular, senha, genero } = req.body;
  try {
    const sql =
      "INSERT INTO usuarios (primeiro_nome,sobrenome,email,celular,senha,genero) VALUES (?, ?,?,?,?,?);";
    const values = [primeiro_nome, sobrenome, email, celular, senha, genero];
    const [rows] = await pool.query(sql, values);
    res.redirect(`/`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
});

app.post("/logout",async (req,res) => {
  try {
    req.session.destroy();
    return res.redirect('/');
} catch (error) {
    console.log(error);
    return res.status(500).render('/', { error });
}
})


app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
