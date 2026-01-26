import { BarChart, Home, Settings, Upload, Workflow } from "lucide-react"
import { Link, useLocation, useOutletContext } from "react-router"
import DataTables from "~/features/datatables/pages/datatables"
import { Button } from "~/common/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "~/common/components/ui/drawer"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/common/components/ui/sidebar"
import type { TableData, TableNode } from "~/root"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "File Upload",
    url: "/fileupload",
    icon: Upload,
  },
  // {
  //   title: "Data Design",
  //   url: "#",
  //   icon: Workflow,
  // },
  {
    title: "Data Visualization",
    url: "/visualization",
    icon: BarChart,
  },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
]

export function AppSidebar({dataTables, deleteNode}: {
  dataTables: TableData[],
  deleteNode: ({id, label, children}: {
    id: string;
    label: string;
    children: any[];
  }) => void
}) {
  const location = useLocation();
  
  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <div className="mb-3 flex items-center justify-between px-2">
            <SidebarGroupLabel className="text-xs font-semibold tracking-wide text-muted-foreground">
              Application
            </SidebarGroupLabel>
            <Drawer direction="left">
              <DrawerTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="h-7 px-2 text-sm"
                >
                  DataTable
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DataTables 
                  dataTables={dataTables}
                  deleteNode={deleteNode}
                />
              </DrawerContent>
            </Drawer>
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const active = location?.pathname === item.url

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className={`
                        flex items-center gap-3 rounded-md px-3 py-2
                        text-sm transition-colors
                        ${active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50"}
                      `}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}