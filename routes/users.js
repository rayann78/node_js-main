const express = require("express")
const router = express.Router()

const db = require("../database")



const usersArray =[
    { id: 1, firstName: "John", lastName: "Doe", role: "admin" },
    { id: 2, firstName: "Jane", lastName: "Smith", role: "user" },
    { id: 3, firstName: "Alice", lastName: "Johnson", role: "moderator" },
    { id: 4, firstName: "Bob", lastName: "Brown", role: "user" },
    { id: 5, firstName: "Charlie", lastName: "Davis", role: "admin" },
]

// get Method
router.get("/users", (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(rows);
        }
      });
    
})

//post Method
router.post("/users/:id", (req, res) => {
    
const { firstName, lastName } = req.body

const lastId = users[users.length - 1].id

const newId = lastId + 1

const newUser = {
    firstName,
    lastName,
    id:newId,
}

users.push(newUser)

res.status(201).json(newUser)
} )

// put Method
router.put("/users/:id", (req, res) => {
    
const { firstName, lastName } = req.body
const id = parseInt(req.params.id)
const userIndex = users.findIndex((user) => user.id === id)

if (userIndex < 0)
    return res.status(404).json({ msg: "utilisateur non trouvé" })

if (firstName) users[userIndex].firstName = firstName
if (lastName) users[userIndex].lastName = lastName

res.json({
    msg: "utilisateur mis à jour",
    user: users[userIndex],
})

} )

// delet Method
router.delete("/users/:id", (req, res) => {
    
    const id = parseInt(req.params.id)

    const userIndex = users.findIndex((user) => user.id === id)
    
    if (userIndex < 0)
        return res.status(404).json({ msg: "utilisateur non trouvé" })
    
    
    
    users.splice(userIndex, 1)
    
    res.json({
        msg: "utilisateur suprimée",
    })
} )


module.exports = router