import { fetchMaterialById } from "@/lib/data";
import CustomButton from "@/components/Custom/CustomButton";
import Image from "next/image";
import { Link } from "@nextui-org/link";
import { BackwardIcon } from "@heroicons/react/24/solid";
import ShowCase from "@/components/Sections/ShowCase";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params)?.id;
  const material = await fetchMaterialById(id);

  return (
    <div>
      <div
        className={
          "bg-blue-950 my-12 rounded-lg shadow-sm grid grid-cols-1 grid-rows-1 sm:grid-cols-3" +
          " sm:grid-cols-5" +
          " px-20 py-5" +
          " text-white" +
          " gap-7"
        }
        style={{ boxShadow: "0px 4px 10px rgba(0, 00, 200, 50)" }}
      >
        <div className="p-2 flex flex-col justify-between col-span-3 row-span-2">
          <div className="flex justify-between items-center mb-5">
            <Link href={"/catalog"} color={"warning"}>
              <BackwardIcon height={30} width={30} color={"white"} />
            </Link>

            <Link
              href={`/catalog?category=${material?.category}`}
              className={"text-white underline"}
            >
              {material?.category}
            </Link>
          </div>
          <div>
            <h1 className={"text-center mb-10 font-extrabold text-3xl"}>
              {material?.name}
            </h1>

            <h1 className={"text-xl text-gray-200"}>
              Descriere: <br />
              <hr />
            </h1>
            <div>
              <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {material!.description}
              </pre>
            </div>

            {/*{material?.available ? (*/}
            {/*  <h2 className={"text-green-500"}>In stoc</h2>*/}
            {/*) : (*/}
            {/*  <h2 className={"text-red-500"}>Nu e in stoc</h2>*/}
            {/*)}*/}
          </div>
          <div className={"mt-5"}>
            <h3 className={"text-2xl"}>
              {material?.price} lei / {material?.unit}
            </h3>
            <CustomButton id={material!.id} />
          </div>
        </div>

        <div className={"col-span-2 grid "}>
          <Image
            alt={material!.name}
            src={material!.image_url}
            width={300} // Poți păstra aceste dimensiuni pentru controlul minim
            height={300}
            style={{
              objectFit: "contain",
            }} // Mărirea proporțională
            className="border-5 mx-auto  rounded-xl  hover:opacity-80  my-auto w-full max-h-72 bg-white"
          />
        </div>
      </div>
      <div className={"mb-10"}>
        <ShowCase value={material!.name.slice(0, 10)} />
      </div>
    </div>
  );
}
