"use client";
import React, { useEffect, useState } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { RoleModel } from "@/app/home/users/page";

interface UserModalProps {
  token: string;
  onSubmitCallback: () => void;
}

const ModalAddIntensitasAir: React.FC<UserModalProps> = ({
  token,
  onSubmitCallback,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [productFinishGood, setProductFinishGood] = useState("");
  const [airPermukaan, setAirPermukaan] = useState("");
  const [airTanah, setAirTanah] = useState("");
  const [airPam, setAirPam] = useState("");
  const [date, setDate] = useState("");

  const accidentRepos = new AccidentRepository();

  const handleSubmitInsert = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        product_finish_good: productFinishGood,
        air_permukaan: airPermukaan,
        air_tanah: airTanah,
        air_pam: airPam,
        date: date,
      };
      const response = await accidentRepos.insertIntensitasAir(token, data);
      handleCallBack();
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  const handleCallBack = () => {
    onSubmitCallback();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-circle btn-warning"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>

      <dialog id="my_modal_4" className="modal" open={isOpen}>
        <div className="modal-box w-11/12 max-w-5xl rounded-lg">
          <h3 className="font-bold text-lg w-full ">Add Report</h3>
          <form method="post" onSubmit={handleSubmitInsert}>
            <div className="m-2">
              <input
                type="number"
                id="productFinishGood"
                placeholder="Product Finish Good"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={productFinishGood}
                onChange={(e) => setProductFinishGood(e.target.value)}
                step="0.01"
                min="0"
                required
              />

              <input
                type="number"
                id="airPermukaan"
                placeholder="Air Permukaan"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={airPermukaan}
                onChange={(e) => setAirPermukaan(e.target.value)}
                step="0.01"
                min="0"
                required
              />

              <input
                type="number"
                id="airTanah"
                placeholder="Air Tanah"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={airTanah}
                onChange={(e) => setAirTanah(e.target.value)}
                step="0.01"
                min="0"
                required
              />

              <input
                type="number"
                id="airPam"
                placeholder="Air Pam"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={airPam}
                onChange={(e) => setAirPam(e.target.value)}
                step="0.01"
                min="0"
                required
              />

              <input
                type="date"
                id="date"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="modal-action">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn rounded-lg btn-error btn-outline w-1/6"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-success btn-outline rounded-lg w-1/5"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ModalAddIntensitasAir;