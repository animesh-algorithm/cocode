import { Form } from "@/components/ui/form";
import CreateRoomForm from "./create-room-form";
import { getAuthenticatedUser } from "@/app/(auth)/login/actions";
import LoginInFirst from "./login-in-first";

export default async function CreateRoomPage() {
  const user = await getAuthenticatedUser();
  if (!user) {
    return <LoginInFirst />;
  }

  return (
    <div className="container mt-20 mb-20">
      <header className="text-center inset-0 mb-8">
        <h1 className="text-5xl mb-1">New Room</h1>
        <p className="text-gray3 my-0">Create a public room</p>
      </header>
      <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-gray5 to-gray4 rounded-full"></div>
      <CreateRoomForm />
    </div>
  );
}
