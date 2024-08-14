import Image from "next/image";

export const EssayNavbar = () => {
  return (
    <nav className="w-full p-4 text-2xl font-semibold bg-[#E8E8E3] flex justify-center sticky top-0 z-50 tracking-wider">
      <div className="max-w-6xl w-full flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/rhetoric-go.webp"
            alt="Rhetoric-Go Logo"
            className="mr-2"
            width={50}
            height={50}
          />
          <p>RhetoricGo</p>
        </div>
        <p>stuff</p>
      </div>
    </nav>
  );
};
