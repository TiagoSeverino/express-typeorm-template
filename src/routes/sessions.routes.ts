import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
	const authenticateUser = new AuthenticateUserService();

	const {
		user: { username },
		token,
	} = await authenticateUser.execute(req.body);

	return res.json({ username, token });
});

export default sessionRouter;
