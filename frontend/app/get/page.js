"use client";
// Librairies
import { useAccount } from "wagmi";

// components
import NotConnected from "@/components/shared/NotConnected/NotConnected";
import GetWishList from "@/components/shared/GetWishList/GetWishList";

const page = () => {
  // STATE VARIABLES
  // Variable 1 - isConnected
  const { isConnected } = useAccount();

  return (
    <div>{isConnected ? <GetWishList /> : <NotConnected />}</div>
  );
};

export default page;
