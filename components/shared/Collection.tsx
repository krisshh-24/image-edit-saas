"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/constants";
import { IImage } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";

import { Button } from "../ui/button";
import { Search } from "./Search";

export const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // PAGINATION HANDLER
  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      {/* Heading + Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Recent Edits</h2>
        {hasSearch && <Search />}
      </div>

      {/* Image Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <Card image={image} key={image?._id as string} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg font-semibold text-gray-500">No images found.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full items-center justify-between">
            <Button
              disabled={Number(page) <= 1}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </Button>

            <p className="text-gray-700 font-medium">
              Page {page} of {totalPages}
            </p>

            <Button
              disabled={Number(page) >= totalPages}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
              onClick={() => onPageChange("next")}
            >
              <PaginationNext className="hover:bg-transparent hover:text-white" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

// Individual Image Card
const Card = ({ image }: { image: IImage }) => {
  return (
    <Link
      href={`/transformations/${image._id}`}
      className="block rounded-xl overflow-hidden bg-white shadow hover:shadow-md transition"
    >
      <CldImage
        src={image.publicId}
        alt={image.title}
        width={image.width}
        height={image.height}
        {...image.config}
        loading="lazy"
        className="h-52 w-full object-cover"
        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
      />
      <div className="flex justify-between items-center px-4 py-3">
        <p className="text-sm font-medium truncate text-gray-800">
          {image.title}
        </p>
        <Image
          src={`/assets/icons/${
            transformationTypes[
              image.transformationType as keyof typeof transformationTypes
            ].icon
          }`}
          alt={image.title}
          width={24}
          height={24}
        />
      </div>
    </Link>
  );
};
