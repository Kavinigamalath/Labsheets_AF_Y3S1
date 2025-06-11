const express = require('express'); 
const User = require('../models/user'); 
 
const router = express.Router(); 
 
// POST route to create a new user 
router.post('/', async (req, res) => { 
    try { 
        const user = new User(req.body); 
        const savedUser = await user.save(); 
        res.status(201).send(savedUser); 
    } catch (error) { 
        res.status(400).send(error); 
    } 
}); 
 
// GET route to fetch all users 
router.get('/', async (req, res) => { 
    try { 
        const users = await User.find({}); 
        res.status(200).send(users); 
    } catch (error) { 
        res.status(500).send(error); 
    } 
}); 
 
// GET route to fetch a single user by id 
router.get('/:id', async (req, res) => { 
    try { 
        const user = await User.findById(req.params.id); 
        if (!user) { 
            return res.status(404).send(); 
        } 
        res.status(200).send(user); 
    } catch (error) { 
        res.status(500).send(error); 
    } 
}); 
 
// PATCH route to update a user by id 
router.patch('/:id', async (req, res) => { 
    try { 
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, 
{ new: true }); 
        if (!updatedUser) { 
            return res.status(404).send(); 
        } 
        res.status(200).send(updatedUser); 
    } catch (error) { 
        res.status(400).send(error); 
    } 
}); 
 
// DELETE route to delete a user by id 
router.delete('/:id', async (req, res) => { 
    try { 
        const user = await User.findByIdAndDelete(req.params.id); 
        if (!user) { 
            return res.status(404).send('User not found'); 
        } 
        // Send a message along with the name of the deleted user 
        res.status(200).send({ message: 'User Deleted Successfully ', name: 
user.name }); 
    } catch (error) { 
        res.status(500).send(error); 
    } 
}); 
 
module.exports = router; 