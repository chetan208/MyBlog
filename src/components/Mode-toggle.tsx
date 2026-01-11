import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";

export default function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="
            relative
            h-10 w-10
           
            rounded-full
            border-gray-200 dark:border-gray-700
            bg-white/70 dark:bg-gray-900/60
            backdrop-blur
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition-all
            active:scale-95
            cursor-pointer
          "
        >
          {/* Sun */}
          <Sun
            className="
              h-5 w-5
              text-yellow-400
              transition-all
              dark:scale-0 dark:-rotate-90
            "
          />

          {/* Moon */}
          <Moon
            className="
              absolute h-5 w-5
              text-teal-400
              scale-0 rotate-90
              transition-all
              dark:scale-100 dark:rotate-0
            "
          />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          w-36
          rounded-xl
          border-gray-200 dark:border-gray-700
          bg-white/90 dark:bg-gray-900/90
          backdrop-blur
          shadow-lg
        "
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Sun className="h-4 w-4 text-yellow-400" />
          Light
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Moon className="h-4 w-4 text-teal-400" />
          Dark
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Laptop className="h-4 w-4 text-gray-500" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
