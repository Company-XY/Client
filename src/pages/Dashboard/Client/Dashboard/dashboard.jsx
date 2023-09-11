import Profile from "../Profile/getProfile";
import Jobs from "./myJobs";
import Actions from "./clientActions";
import Messages from "./messages";

const clientDashboard = () => {
  return (
    <>
      <main className="p-2 flex flex-col w-full">
        <section className="w-full rounded-lg bg-purple-200">
          <Profile />
        </section>
        <section className="w-full">
          <Actions />
        </section>
        <section className="flex flex-col md:flex-row space-x-4">
          <div className="basis-2/3 md:w-2/3 w-full">
            <div className="overflow-hidden">
              <Jobs />
            </div>
          </div>
          <div className="basis-1/3 md:w-2/3 w-full">
            <Messages />
          </div>
        </section>
      </main>
    </>
  );
};

export default clientDashboard;
