import express from 'express'
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken'
const app = express()
app.use(express.json())
const port = 3000

const users = [{
    id: 1,
    email: 'murad',
    password: 'murad'
}]

app.get('/users', (req, res) => {
    res.send(users)
})

app.post('/register', (req, res) => {
    const { email, password } = req.body
    users.push({ id: uuidv4(), email, password, role: 'user' })
    res.send(users)
})


app.post('/login', (req, res) => {
    try {
        const { email, password } = req.body
        const isExist = users.find(x => x.email === email)
        if (!isExist) {
            return res.status(404).json({ message: 'email is not found' })
        }
        if (isExist.password !== password) {
            return res.status(401).json({ message: 'password is wrong' })
        }
        const token = jwt.sign({ id: isExist.id, email: isExist.email, role: isExist.role }, 'shhhhh');

        return res.status(200).json({ token })
    } catch (error) {
        res.status(401).json({ message: error })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})