import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
	try {
		const authenticateUser = new AuthenticateUserService();

		const {
			user: { username },
			token,
		} = await authenticateUser.execute(req.body);

		return res.json({ username, token });
	} catch (err) {
		return res.status(404).json({ error: err.message });
	}
});

export default sessionRouter;
