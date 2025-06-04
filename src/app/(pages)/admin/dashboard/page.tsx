import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  console.log(user); // Note: Only logs on the server

  return (
    <div className='flex flex-col bg-white items-center justify-center max-h-screen max-w-screen py-2'>
      <div className='relative flex flex-row justify-center w-full items-center px-4 py-2'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
      </div>
      <div className='flex flex-col gap-4 w-full p-4'>
        <p className='text-center'>
          This is the admin dashboard
        </p>
        {user && (
          <p className='text-center text-gray-600'>
            Welcome, {user.name || user.email} your role is {user.role}
          </p>
        )}
      </div>
    </div>
  );
}
