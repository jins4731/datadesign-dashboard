import {
  Form,
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { SidebarProvider, SidebarTrigger } from "./common/components/ui/sidebar";
import { AppSidebar } from "./features/navigation/compoenets/app-sidebar";
import { useState } from "react";
import type { AggregationType, SortType } from "./engine/types/aggregation.types";
import { ChartRegistryProvider } from "./features/datavisualization/context/ChartRegistryProvider";
import { getOptionalUser } from "./server/auth.server";
import { Button } from "./common/components/ui/button";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await getOptionalUser(request);
  return { user };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <main className="h-full">
          {children}
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export interface ColumnNode {
  id: string;
  parentId: string;
  label: string;
  type: string;
  icon?: React.ReactNode;
  sort?: SortType;
  agg?: AggregationType
};

export interface TableNode {
  id: string;
  label: string;
  children: ColumnNode[];
  isSelected?: boolean;
};

export interface TableData {
  table: TableNode,
  data: any[];
}

export default function App() {
  const { user } = useLoaderData<typeof loader>();
  const [dataTables, setDataTables] = useState<TableData[]>([]);

  const addNode = ({ node }: { node: TableData }) => {
    const isDuplicate = dataTables.some(dt => dt.table.id === node.table.id);
    if (isDuplicate) return;
    setDataTables(prev => [...prev, node]);
  };

  const deleteNode = ({ id, children }: { id: string; label: string; children: any[] }) => {
    const isParent = children.length > 0;

    if (isParent) {
      setDataTables(prev => prev.filter(t => t.table.id !== id));
    } else {
      const sheetName = id.slice(0, id.indexOf('_'));
      const itemId = id.slice(id.indexOf('_'));

      setDataTables(prev =>
        prev.map(p => {
          if (p.table.id !== sheetName) return p;

          return {
            data: p.data.map(d => {
              const copy = { ...d };
              delete copy[itemId];
              return copy;
            }),
            table: {
              ...p.table,
              children: p.table.children.filter(child => child.id !== id)
            }
          };
        })
      );
    }
  };

  return (
    <SidebarProvider className="flex h-full overflow-hidden">
      <AppSidebar dataTables={dataTables} deleteNode={deleteNode} />

      <div className="flex flex-col flex-1 min-w-0">
        <header className="flex items-center gap-3 h-10 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <SidebarTrigger />
          <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Excel BI Dashboard
          </h1>

          <div className="ml-auto flex items-center gap-3">
            {user ? (
              <>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  {user.email}
                </span>
                <Form action="/auth/logout" method="post">
                  <Button type="submit" variant="ghost" size="sm" className="h-7 text-xs">
                    로그아웃
                  </Button>
                </Form>
              </>
            ) : (
              <Button asChild variant="ghost" size="sm" className="h-7 text-xs">
                <Link to="/auth/login">로그인</Link>
              </Button>
            )}
          </div>
        </header>

        <main className="flex-1 p-2 min-w-0 overflow-hidden">
          <div className="h-full min-w-0 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm p-2">
            <ChartRegistryProvider>
              <Outlet context={{ addNode, deleteNode, dataTables }} />
            </ChartRegistryProvider>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
