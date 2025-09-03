import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl w-full rounded-xl bg-white dark:bg-gray-800 shadow-lg p-8">
        <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Interview Generation
        </h3>

        <div className="w-full">
          <Agent
            userName={user?.name}
            userId={user?.id}
            // profileImage={user?.profileURL} optional 
            type="generate"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
