import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authenticate, authorize } from "./middleware/auth";
import { AuthService } from "./modules/auth/auth.service";
import { AnalyticsService } from "./modules/analytics/analytics.service";

const app = express();
const authService = new AuthService();
const analyticsService = new AnalyticsService();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_, res) => res.json({ status: "ok" }));

app.post("/api/auth/register", async (req, res) => {
  try {
    const tokens = await authService.register(
      req.body.email,
      req.body.password,
    );
    res.status(201).json(tokens);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const tokens = await authService.login(req.body.email, req.body.password);
    res.json(tokens);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

app.get(
  "/api/analytics/:merchantId",
  authenticate,
  authorize("admin", "owner"),
  async (req, res) => {
    try {
      const data = await analyticsService.getMerchantAnalytics(
        req.params.merchantId,
      );
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

export default app;
