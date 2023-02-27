import express, { Request, Response } from "express";
import { authService as service } from "../service/authService";
import { UserDBO, UserDTO } from "../types";
import { generateAuthToken, getHashedPassword, requireAuth } from "../util";

const router = express.Router();

export const authTokens: { [token: string]: UserDTO } = {};

router.post("/register", async (req: Request, res: Response) => {
	const { email, username, password, confirmPassword } = req.body;

	if (password === confirmPassword) {
		//@ts-ignore
		const users: UserDBO[] = await service.getAllUsers();

		if (users.find((user: UserDBO) => user.email === email)) {
			return res.status(409).json({ message: "error", error: "User with that email already exists" });
		}

		if (users.find((user: UserDBO) => user.username === username)) {
			return res.status(409).json({ message: "error", error: "User with that username already exists" });
		}

		const hashedPassword = getHashedPassword(password);

		await service.createUser({ email, username, password: hashedPassword });

		return res.status(200).json({ message: "success" });
	} else {
		return res.status(400).json({ message: "error", error: "Passwords don't match" });
	}
});

router.post("/login", async (req: Request, res: Response) => {
	const { username, password } = req.body;
	const hashedPassword = getHashedPassword(password);

	const user: UserDBO[] = await service.findUserByUsernameOrEmailAndPassword(username, hashedPassword);

	if (user.length <= 0)
		return res.status(404).json({ message: "error", error: "No user with that credentials found" });

	const authToken = generateAuthToken();

	await service.insertToken(authToken, user[0].id);

	res.cookie("AuthToken", authToken);
	return res.status(200).json({ message: "success", data: { authToken } });
});

router.post("/logout", requireAuth, async (req: Request, res: Response) => {
	const { authToken } = req.body;

	try {
		await service.deleteToken(authToken);
		return res.status(200).json({ message: "success" });
	} catch (err) {
		return res.status(404).json({ message: "error", error: "Token not found" });
	}
});

export default router;
