import express from 'express';
import passport from 'passport';


const router = express.Router();

router
  .route('/signin')
  // Аутентификация пользователя
  .post(
    passport.authenticate('local'),
    function (req, res) {
      res.json({ id: req.user._id, admin: req.user.admin });
    });

export default router
// export default router
