import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { SidebarProvider, SidebarTrigger } from "./common/components/ui/sidebar";
import { AppSidebar } from "./features/navigation/compoenets/app-sidebar";
import { useEffect, useState } from "react";
import type { TreeItemProps } from "@mui/x-tree-view";

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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main>
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
};

export interface TableNode {
  id: string;
  label: string;
  children: ColumnNode[];
};

export interface TableData {
  table: TableNode,
  data: any[];
}

export default function App() {
  const [dataTables, setDataTables] = useState<TableData[]>([]);
  // console.log('dataTables', dataTables);

  const addNode = ({node}: {
    node: TableData
  }) => {
    const tableIds = dataTables.map((dt) => dt.table.id);
    if (tableIds.includes(node.table.id)) {
      alert('중복되는 dataTables 가 존재합니다.');
      return;
    }
    setDataTables((prev: TableData[]) => {
      return [
        ...prev,
        node
      ]
    });
  }

  const deleteNode = ({id, label, children}: {
    id: string;
    label: string;
    children: any[];
  }) => {
    const isParent = children.length > 0;
    if (isParent) {
      setDataTables((prev: TableData[]) => {
        return prev.filter((t) => t.table.id !== id);
      })
    }else {
      const sheetName = id.slice(0, id.indexOf('_'));
      const itemId = id.slice(id.indexOf('_'));
      setDataTables((prev: TableData[]) => {
        return prev.map((p) => {
          if (p.table.id === sheetName) {
            const newData = p.data.map((d) => {
              const copyData = {...d};
              delete copyData[itemId];
              return copyData;
            });
            const newChildren = p.table.children.filter((child) => child.id !== id);

            return {
              data: newData,
              table: {
                ...p.table,
                children: newChildren
              }
            };
          }else {
            return p;
          }
        });
      })
    }
  }

  return (
     <SidebarProvider>
      <AppSidebar 
        dataTables={dataTables}
        deleteNode={deleteNode}
      />
      <SidebarTrigger />
      <div className="w-full">
        <Outlet
          context={{addNode, deleteNode}}
        />
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
