import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NavDrawer from "../modals/nav-drawer";
import UserAvatar from "./avatar";

export default function AvatarDropdown({ user }: { user: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray7 m-2">
        <NavDrawer user={user} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
