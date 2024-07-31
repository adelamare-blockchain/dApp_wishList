"use client";
// Libriairies
import { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

// components
import { contractAddress, contractABI } from "@/constants";
import Informations from "../Informations/Informations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { parseEther } from "viem";

const AddToWishList = () => {
  // STATES
  // Variable 1 - productName
  const [productName, setProductName] = useState("");
  // Variable 2 - productPrice
  const [productPrice, setProductPrice] = useState("");
  // Variable 3 - address
  const { address } = useAccount();

  console.log("Address : ", address);
  // Variable 4 - useWriteContract()
  const {
    data: hash,
    isPending,
    error,
    writeContract,
  } = useWriteContract();

  // METHODS
  // Method 1 - handleAddToWishList
  const handleAddToWishList = async () => {
    try {
      if (!address) {
        console.error("User is not connected");
        return;
      }
      const hash = writeContract({
        abi: contractABI,
        address: contractAddress,
        functionName: "addToWishList",
        args: [productName, parseEther(productPrice)],
        account: address,
      });

      console.log("Transaction hash:", hash);
    } catch (error) {
      console.error(
        "Erreur lors de l'appel de addToWishList:",
        error
      );
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash: hash });

  // Rendu JSX
  return (
    <div className='add'>
      <div className='add_inner'>
        <h1 className='add_inner_title'>
          <Informations
            hash={hash}
            isConfirming={isConfirming}
            isConfirmed={isConfirmed}
            error={error}
          />
          <span className='add_inner_title_colored'>
            Ajouter un élément
          </span>{" "}
          à votre WishList
        </h1>

        {/* PRODUCT */}
        <Card>
          {/* NAME */}
          <CardContent className='pt-5'>
            <div className='add_inner_form_item'>
              <Label htmlFor='productName'>Nom du produit</Label>
              <Input
                type='text'
                id='productName'
                placeholder='Audi A8'
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
          </CardContent>

          {/* PRICE */}
          <CardContent className='pt-5'>
            <div className='add_inner_form_item mt-5'>
              <Label htmlFor='productPrice'>Prix (en ETH)</Label>
              <Input
                type='number'
                id='productPrice'
                placeholder='0.01'
                step='0.01'
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>

            {/* BUTTON */}
            <Button
              variant='outline'
              disabled={isPending}
              className='add_inner_submit_button hover:bg-[#75fd38]'
              onClick={handleAddToWishList}>
              {isPending ? "Ajout..." : "Ajouter à votre WishList"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddToWishList;
