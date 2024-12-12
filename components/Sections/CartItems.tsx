"use client";

import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { useCartStore } from "@/providers/cart-store";
import CartItem from "@/components/Sections/CartItem";
import { addRequest, deleteRequest, fetchRequests } from "@/lib/data";

import { RequestType } from "@/lib/definitions";
import { useAuth } from "@/providers/auth-store-provider";
import AdminAnswer from "@/components/Sections/AdminAnswer";

const CartItems = () => {
  const { items } = useCartStore();
  const { user, isAdmin } = useAuth();
  const [requests, setRequests] = useState<RequestType[] | null>(null);
  const [requestMessage, setRequestMessage] = useState("");

  const fetchData = async () => {
    // console.log(isAdmin, user);
    try {
      if (isAdmin) {
        const data: RequestType[] = await fetchRequests(user!.email!, "all");

        setRequests(data);
      } else if (user?.email) {
        const data: RequestType[] = await fetchRequests(user.email);

        setRequests(data);
      }
    } catch (error) {
      console.error("Failed to fetch requests2:", error);
    }
    return;
  };

  const handleSubmit = async () => {
    const { message } = await addRequest(
      // [{ id: 7, count: 10 }]
      items,
      requestMessage,
      user?.email || "",
      "trimis",
    );

    alert(message);
    await fetchData();
  };
  const loadData = async () => {
    await fetchData();
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={"p-3 flex flex-col gap-1 mt-5"}>
      {items.map((item) => (
        <CartItem key={item.id} isEditable={true} item={item} />
      ))}
      {items.length > 0 ? (
        <div>
          <Input
            className={"my-2"}
            color={"primary"}
            placeholder={"Introduceti un mesaj"}
            type={"text"}
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
          />

          <Button
            className={"mt-5"}
            color={"primary"}
            isDisabled={!user}
            onClick={handleSubmit}
          >
            Trimite cererea de oferta
          </Button>
          {!user && (
            <h1>
              Va rugam sa intrati in cont pentru a trimite o cerere de oferta
            </h1>
          )}
        </div>
      ) : (
        <h1>
          Va rugam sa adaugati materialele dorite in cosul de cumparaturi pentru
          a putea trimite o cerere de oferta
        </h1>
      )}
      <div className={"mt-2 "}>
        {requests && (
          <h1 className={"text-center m-3 font-extrabold text-2xl"}>
            Istoric cereri
          </h1>
        )}
        {requests &&
          Array.isArray(requests) &&
          requests.map((request) => (
            <div
              key={request.id}
              className={
                "bg-gray-800 mb-3 p-2 flex flex-col gap-2 text-white rounded-md"
              }
            >
              <div className={"flex justify-between"}>
                <h1>Cerere: {request.message}</h1>
                <h2>{request.email}</h2>
              </div>
              {request.items.map((item) => {
                return (
                  <CartItem key={item.id} isEditable={false} item={item} />
                );
              })}
              {request.answer && <h1>Raspuns: {request.answer}</h1>}
              {isAdmin && !request.answer && (
                <AdminAnswer fetchData={fetchData} id={request.id} />
              )}
              <Button
                color={"danger"}
                variant={"ghost"}
                onClick={() => {
                  deleteRequest(request.id).then(() => {
                    fetchData();
                  });
                }}
              >
                Sterge
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CartItems;
