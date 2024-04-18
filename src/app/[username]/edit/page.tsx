import { getAuthenticatedUser } from "@/app/(auth)/login/actions";
import { getUser, getUserById } from "@/lib/supabase/data/users";
import UserNotFound from "../user-not-found";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditPersonalProfile from "./personal";

export default async function EditProfilePage(props: {
  params: {
    username: string;
  };
}) {
  const { username } = props.params;
  const user = await getUser(username);

  const currentUser = await getAuthenticatedUser();
  let currentUserData = null;
  if (currentUser) currentUserData = await getUserById(currentUser?.id!);

  const isSameUser = currentUserData && currentUserData?.username === username;

  if (!user) {
    return <UserNotFound />;
  }
  if (!isSameUser) {
    return (
      <div className="md:mt-20 mt-10 container relative">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-8xl">🤬</h1>
          <h2 className="md:text-4xl text-3xl mt-6 text-center">
            WTF are you trying to do? 😒
          </h2>
        </div>
      </div>
    );
  }
  return (
    <div className="container mt-8 sm:mt-16 flex items-center justify-center">
      <Tabs defaultValue="personal">
        <TabsList className="grid grid-cols-4 sm:gap-x-10 gap-x-4">
          <TabsTrigger className="text-md sm:text-2xl" value="personal">
            Personal
          </TabsTrigger>
          <TabsTrigger className="text-md sm:text-2xl" value="work">
            Work
          </TabsTrigger>
          <TabsTrigger className="text-md sm:text-2xl" value="education">
            Education
          </TabsTrigger>
          <TabsTrigger className="text-md sm:text-2xl" value="socials">
            Socials
          </TabsTrigger>
        </TabsList>
        <TabsContent className="mt-10" value="personal">
          <EditPersonalProfile user={user} />
        </TabsContent>
        <TabsContent className="mt-10" value="work">
          Change your password here.
        </TabsContent>
      </Tabs>
    </div>
  );
}
