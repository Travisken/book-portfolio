export default function JoinCommunity() {
  return (
    <>
      <section className=" rounded-xl px-4 md:px-20 py-10 w-full flex justify-center items-center max-md:flex-col">
        <div className="flex max-md:flex-col bg-blue-50 justify-between w-full rounded-2xl p-6 md:p-10 items-center">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl md:text-3xl ">
              Join The Healthcare Community
            </h1>
           <div className="  md:max-w-4xl flex flex-col gap-2">
             <p className=" text-black/80">
              Hello, this is{" "}
              <span className="text-black font-semibold">Dr. Folarin Akinsiku</span>
              , the author of{" "}
              <span className="text-black font-semibold">
                International Framework for Investing in Healthcare
              </span>
              .
            </p>

            <p className=" text-black/80 ">
              Thank you for your interest in this{" "}
              <span className="text-black font-semibold">eBook</span>. Since its
              release, it has received{" "}
              <span className="text-black font-semibold">over 1,000 views</span>,
              demonstrating a strong demand for{" "}
              <span className="text-black font-semibold">
                structured mentorship, access to credible information, and
                expert guidance
              </span>{" "}
              within the{" "}
              <span className="text-black font-semibold">
                healthcare entrepreneurship space
              </span>
              .
            </p>

            <p className=" text-black/80">
              In response, we have put{" "}
              <span className="text-black font-semibold">systems in place</span> to
              support this growing interest, and we encourage you to{" "}
              <span className="text-black font-semibold">
                watch out for more information
              </span>{" "}
              that will be shared soon.
            </p>

            <p className=" text-black/80">
              If you would like to join a{" "}
              <span className="text-black font-semibold">
                healthcare entrepreneurial community
              </span>{" "}
              of <span className="text-black font-semibold">seasoned experts</span>{" "}
              who provide{" "}
              <span className="text-black font-semibold">
                support, mentorship, and guidance
              </span>{" "}
              to help bring{" "}
              <span className="text-black font-semibold">innovative solutions</span>{" "}
              to life, kindly{" "}
              <span className="text-black font-semibold">click the register button</span>.
            </p>
           </div>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSepWZsS9YIZSADmHwCq-qvcC82014K4yLdzp-iYyrZ0z-MrJQ/viewform?usp=publish-editor"
            target="_blank"
            className="py-3 max-md:w-full mt-8 h-fit rounded-xl  bg-zinc-200 text-black hover:bg-[#3ca0ce] transition-all duration-500 hover:text-white flex px-12 items-center font-semibold justify-center"
          >
            Register here
          </a>
        </div>
      </section>
    </>
  );
}
