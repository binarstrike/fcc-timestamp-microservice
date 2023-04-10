import api from "./routes/api.js"
import express from "express"

const app = express()
const PORT = process.env?.PORT ?? 3000

app.use(function (req, res, next) {
  console.log(req.path)
  next()
})
app.use("/api", api)
app.get("/", function (req, res) {
  res.send("Hello World")
})
app.listen(PORT, () =>
  console.log(`Application is running... http://localhost:${PORT}`)
)
