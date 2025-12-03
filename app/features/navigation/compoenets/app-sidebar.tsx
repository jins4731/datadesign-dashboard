import { BarChart, Home, Settings, Upload, Workflow } from "lucide-react"
import { Link, useOutletContext } from "react-router"
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
  {
    title: "Data Design",
    url: "#",
    icon: Workflow,
  },
  {
    title: "Data Visualization",
    url: "/visualization",
    icon: BarChart,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar({dataTables, deleteNode}: {
  dataTables: TableData[],
  deleteNode: ({id, label, children}: {
    id: string;
    label: string;
    children: any[];
  }) => void
}) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-between">
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <Drawer direction="left">
              <DrawerTrigger asChild>
                <Button variant="outline">DataTable</Button>
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
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}