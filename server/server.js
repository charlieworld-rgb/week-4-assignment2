import express, { json, request, response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import pg from "pg"

const app = express()

app.use(express.json())

dotenv.config()

app.use(cors())


const db = new pg.Pool({
    connectionString: process.env.DB_CONN
})

app.get(`/`,(req, res) => {
    res.json(`am route`)
})

app.get(`/guestbook`,async (req,res) =>{
    const table = await db.query(`SELECT * FROM guestbook`)

    const guestbook = table.rows

    res.status(200).json(guestbook)
})

app.post(`/guestbook`, async (req, res) => {

    const guestForm = req.body

    const dbQuery = await db.query(`INSERT INTO guestbook (guest_book, content) VALUES ($1, $2)`,[guestForm.guest_name, guestForm.content ])

    res.status(200).json({guestbook: "guest message"})
})




app.listen("https://week-4-assignment2-server.onrender.com",() => {

    console.log(`server live on http://localhost:7890`)
})




// app.listen(7890,() => {
//     console.log(`server started on http://localhost:7890`)
// })
