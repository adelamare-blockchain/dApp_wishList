"use client";
// Libriairies
import { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CopyIcon } from "@radix-ui/react-icons";

// components
import { contractAddress, contractABI } from "@/constants";
import Informations from "../Informations/Informations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatEther } from "viem";

const GetWishList = () => {
  // STATES
  // Variable 1 - friendAddress
  const [friendAddress, setFriendAddress] = useState("");

  // Variable 2 - enable
  const [enable, setEnable] = useState(false);

  // Variable 3 - useAccount
  const { address } = useAccount();

  // Variable 4  - useReadContract
  const { data: userWishList, refetch } = useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "getWishList",
    args: [friendAddress],
    query: {
      enabled: enable,
    },
    account: address,
  });

  // Buy Item
  const {
    data: hash,
    isPending,
    error,
    writeContract,
  } = useWriteContract();

  // METHODS
  // Method 1 - handleGetWishList
  const handleGetWishList = async () => {
    try {
      setEnable(true);
    } catch (error) {
      console.error("Erreur lors de l'appel de getWishList:", error);
    }
  };

  // Method 2 - handleBuyItem
  const handleBuyItem = async (id, price) => {
    try {
      if (!address) {
        console.error("User is not connected");
        return;
      }
      const hash = writeContract({
        abi: contractABI,
        address: contractAddress,
        functionName: "buyItem",
        args: [friendAddress, parseInt(id)],
        account: address,
        value: price,
      });
      console.log("Transaction hash:", hash);
    } catch (error) {
      console.error("Erreur lors de l'appel de getWishList:", error);
    }
  };

  // Method 3 - useWaitForTransactionReceipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash: hash });

  // Method 4 - copyToClipBoard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Address copied to clipboard:", text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // ComponentDidMount
  useEffect(() => {
    if (enable && friendAddress)
      refetch().catch((error) =>
        console.error(
          "Erreur lors de l'appel de getWishList: ",
          error
        )
      );
  }, [isConfirmed, friendAddress, enable]);

  return (
    <div className='get'>
      <div className='get_inner'>
        <h1 className='get_inner_title'>
          <span className='get_inner_title_colored'>
            Voir la WishList
          </span>{" "}
          de vos proches.
        </h1>
        <Card>
          <CardContent className='pt-5'>
            <div className='get_inner_form_item'>
              <Label htmlFor='friendAddress'>
                Address de votre proche :
              </Label>
              <Input
                type='text'
                id='friendAddress'
                placeholder='Ex: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
                onChange={(e) => setFriendAddress(e.target.value)}
              />
            </div>
            <Button
              disabled={isPending}
              variant='outline'
              className='get_inner_submit_button hover:bg-[#75fd38]'
              onClick={handleGetWishList}>
              {isPending ? "Pending..." : "Voir la WishList"}
            </Button>
          </CardContent>
        </Card>
        <Informations
          hash={hash}
          isConfirming={isConfirming}
          isConfirmed={isConfirmed}
          error={error}
        />
        {userWishList && (
          <Card className='mt-5'>
            <CardContent className='pt-5'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px]'>Id</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className='text-right'>
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userWishList.map((item) => {
                    return (
                      <TableRow key={item.itemId.toString()}>
                        <TableCell className='font-medium'>
                          <div className='inline-flex items-center space-x-2'>
                            {" "}
                            {item.itemId.toString()}
                          </div>
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <div className='inline-flex items-center space-x-2'>
                            {formatEther(item.price)} ETH
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.isBought ? (
                            <div className='flex items-center space-x-2'>
                              <div>Buyer:</div>
                              <div className='flex items-center space-x-2 bg-gray-200 text-gray-800 font-semibold rounded-xl p-1'>
                                <span className='truncate no-underline'>
                                  {`${item.buyer.slice(
                                    0,
                                    6
                                  )}...${item.buyer.slice(-4)}`}
                                </span>
                                <CopyIcon
                                  className='text-blue-600 hover:text-blue-800 ml-8 cursor-pointer'
                                  onClick={() =>
                                    copyToClipboard(item.buyer)
                                  }
                                  title="Copier l'\adresse"
                                />
                              </div>
                            </div>
                          ) : (
                            "Pas encore acheté"
                          )}
                        </TableCell>

                        <TableCell>
                          {item.isBought ? (
                            <Badge className='get_inner_badge_bought'>
                              Acheté
                            </Badge>
                          ) : (
                            <Badge className='get_inner_badge_not_bought'>
                              Pas acheté
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {!item.isBought && (
                            <Button
                              variant='outline'
                              className='get_inner_buy_button hover:bg-[#75fd38]'
                              onClick={() =>
                                handleBuyItem(
                                  item.itemId.toString(),
                                  item.price
                                )
                              }
                              disabled={
                                item.buyer.toLowerCase() ===
                                address.toLowerCase()
                              }>
                              Acheter
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GetWishList;
