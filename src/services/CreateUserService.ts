import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
	username: string;
	password: string;
}

class CreateUserService {
	public async execute({ username, password }: Request): Promise<User> {
		if (!username) throw new Error('Invalid username');
		if (!password) throw new Error('Invalid password');

		const usersRepository = getRepository(User);

		const userExists = await usersRepository.findOne({
			where: { username },
		});

		if (userExists) throw new Error('This user already exists');

		const hashedPassword = await hash(password, 8);

		const user = usersRepository.create({
			username,
			password: hashedPassword,
		});

		return usersRepository.save(user);
	}
}

export default CreateUserService;
