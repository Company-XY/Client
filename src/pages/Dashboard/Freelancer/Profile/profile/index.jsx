import Verifications from "./verifications";
import Profile from "./profileCard";
import Skills from "./skills";
import Portfolio from "./portfolio";
import Certification from "./certifications";

const index = () => {
  return (
    <main className="mx-auto max-w-5xl mt-20 flex">
      <section className="basis-2/3">
        <div>
          <Profile />
        </div>
        <div>
          <Portfolio />
        </div>
      </section>
      <section className="basis-1/3">
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
