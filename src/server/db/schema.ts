import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// export const posts = pgTable(
//   "post",
//   {
//     id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
//     name: varchar("name", { length: 256 }),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
//       () => new Date(),
//     ),
//   },
// );
