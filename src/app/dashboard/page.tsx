import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import Image from "next/image";

const Page = () => {
  return (
    <div>
      <Navbar />

      <div className="mx-auto flex flex-col">

        {/* Hero Section */}
        <div className="flex flex-row justify-center items-center border-b border-primary/50 bg-primary-foreground shadow py-7">
          <div className="flex flex-row justify-start items-center max-w-6xl w-full">
            <Image
              className="mr-5"
              alt="Profile"
              src={"/logo.png"}
              width={150}
              height={100}
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-balance text-left text-5xl font-extrabold lg:text-6xl">
                Username
              </h1>
              <p className="w-full text-pretty text-lg opacity-70 lg:text-xl">
                I'm not sure what should go here yet.
              </p>
            </div>
          </div>
        </div>

        {/* Everything Else */}
        <div className="flex flex-row justify-center items-center min-h-96 py-7">
        </div>

      </div>

      <Footer />
    </div>
  );
};
export default Page;
