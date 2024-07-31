"use client";
// Librairies
import { useAccount } from "wagmi";

// components
import NotConnected from "@/components/shared/NotConnected/NotConnected";
import AddToWishList from "@/components/shared/AddToWishList/AddToWishList";

const page = () => {
  // STATE VARIABLES
  // Variable 1 - isConnected
  const { isConnected } = useAccount();

  return (
    <div>{isConnected ? <AddToWishList /> : <NotConnected />}</div>
  );
};

export default page;
