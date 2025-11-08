import { BarChart, Home, Settings, Upload, Workflow } from "lucide-react"
import DataTables from "~/common/components/datatables"
import { Button } from "~/common/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "~/common/components/ui/drawer"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/common/components/ui/sidebar"

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

export function AppSidebar() {
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
                <DataTables/>
              </DrawerContent>
            </Drawer>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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