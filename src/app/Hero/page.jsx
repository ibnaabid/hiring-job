import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {

  return (

    <div>

      <Navbar />

      <Hero />

      <section
        className="
        max-w-7xl
        mx-auto
        py-20
        px-5
        "
      >

        <h2
          className="
          text-4xl
          font-bold
          mb-10
          "
        >

          Featured Jobs

        </h2>

        <div
          className="
          grid
          md:grid-cols-3
          gap-6
          "
        >

          {[1,2,3].map((item)=>(

            <div
              key={item}
              className="
              border
              rounded-xl
              p-6
              shadow-sm
              hover:shadow-lg
              transition
              "
            >

              <h3
                className="
                text-xl
                font-semibold
                "
              >

                Frontend Developer

              </h3>

              <p
                className="
                text-gray-500
                mt-2
                "
              >

                Remote • Full Time

              </p>

              <button
                className="
                mt-5
                bg-violet-700
                text-white
                px-4
                py-2
                rounded-lg
                "
              >

                Apply Now

              </button>

            </div>

          ))}

        </div>

      </section>

      <Footer />

    </div>

  );

}