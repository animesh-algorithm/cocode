import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Search({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray7 backdrop-filter backdrop-blur">
        <DialogHeader>
          <DialogTitle>Search Rooms</DialogTitle>
          <DialogDescription className="font-sans">
            Search for rooms or filter by tags such as "javascript", "react",
            etc.
          </DialogDescription>
          <div className="grid grid-cols-4 gap-2 pt-5">
            <Input
              className="bg-gray6 col-span-3"
              autoFocus
              placeholder="Enter Search term"
            />
            <Button>Search</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
