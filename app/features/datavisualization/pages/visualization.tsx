import { Minus, Plus } from "lucide-react";
import React from "react";
import DataTables from "~/common/components/datatables";

import { Button } from "~/common/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "~/common/components/ui/drawer";

const visualization = () => {
  const [goal, setGoal] = React.useState(350)
  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <>
      <div>visualization page</div>

      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline">Open DataTable</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DataTables/>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default visualization;
