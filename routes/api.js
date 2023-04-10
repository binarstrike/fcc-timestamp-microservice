import { Router } from "express"

export const router = Router()

router.get("/", function (req, res) {
  res.json({
    unix: parseInt(Date.parse(new Date())),
    utc: new Date().toUTCString(),
  })
})

router.get("/:date", function (req, res) {
  const date = req.params?.date

  if (
    (!isNaN(new Date(date)) && isNaN(new Date(date))) ||
    isNaN(new Date(parseInt(date)))
  )
    return res.json({ error: "Invalid Date" })
  else if (date.length === parseInt(date).toString().length)
    res.json({
      unix: parseInt(date),
      utc: new Date(parseInt(date)).toUTCString(),
    })
  else
    res.json({
      unix: parseInt(Date.parse(new Date(date))),
      utc: new Date(date).toUTCString(),
    })
})

export default router
