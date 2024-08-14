import Image from "next/image";
import { Alert } from "~/components/ui/alert";

export const EssayNavbar = ({ spots }: { spots: number }) => {
  return (
    <nav className="w-full p-3 font-semibold bg-[#E8E8E3] flex justify-center sticky top-0 z-50 tracking-wider">
      <div className="max-w-6xl w-full flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/rhetoric-go.webp"
            alt="Rhetoric-Go Logo"
            className="mr-2"
            width={30}
            height={30}
          />
          <h1 className="text-xl">RhetoricGo</h1>
        </div>
        <Remaining spots={spots} />
      </div>
    </nav>
  );
};

const Remaining = async ({ spots }: { spots: number }) => {
  return (
    <Alert className="w-auto p-2 text-sm font-normal bg-[#E8E8E3] border-2 border-[#D8D8D3]">
      Remaining Spots: <span className="font-bold">{spots}</span>
    </Alert>
  );
};
