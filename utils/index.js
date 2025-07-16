import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

let db; // ← const hata ke let likho

try {
  const poolConnection = await mysql.createPool({
    host: 'srv2020.hstgr.io',
    user: 'u613349130_attendancetrak',
    password: 'Hostman@01', // make sure this is updated
    database: 'u613349130_attendancetrak',
    port: 3306
  });

  db = drizzle(poolConnection); // ab yeh error nahi dega
} catch (error) {
  console.error("🔥 MySQL connection error:", error);
}

export default db;
