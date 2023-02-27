import Database from "../userDb";
import { UserDBO, UserDTO } from "../types";
import crypto from "crypto";

function getAllUsers(): Promise<UserDBO[]> {
	return new Promise((resolve, reject) => {
		Database.all("SELECT * FROM user", (err, rows) => {
			if (err) reject(err);
			resolve(rows);
		});
	});
}

function createUser(user: UserDTO): Promise<UserDBO> {
	const item: UserDBO = { ...user, id: crypto.randomUUID() };
	return new Promise((resolve, reject) => {
		Database.run(
			"INSERT INTO user (id, email, username, password) values (?,?,?,?)",
			[item.id, item.email, item.username, item.password],
			(err) => {
				if (err) reject(err);
				resolve(item);
			}
		);
	});
}

function insertToken(token: string, userId: string): Promise<{ token: string; userId: string }> {
	return new Promise((resolve, reject) => {
		Database.run("INSERT INTO token (token, userId) values (?,?)", [token, userId], (err) => {
			if (err) reject(err);
			resolve({ token, userId });
		});
	});
}

function deleteToken(token: string) {
	return new Promise((resolve, reject) => {
		Database.run("DELETE FROM token WHERE token=?", [token], (err) => {
			if (err) reject(err);
			resolve(null);
		});
	});
}

function findUserByUsernameOrEmailAndPassword(username: string, password: string): Promise<UserDBO[]> {
	return new Promise((resolve, reject) => {
		Database.all(
			"SELECT * FROM user WHERE (username=? OR email=?) AND password=?",
			[username, username, password],
			(err, rows) => {
				if (err) reject(err);
				resolve(rows as UserDBO[]);
			}
		);
	});
}

function getUserByToken(token: string): Promise<UserDBO> {
	return new Promise((resolve, reject) => {
		Database.all("SELECT * FROM token WHERE token=?", [token], (err, rows) => {
			if (err) reject(err);
			resolve(rows[0] as UserDBO);
		});
	});
}

export const authService = {
	getAllUsers,
	createUser,
	findUserByUsernameOrEmailAndPassword,
	insertToken,
	deleteToken,
	getUserByToken,
};
