import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import Image from "next/image";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div>
      <Navbar />

      <div className="mx-auto flex flex-col">

        {/* Hero Section */}
        <div className="flex flex-row justify-center items-center border-b border-primary/50 bg-primary-foreground shadow py-7 px-64 ">
          <div className="flex flex-row justify-start items-center w-full relative">
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
        <div className="flex flex-row justify-center items-start px-64 gap-16 py-16">
          <div className="h-auto w-1/2">

            <h1 className="text-balance text-left text-xl font-bold lg:text-3xl mb-4">
              Experience:
            </h1>
            <div className="w-full h-40 rounded-lg shadow-lg border border-gray-400 mb-8 flex flex-col">
              {/* This could probably be a grid or smth */}
              <div className="h-3/5 w-full flex justify-start items-center border-b border-gray-400">
                <h1 className="text-balance text-left text-xl lg:text-6xl h-full w-auto px-4 py-2 flex justify-center items-center">
                51
                </h1>
                <div className="w-full h-full border-l-2 border-gray-400 flex flex-col justify-evenly items-start px-4 py-3">
                  <h3 className="text-balance text-left text-xl font-bold lg:text-1xl">
                  51st Level
                  </h3>
                  <h3 className="text-balance text-left text-xl font-bold lg:text-1xl">
                  2103 XP until level 52
                  </h3>
                </div>
              </div>
              <div className="h-2/5 w-full flex justify-center items-center px-4">
                <div className="w-full h-6 bg-red-600 rounded-full"></div>
              </div>
            </div>

            <h1 className="text-balance text-left text-xl font-bold lg:text-3xl mb-4">
              Global Stats:
            </h1>
            <div className="w-full rounded-lg shadow-lg border border-gray-400 mb-8 flex flex-col justify-start items-center">
              <div className="w-full h-16 flex justify-between items-center px-4 border-b border-gray-400">
                <h1 className="text-balance text-left text-xl font-bold lg:text-1xl">Problems Solved:</h1>
                <h1 className="text-balance text-left text-xl font-bold lg:text-1xl">432</h1>
              </div>
              <div className="w-full h-16 flex justify-between items-center px-4 border-b border-gray-400">
                <h1 className="text-balance text-left text-xl font-bold lg:text-1xl">Subjects Completed:</h1>
                <h1 className="text-balance text-left text-xl font-bold lg:text-1xl">5</h1>
              </div>
              <div className="w-full h-16 flex justify-between items-center px-4">
                <h1 className="text-balance text-left text-xl font-bold lg:text-1xl">Total XP:</h1>
                <h1 className="text-balance text-left text-xl font-bold lg:text-1xl">1200</h1>
              </div>
            </div>

            <h1 className="text-balance text-left text-xl font-bold lg:text-3xl mb-4">
              Recent Activity:
            </h1>
            <div className="w-full rounded-lg shadow-lg border border-gray-400 mb-8 flex flex-col justify-start items-center">
              <div className="w-full h-auto flex justify-between items-center px-4 py-4 border-b border-gray-400">
                <div className="w-auto h-full flex flex-col justify-center items-start">
                  <h1 className="text-balance text-left text-xl font-bold lg:text-1xl mb-1.5">AP Physics 2 | Unit 3 | Q14</h1>
                  <h1 className="text-balance text-left text-m lg:text-l pb-3">Gravitational Acceleration Scaling</h1>
                  <Button className="w-auto py-3 px-6 text-base font-medium">
                    Go to Question
                  </Button>
                </div>
              </div>
              <div className="w-full h-auto flex justify-between items-center px-4 py-4 border-b border-gray-400">
                <div className="w-auto h-full flex flex-col justify-center items-start">
                  <h1 className="text-balance text-left text-xl font-bold lg:text-1xl mb-1.5">AP United States Government | Unit 1 | Q127</h1>
                  <h1 className="text-balance text-left text-m lg:text-l pb-3">Pluralist Democracy Opponents</h1>
                  <Button className="w-auto py-3 px-6 text-base font-medium">
                    Go to Question
                  </Button>
                </div>
              </div>
              <div className="w-full h-auto flex justify-between items-center px-4 py-4 border-b border-gray-400">
                <div className="w-auto h-full flex flex-col justify-center items-start">
                  <h1 className="text-balance text-left text-xl font-bold lg:text-1xl mb-1.5">AP Cybersecurity | Unit 2 | Q2</h1>
                  <h1 className="text-balance text-left text-m lg:text-l pb-3">OSI Layer 4: Devices</h1>
                  <Button className="w-auto py-3 px-6 text-base font-medium">
                    Go to Question
                  </Button>
                </div>
              </div>
            </div>

          </div>
          <div className="w-1/2 h-auto flex flex-col justify-start items-start">
              <h1 className="text-balance text-left text-xl font-bold lg:text-3xl mb-4 cursor-pointer">
                My Classes:
              </h1>

              <div className="w-full border rounded-lg p-4 shadow mb-4 cursor-pointer flex justify-between items-center relative" style={{borderColor: "#2563eb"}}>
                <h3 className="text-2xl font-bold" style={{color: "#2563eb"}}>AP Calculus AB</h3>
                <ChevronRight className="shrink-0 absolute right-4" size={40} color="#2563eb" />
              </div>

              <div className="w-full border rounded-lg p-4 shadow mb-4 cursor-pointer flex justify-between items-center relative" style={{borderColor: "#16a34a"}}>
                <h3 className="text-2xl font-bold" style={{color: "#16a34a"}}>AP Physics 2</h3>
                <ChevronRight className="shrink-0 absolute right-4" size={40} color="#16a34a" />
              </div>

              <div className="w-full border rounded-lg p-4 shadow mb-4 cursor-pointer flex justify-between items-center relative" style={{borderColor: "#16a34a"}}>
                <h3 className="text-2xl font-bold" style={{color: "#16a34a"}}>AP Environmental Science</h3>
                <ChevronRight className="shrink-0 absolute right-4" size={40} color="#16a34a" />
              </div>

              <div className="w-full border rounded-lg p-4 shadow mb-4 cursor-pointer flex justify-between items-center relative" style={{borderColor: "#2563eb"}}>
                <h3 className="text-2xl font-bold" style={{color: "#2563eb"}}>AP Cybersecurity</h3>
                <ChevronRight className="shrink-0 absolute right-4" size={40} color="#2563eb" />
              </div>

              <div className="w-full border rounded-lg p-4 shadow mb-4 cursor-pointer flex justify-between items-center relative" style={{borderColor: "#dc2626"}}>
                <h3 className="text-2xl font-bold" style={{color: "#dc2626"}}>AP English Literature</h3>
                <ChevronRight className="shrink-0 absolute right-4" size={40} color="#dc2626" />
              </div>

              <div className="w-full border rounded-lg p-4 shadow mb-4 cursor-pointer flex justify-between items-center relative" style={{borderColor: "#f97316"}}>
                <h3 className="text-2xl font-bold" style={{color: "#f97316"}}>AP United States Government</h3>
                <ChevronRight className="shrink-0 absolute right-4" size={40} color="#f97316" />
              </div>

              <div className="w-full border rounded-lg p-4 shadow mb-4 cursor-pointer flex justify-between items-center relative" style={{borderColor: "#f97316"}}>
                <h3 className="text-2xl font-bold" style={{color: "#f97316"}}>AP Macroeconomics</h3>
                <ChevronRight className="shrink-0 absolute right-4" size={40} color="#f97316" />
              </div>

          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};
export default Page;
