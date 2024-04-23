import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRoundX } from "lucide-react";

export default function RoomNotFound() {
  return (
    <div className="md:mt-20 mt-10 container relative">
      <div className="flex justify-center items-center flex-col">
        <Avatar className="flex justify-center items-center w-[100px] h-[100px]">
          <AvatarImage src={undefined} alt="Not Found" />
          <AvatarFallback className="w-[100px] h-[100px] bg-red-500 hover:bg-red-600">
            <UserRoundX width={50} height={50} />
          </AvatarFallback>
        </Avatar>
        <h2 className="md:text-4xl text-3xl mt-6 text-center">
          Oopsie-daisy! 🙊
        </h2>
        <h2 className="md:text-4xl text-3xl text-center">Room not found.</h2>
      </div>
    </div>
  );
}
