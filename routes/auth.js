// import express from "express";
const express = require('express')
const { login, register } = require('../controllers/auth.js')
// import  from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)

module.exports = router