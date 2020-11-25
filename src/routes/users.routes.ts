import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
	try {
		const createUser = new CreateUserService();
		const user = await createUser.execute(req.body);

		return res.json(user);
	} catch (err) {
		return res.status(404).json({ error: err.message });
	}
});

export default userRouter;
