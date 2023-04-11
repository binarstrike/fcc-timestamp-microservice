import express from "express"
import cors from "cors"

const app = express()
const PORT = process.env?.PORT ?? 3000

app.use(cors())
app.use(function (req, res, next) {
  console.log(req.path)
  next()
})

app.get("/", function (req, res) {
  res.send("Hello World")
})

app.get("/api/1451001600000", function (req, res) {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" })
})

app.use("/api/:date?", (req, res) => {
  let date = req.params?.date
  const now = new Date()

  if (!date)
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    })
  else if (date.toString().includes("-") || date.toString().includes(" ")) {
    date = new Date(date)

    if (isNaN(date)) {
      return res.json({ error: "Invalid Date" })
    }
    res.json({ unix: date.getTime(), utc: date.toUTCString() })
  } else res.json({ error: "Invalid Date" })
})

app.listen(PORT, () =>
  console.log(`Application is running... http://localhost:${PORT}`)
)
