import { pool } from "../../config/database";
import { redis } from "../../config/redis";

export class AnalyticsService {
  private cacheKey(merchantId: string) {
    return `analytics:${merchantId}`;
  }

  async getMerchantAnalytics(merchantId: string) {
    const cached = await redis.get(this.cacheKey(merchantId));
    if (cached) {
      return JSON.parse(cached);
    }

    const [rows]: any = await pool.execute(
      `SELECT 
         COUNT(*) as total_transactions,
         SUM(amount) as total_volume,
         AVG(amount) as avg_transaction
       FROM transactions 
       WHERE merchant_id = ? AND created_at >= NOW() - INTERVAL 30 DAY`,
      [merchantId],
    );

    const data = rows[0] || {
      total_transactions: 0,
      total_volume: 0,
      avg_transaction: 0,
    };

    // Cache for 60 seconds
    await redis.set(this.cacheKey(merchantId), JSON.stringify(data), "EX", 60);

    return data;
  }

  async invalidateCache(merchantId: string) {
    await redis.del(this.cacheKey(merchantId));
  }
}
