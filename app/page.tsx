import CustomCarousel from "@/components/Custom/CustomCarousel";
import AboutUs from "@/components/Sections/AboutUs";
import CustomMotionImage from "@/components/Custom/CustomMotionImage";
import Work from "@/components/Sections/Work";

export default function Home() {
  return (
    <div className="container mx-auto  h-full flex flex-col gap-10 ">
      <div className="flex mt-5 gap-10 justify-end">
        <div className={"w-full flex p-2"}>
          <CustomCarousel />
        </div>
      </div>
      <hr className="border-blue-800" />
      <AboutUs />
      <hr className="border-blue-800" />
      <div className="flex flex-wrap flex-col justify-center  sm:flex-row sm:justify-between gap-5">
        <div className={"sm:w-2/5 w-full"}>
          <CustomMotionImage
            alt={"muncitor"}
            left={true}
            src={"/images/work.jpg"}
            duration={1}
          />
        </div>
        <div className={"sm:w-2/5 w-full mt-20 "}>
          <CustomMotionImage
            alt={"building"}
            left={false}
            src={"/images/creativbuilding.jpg"}
            duration={2}
          />
        </div>
      </div>
      <hr className="border-blue-800" />
      <Work />
    </div>
  );
}
