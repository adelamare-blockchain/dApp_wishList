// Librairies
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

// FUNCTION NAVBAR
const NavBar = () => {
  return (
    <nav className='navbar'>
      {/* LOGO */}
      <div className='flex items-center grow'>
        <Link href='/'>
          <Image
            src='/logo.svg'
            width={270}
            height={80}
            alt='logo'
            className='max-w-full w-1/2 h-auto object-contain'
          />
        </Link>
      </div>

      {/* CONNECT BUTTON */}
      <div>
        <ConnectButton showBalance={false} />
      </div>
    </nav>
  );
};

export default NavBar;
