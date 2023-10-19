import Verifications from "./verifications";
import Profile from "./profileCard";
import Skills from "./skills";
import Portfolio from "./portfolio";
import Certification from "./certifications";

const index = () => {
  return (
    <main className="mx-auto max-w-6xl mt-20 flex flex-col sm:flex-row space-x-10">
      <section className="basis-2/3 flex flex-col space-y-4 mr-4 mt-4">
        <div>
          <Profile />
        </div>
        <div>
          <Portfolio />
        </div>
      </section>
      <section className="basis-1/3 flex flex-col space-y-4 mt-4">
        <div>
          <Verifications />
        </div>
        <div>
          <Certification />
        </div>
        <div>
          <Skills />
        </div>
      </section>
    </main>
  );
};

export default index;
