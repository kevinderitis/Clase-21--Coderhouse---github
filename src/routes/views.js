import { Router } from 'express';
import authMiddleware  from '../middlewares/auth.js'

const viewRouter = Router();


viewRouter.get('/', authMiddleware ,async(req, res) => {
    let user = req.session.user;
    res.render('home', { user })
})

viewRouter.get('/login', async(req, res) => {
    res.render('login')
})

export default viewRouter;