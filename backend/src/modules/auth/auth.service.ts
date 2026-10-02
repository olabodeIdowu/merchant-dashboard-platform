import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { pool } from "../../config/database";
import { config } from "../../config";

export class AuthService {
  async register(email: string, password: string, role: string = "owner") {
    const hashed = await bcrypt.hash(password, 12);
    const id = uuidv4();

    await pool.execute(
      `INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)`,
      [id, email, hashed, role],
    );

    return this.generateTokens(id, email, role);
  }

  async login(email: string, password: string) {
    const [
      rows,
    ]: any = await pool.execute(
      `SELECT id, email, password, role FROM users WHERE email = ?`,
      [email],
    );

    if (!rows.length) throw new Error("Invalid credentials");

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    return this.generateTokens(user.id, user.email, user.role);
  }

  private generateTokens(userId: string, email: string, role: string) {
    const accessToken = jwt.sign(
      { sub: userId, email, role },
      config.jwt.accessSecret,
      { expiresIn: config.jwt.accessExpiresIn },
    );

    const refreshToken = jwt.sign({ sub: userId }, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }
}
