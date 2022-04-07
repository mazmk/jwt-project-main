const jwt = require("jsonwebtoken");
// const express = require("express")();

// express.get("/", async (req, res, next) => {});

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (token) {
      await jwt.verify(token, process.env.TOKEN_KEY);
    } else {
      return res.status(401).send("Access Token not provided.");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
  next();
}

module.exports = auth;
