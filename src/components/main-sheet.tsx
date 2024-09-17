import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Settings } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const MainSheet = ({ language, setLanguage }) => {
  const handleChange = (value) => {
    setLanguage(value);
  };

  return (
    <div className="flex items-start h-full">
      <Sheet>
        <SheetTrigger>
          <Settings />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <Select onValueChange={handleChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="latex">Latex</SelectItem>
            </SelectContent>
          </Select>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MainSheet;
