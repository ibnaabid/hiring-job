export default function Footer() {

  return (

    <footer
      className="
      bg-violet-950
      text-white
      mt-20
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-5
        py-14
        grid
        md:grid-cols-4
        gap-10
        "
      >

        <div>

          <h2
            className="
            text-2xl
            font-bold
            mb-4
            "
          >

            JobPortal

          </h2>

          <p
            className="
            text-gray-300
            "
          >

            Find your dream job
            faster than ever.

          </p>

        </div>

        <div>

          <h3
            className="
            font-semibold
            mb-4
            "
          >

            Quick Links

          </h3>

          <ul
            className="
            space-y-2
            text-gray-300
            "
          >

            <li>Home</li>
            <li>Jobs</li>
            <li>Companies</li>
            <li>About</li>

          </ul>

        </div>

        <div>

          <h3
            className="
            font-semibold
            mb-4
            "
          >

            Resources

          </h3>

          <ul
            className="
            space-y-2
            text-gray-300
            "
          >

            <li>Privacy</li>
            <li>Terms</li>
            <li>Support</li>

          </ul>

        </div>

        <div>

          <h3
            className="
            font-semibold
            mb-4
            "
          >

            Contact

          </h3>

          <p
            className="
            text-gray-300
            "
          >

            support@jobportal.com

          </p>

        </div>

      </div>

      <div
        className="
        border-t
        border-gray-700
        text-center
        py-5
        text-gray-400
        "
      >

        © 2026 JobPortal.
        All Rights Reserved.

      </div>

    </footer>

  );

}