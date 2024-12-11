import { PhoneIcon } from "@heroicons/react/20/solid";
import { Link } from "@nextui-org/link";
import CreativLogo from "@/public/Logo";
import ShopingCart from "@/components/UI/components/ShoppingCart";
import Catalog from "@/components/UI/components/Catalog";
import SearchBar from "@/components/UI/components/SearchBar";

export default function Navbar() {
  return (
    <div className="flex h-full lg:flex-row flex-col justify-center md:justify-between  px-0 md:px-20 py-3">
      <div className="flex gap-2 text-white align-middle items-center justify-center w-1/3 mx-auto">
        <PhoneIcon color={"white"} height={16} width={16} />
        <div className="border-l-2 border-white h-3" />
        <h1>0751-839-308</h1>
        <div className="border-l-2 border-white h-3" />
        <h1>contact@creativtub.ro</h1>
      </div>
      <Link className="my-2 flex justify-center" href="/">
        <CreativLogo />
      </Link>
      <div className="flex items-center  gap-3  flex-row justify-center mx-auto w-1/3">
        <SearchBar />
        <Catalog />
        <ShopingCart />
        {/*<AuthButton />*/}
      </div>
    </div>
  );
}
