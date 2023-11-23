import Profile from "../Profile/getProfile";
import Jobs from "./myJobs";
import Actions from "./clientActions";
import Messages from "./messages";
import Consultations from "./consultations";

const clientDashboard = () => {
  return (
    <>
      <main className="py-2 flex flex-col w-full">
        <section className="w-full rounded-lg">
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
            <hr />
            <div className="overflow-hidden">
              <Consultations />
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
