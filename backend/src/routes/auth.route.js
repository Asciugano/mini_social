import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
  res.send('login route');
});

router.post('/singup', (req, res) => {
  res.send('singup route');
});

router.post('/logout', (req, res) => {
  res.send('logout route');
});

router.get('/check', (req, res) => {
  res.send('check route');
});

export default router;
