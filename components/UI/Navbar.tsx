import { PhoneIcon } from "@heroicons/react/20/solid";
import { Link } from "@nextui-org/link";
import CreativLogo from "@/public/Logo";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

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
        <ShoppingCartIcon
          className="w-8 hover:cursor-pointer"
          color={"white"}
        />
        <ShoppingCartIcon
          className="w-8 hover:cursor-pointer"
          color={"white"}
        />
        <ShoppingCartIcon
          className="w-8 hover:cursor-pointer"
          color={"white"}
        />
        <ShoppingCartIcon
          className="w-8 hover:cursor-pointer"
          color={"white"}
        />
        {/*<SearchBar />*/}
        {/*<NavLinks />*/}
        {/*<ShopingCart />*/}
        {/*<AuthButton />*/}
      </div>
    </div>
  );
}
