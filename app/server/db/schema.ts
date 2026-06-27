import { pgTable, text, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const dashboards = pgTable('dashboards', {
  id:         text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId:     text('user_id').notNull(),
  name:       text('name').notNull().default('새 대시보드'),
  layoutJson: jsonb('layout_json').notNull().default({}),  // flexlayout model JSON
  chartsJson: jsonb('charts_json').notNull().default({}),  // ChartSettings map
  createdAt:  timestamp('created_at').defaultNow().notNull(),
  updatedAt:  timestamp('updated_at').defaultNow().notNull(),
});
