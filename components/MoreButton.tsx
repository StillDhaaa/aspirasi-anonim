"use client";

import { useEffect, useState } from "react";
import { Aspirasi } from "@/types";
import { CiCircleMore } from "react-icons/ci";
import { FaCheckCircle, FaCross } from "react-icons/fa";
import CardPesan from "@/app/admin/dashboard/CardPesan";
import { MdCancel, MdDelete } from "react-icons/md";
import AlertAction from "./AlertAction";

function MoreButton({
  pesan,
  isAdmin = false,
}: {
  pesan: Aspirasi;
  isAdmin?: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        <CiCircleMore className="text-primary absolute top-2 right-2 h-10 w-10 transition duration-300 ease-in-out hover:scale-110 active:scale-90" />
      </button>

      <div
        className={`fixed inset-0 z-1000 flex overflow-y-auto py-8 transition-all duration-500 ${
          isModalOpen
            ? "pointer-events-auto bg-white/30 opacity-100 backdrop-blur-sm"
            : "pointer-events-none bg-white/0 opacity-0 backdrop-blur-none"
        } `}
        onClick={() => setIsModalOpen(false)}
      >
        <div
          className={`z-1001 m-auto transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.26,1.55)] ${
            isModalOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-8 scale-50 opacity-0"
          } `}
          onClick={(e) => e.stopPropagation()}
        >
          <CardPesan pesan={pesan} isAdmin={isAdmin} pageComponent={false} />
          {isAdmin && (
            <div className="bg-accent-foreground mt-3 flex w-full items-center justify-between rounded-full px-7 py-4">
              <button disabled={pesan.status === "rejected"}>
                <AlertAction
                  action="rejected"
                  id={pesan.id}
                  image={pesan.image_url ?? ""}
                >
                  <MdCancel
                    className={`h-14 w-14 transition duration-300 ease-in-out hover:scale-110 active:scale-90 ${pesan.status === "rejected" ? "opacity-40" : "opacity-100"} text-orange-500`}
                  />
                </AlertAction>
              </button>

              <AlertAction
                action="delete"
                id={pesan.id}
                image={pesan.image_url ?? ""}
              >
                <MdDelete
                  className={`h-12 w-12 text-red-500 transition duration-300 ease-in-out hover:scale-110 active:scale-90`}
                />
              </AlertAction>

              <button disabled={pesan.status === "accepted"}>
                <AlertAction
                  action="accepted"
                  id={pesan.id}
                  image={pesan.image_url ?? ""}
                >
                  <FaCheckCircle
                    className={`h-12 w-12 transition duration-300 ease-in-out hover:scale-110 active:scale-90 ${pesan.status === "accepted" ? "opacity-40" : "opacity-100"} text-green-500`}
                  />
                </AlertAction>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MoreButton;
