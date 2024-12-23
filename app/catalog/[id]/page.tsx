import { fetchMaterialById } from "@/lib/data";
import CustomButton from "@/components/Custom/CustomButton";
import Image from "next/image";
import { Link } from "@nextui-org/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params)?.id;
  const material = await fetchMaterialById(id);

  return (
    <div
      className={
        "bg-blue-950 my-12 rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-3  p-12 text-white" +
        " gap-7"
      }
      style={{ boxShadow: "0px 4px 10px rgba(0, 00, 200, 50)" }}
    >
      <div className="p-2 flex flex-col justify-between col-span-2">
        <div className="flex justify-between items-center">
          <Link href={"/catalog"} color={"warning"}>
            Inapoi
          </Link>
          <Link href={`/catalog?category=${material?.category}`}>
            {material?.category}
          </Link>
        </div>
        <div>
          <h1 className={"text-center mb-10 font-extrabold text-3xl"}>
            {material?.name}
          </h1>

          <h1 className={"text-xl"}>
            Descriere: <br />
            <hr />
          </h1>
          <pre>{material!.description}</pre>

          {/*{material?.available ? (*/}
          {/*  <h2 className={"text-green-500"}>In stoc</h2>*/}
          {/*) : (*/}
          {/*  <h2 className={"text-red-500"}>Nu e in stoc</h2>*/}
          {/*)}*/}
        </div>
        <div>
          <h3 className={"text-2xl"}>
            {material?.price} lei / {material?.unit}
          </h3>
          <CustomButton id={material!.id} />
        </div>
      </div>
      <div
        className={
          "rounded-lg p-2 bg-gray-300 hover:bg-gray-200 flex justify-center"
        }
      >
        <Image
          alt={material!.name}
          src={material!.image_url}
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
