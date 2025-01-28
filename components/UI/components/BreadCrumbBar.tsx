import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

import UrlParams from "@/components/UI/components/UrlParams";
import { Suspense } from "react";

export default function BreadCrumbBar() {
  return (
    <Breadcrumbs
      classNames={{
        list: "bg-gradient-to-l from-blue-400 to-blue-700 shadow-small my-auto ",
      }}
      color={"foreground"}
      itemClasses={{
        item: "text-white/80 data-[current=true]:text-white",
        separator: "text-white/40",
      }}
      size={"lg"}
      underline="hover"
      variant="bordered"
    >
      {/*<BreadcrumbItem className={"text-white "} href={"/"}>*/}
      {/*  Acasa*/}
      {/*</BreadcrumbItem>*/}
      <BreadcrumbItem href={"/catalog"}>Catalog</BreadcrumbItem>
      <BreadcrumbItem href={"/catalog"}>
        <Suspense fallback={<h1>Loading...</h1>}>{<UrlParams />}</Suspense>
      </BreadcrumbItem>
    </Breadcrumbs>
  );
}
