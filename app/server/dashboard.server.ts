import { db } from './db/index';
import { dashboards } from './db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function saveDashboard({
  userId, name, layoutJson, chartsJson,
}: {
  userId: string;
  name: string;
  layoutJson: object;
  chartsJson: object;
}) {
  const [row] = await db
    .insert(dashboards)
    .values({ id: crypto.randomUUID(), userId, name, layoutJson, chartsJson })
    .returning({ id: dashboards.id });
  return row.id;
}

export async function listDashboards(userId: string) {
  return db
    .select({ id: dashboards.id, name: dashboards.name, updatedAt: dashboards.updatedAt })
    .from(dashboards)
    .where(eq(dashboards.userId, userId))
    .orderBy(desc(dashboards.updatedAt));
}

export async function getDashboard(id: string, userId: string) {
  const [row] = await db
    .select()
    .from(dashboards)
    .where(and(eq(dashboards.id, id), eq(dashboards.userId, userId)));
  return row ?? null;
}
