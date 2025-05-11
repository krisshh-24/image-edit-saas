import { Collection } from "@/components/shared/Collection";
import { navLinks } from "@/constants";
import { getAllImages } from "@/lib/actions /image.actions";
import Image from "next/image";
import Link from "next/link";

const Home = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      {/* Hero Banner */}
      <section className="hidden sm:flex flex-col justify-center items-center h-[280px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-10 shadow-xl text-white gap-6 w-full">
        <h1 className="text-4xl font-extrabold text-center max-w-3xl">
          Unleash Your Creative Vision with SmartCut
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-8">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex flex-col items-center transition-transform duration-200 hover:scale-105"
            >
              <div className="bg-white p-4 rounded-full shadow-lg">
                <Image src={link.icon} alt={link.label} width={28} height={28} />
              </div>
              <p className="mt-2 text-sm font-medium text-white">{link.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Edits Section */}
      <section className="mt-10 sm:mt-16 px-4 sm:px-6 lg:px-8">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  );
};

export default Home;
