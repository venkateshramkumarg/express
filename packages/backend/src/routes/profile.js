const express = require('express')
const bcrypt = require('bcrypt')
const { userAuth } = require('../middlewares/auth')
const { validateProfileUpdate, validatePasswordUpdate } = require('../utils/validation')

const ProfileRouter = express.Router()

ProfileRouter.get('/profile', userAuth, async (req, res) => {
  try {
    res.status(200).json({ user: req.user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

ProfileRouter.patch('/profile', userAuth, async (req, res) => {
  try {
    validateProfileUpdate(req.body)
    const user = req.user
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]))
    await user.save()
    res.status(200).json({ message: 'Profile updated successfully', user })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

ProfileRouter.patch('/profile/password', userAuth, async (req, res) => {
  try {
    validatePasswordUpdate(req.body)
    const { currentPassword, newPassword } = req.body
    const user = req.user

    const isValidPassword = await user.validatePassword(currentPassword)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid current password' })
    }

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()
    res.status(200).json({ message: 'Password updated successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = ProfileRouter
