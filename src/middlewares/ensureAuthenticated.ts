import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';

interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	const authHeader = req.headers.authorization;

	if (!authHeader) throw new Error('JWT token is missing');

	const [, token] = authHeader.split(' ');

	if (!token) throw new Error('JWT token is missing');

	try {
		const decoded = verify(token, auth.jwt.secret);

		const { sub } = decoded as TokenPayload;

		req.user = {
			id: sub,
		};

		return next();
	} catch {
		throw new Error('Invalid JWT token');
	}
}