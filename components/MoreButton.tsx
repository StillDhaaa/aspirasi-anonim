"use client";

import { useEffect, useState } from "react";
import { Aspirasi } from "@/types";
import { CiCircleMore } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import CardPesan from "@/app/admin/dashboard/CardPesan";
import { MdCancel, MdDelete } from "react-icons/md";
import AlertAction from "./AlertAction";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

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

      {/* AnimatePresence mengurus kapan elemen dihapus dari DOM */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-1000 flex overflow-y-auto bg-white/30 py-8 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ y: 30, scale: 0.8, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 30, scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="z-1001 m-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Komponen ini HANYA diload ke HTML saat modal terbuka */}
              <CardPesan
                pesan={pesan}
                isAdmin={isAdmin}
                pageComponent={false}
              />

              {isAdmin && (
                <div className="bg-card-foreground mt-3 flex w-full items-center justify-between rounded-full px-7 py-4">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MoreButton;
