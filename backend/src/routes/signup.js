import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.module.js';

const router = express.Router();

router
  .route('/signup')
  // Регистрация пользователя
  .post(async (req, res) => {
    const { firstname, surname, password, email, tel } = req.body;
    try {
      // Мы не храним пароль в БД, только его хэш
      const saltRounds = Number(process.env.SALT_ROUNDS ?? 10);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await User.create({
        firstname,
        surname,
        password: hashedPassword,
        email,
        tel,
        admin: false,
      });
      return res.status(200).end();
      //   req.session.user = serializeUser(user);
    } catch (err) {
      return res.status(401).end();
    }
  });

// export default router
export default router
