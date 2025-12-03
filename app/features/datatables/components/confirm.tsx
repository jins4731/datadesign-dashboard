import { Form } from "react-router";
import { Button } from "../../../common/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../common/components/ui/dialog";


export const Confirm = ({description, onClick}: {
  description: string;
  onClick: () => void;
}) => {

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>알림</DialogTitle>
        <DialogDescription>
          {description}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">취소</Button>
        </DialogClose>
        <Button 
          onClick={onClick}
        >
          확인
        </Button>
      </DialogFooter>
    </DialogContent>
  )
};
