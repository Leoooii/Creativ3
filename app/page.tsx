import CustomCarousel from "@/components/Custom/CustomCarousel";
import AboutUs from "@/components/Sections/AboutUs";
import CustomMotionImage from "@/components/Custom/CustomMotionImage";
import Work from "@/components/Sections/Work";
import ShowCase from "@/components/Sections/ShowCase";

export default function Home() {
  return (
    <div className=" mx-auto  h-full flex flex-col gap-12 ">
      <div className="flex mt-5 gap-10 justify-end">
        <div className={"w-full flex p-2"}>
          <CustomCarousel />
        </div>
      </div>
      <hr className="border-blue-800" />

      <AboutUs />
      <hr className="border-blue-800" />
      <ShowCase value={"Inox"} />

      <hr className="border-blue-800" />
      <div className="flex flex-wrap flex-col justify-center  sm:flex-row sm:justify-between gap-5">
        <div className={"sm:w-1/4 w-full mt-5 "}>
          <CustomMotionImage
            alt={"building"}
            left={false}
            src={"/images/interior.png"}
            duration={1}
          />
        </div>
        <div className={"sm:w-1/3 w-full sm:mt-0 mt-5"}>
          <CustomMotionImage
            alt={"muncitor"}
            left={true}
            src={"/images/creativbuilding.jpg"}
            duration={2}
          />
        </div>

        <div className={"sm:w-1/4 w-full mt-5 "}>
          <CustomMotionImage
            alt={"building"}
            left={false}
            src={"/images/birou.png"}
            duration={3}
          />
        </div>
      </div>
      <hr className="border-blue-800" />
      <ShowCase value={"Otel"} />
      <hr className="border-blue-800" />
      <Work />
    </div>
  );
}
