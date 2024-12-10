import { CheckCircleIcon } from "@heroicons/react/16/solid";

const list = [
  {
    description:
      'Suntem unul dintre marii furnizori de materiale pentru constructii si instalatii, din Romania, care furnizeaza materiale pentru constructii “la cheie".',
  },
  {
    description:
      "Logistica noastra asigura santierului dumeavoastra toate materialele, intotdeauna, la timp.",
  },
  {
    description:
      "Experienta, profesionalismul si seriozitatea ne caracterizeaza activitatea de peste patru decenii.",
  },
];

export default function AboutUs() {
  return (
    <div className={` grid md:grid-cols-3 grid-cols-1  gap-10`}>
      {list.map((item) => {
        return (
          <div
            key={item.description}
            className="bg-gray-800 text-white rounded-md p-3 hover:bg-gray-900  flex items-center gap-2"
          >
            <div>
              <CheckCircleIcon className="size-8 text-white" color="white" />
            </div>

            <h1 className="flex-1">{item.description}</h1>
          </div>
        );
      })}
    </div>
  );
}
