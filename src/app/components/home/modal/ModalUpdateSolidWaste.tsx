"use client";

import React, { FormEvent, useState, ChangeEvent  } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { SolidWasteModel } from "@/app/home/solidwaste/page";

interface UserModalProps {
  isOpen: boolean;
  data: SolidWasteModel;
  token: string; // Definisikan tipe token sebagai string
  onSubmitCallback: () => void;
}

const ModalUpdateSolidWaste: React.FC<UserModalProps> = ({
  isOpen,
  data,
  token,
  onSubmitCallback,
}) => {
  const [limbahPlastikNonB3Disposed, setLimbahPlastikNonB3Disposed] = useState(
    data.limbah_plastik_non_b3_disposed || "0"
  );
  const [limbahDomestikNonPlastikNonB3Disposed, setLimbahDomestikNonPlastikNonB3Disposed] = useState(
    data.limbah_domestik_non_plastik_non_b3_disposed || "0"
  );
  const [limbahIndustriNonPlastikNonB3Disposed, setLimbahIndustriNonPlastikNonB3Disposed] = useState(
    data.limbah_industri_non_plastik_non_b3_disposed || "0");
  const [limbahB3Disposed, setLimbahB3Disposed] = useState(
    data.limbah_padat_b3_disposed || "0");
  const [totalLimbahPadatDisposed, setTotalLimbahPadatDisposed] = useState(
    data.total_limbah_padat_disposed || "0");
  const [limbahPlastikNonB3Diverted, setLimbahPlastikNonB3Diverted] = useState(
    data.limbah_plastik_non_b3_diverted || "0");
  const [limbahDomestikNonPlastikNonB3Diverted, setLimbahDomestikNonPlastikNonB3Diverted] = useState(
    data.limbah_domestik_non_plastik_non_b3_diverted || "0");
  const [limbahIndustriNonPlastikNonB3Diverted, setLimbahIndustriNonPlastikNonB3Diverted] = useState(
    data.limbah_industri_non_plastik_non_b3_diverted || "0");
  const [limbahB3Diverted, setLimbahB3Diverted] = useState(
    data.limbah_padat_b3_diverted || "0");
  const [totalLimbahPadatDiverted, setTotalLimbahPadatDiverted] = useState(
    data.total_limbah_padat_diverted || "0");
  const [totalLimbahPadat, setTotalLimbahPadat] = useState(
    data.total_limbah_padat || "0");
  const [percentageDiverted, setPercentageDiverted] = useState(
    data.percentage_diverted || "0"); 
  const [date, setDate] = useState(
    data.date || "");

  const accidentRepos = new AccidentRepository();

  const handleSubmitInsert = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const formData = new FormData();
        formData.append("limbah_plastik_non_b3_disposed", limbahPlastikNonB3Disposed.toString());
        formData.append("limbah_domestik_non_plastik_non_b3_disposed", limbahDomestikNonPlastikNonB3Disposed.toString());
        formData.append("limbah_industri_non_plastik_non_b3_disposed", limbahIndustriNonPlastikNonB3Disposed.toString());
        formData.append("limbah_padat_b3_disposed", limbahB3Disposed.toString());
        formData.append("total_limbah_padat_disposed", totalLimbahPadatDisposed.toString());
        formData.append("limbah_plastik_non_b3_diverted", limbahPlastikNonB3Diverted.toString());
        formData.append("limbah_domestik_non_plastik_non_b3_diverted", limbahDomestikNonPlastikNonB3Diverted.toString());
        formData.append("limbah_industri_non_plastik_non_b3_diverted", limbahIndustriNonPlastikNonB3Diverted.toString());
        formData.append("limbah_padat_b3_diverted", limbahB3Diverted.toString());
        formData.append("total_limbah_padat_diverted", totalLimbahPadatDiverted.toString());
        formData.append("total_limbah_padat", totalLimbahPadat.toString());
        formData.append("percentage_diverted", percentageDiverted.toString());
        formData.append("date", date.toString());
      
        await accidentRepos.updateIntensitasAir(token, data.id.toString(), formData);
      handleCallBack();
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error("Error submitting report:", error);
    }
  };

  const handleCallBack = async () => {
    onSubmitCallback();
  };
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-box w-11/12 max-w-5xl rounded-lg">
            <h3 className="font-bold text-lg w-full">Add Report</h3>
            <form method="post" onSubmit={handleSubmitInsert}>
              <div className="m-2">
              <input
                type="number"
                id="limbahPlastikNonB3Disposed"
                placeholder="Limbah Plastik Non B3 Disposed"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahPlastikNonB3Disposed}
                onChange={(e) => setLimbahPlastikNonB3Disposed(e.target.value)}
                required
              />

              <input
                type="number"
                id="limbahDomestikNonPlastikNonB3Disposed"
                placeholder="Limbah Domestik Non Plastik Non B3 Disposed"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahDomestikNonPlastikNonB3Disposed}
                onChange={(e) => setLimbahDomestikNonPlastikNonB3Disposed(e.target.value)}
                required
              />

              <input
                type="number"
                id="limbahIndustriNonPlastikNonB3Disposed"
                placeholder="Limbah Industri Non Plastik Non B3 Disposed"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahIndustriNonPlastikNonB3Disposed}
                onChange={(e) => setLimbahIndustriNonPlastikNonB3Disposed(e.target.value)}
                required
              />

              <input
                type="number"
                id="limbahB3Disposed"
                placeholder="Limbah B3 Disposed"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahB3Disposed}
                onChange={(e) => setLimbahB3Disposed(e.target.value)}
                required
              />
              <input
                type="number"
                id="totalLimbahPadatDisposed"
                placeholder="Total Limbah Padat Disposed"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={totalLimbahPadatDisposed}
                onChange={(e) => setTotalLimbahPadatDisposed(e.target.value)}
                required
              />

              <input
                type="number"
                id="limbahPlastikNonB3Diverted"
                placeholder="Limbah Plastik Non B3 Diverted"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahPlastikNonB3Diverted}
                onChange={(e) => setLimbahPlastikNonB3Diverted(e.target.value)}
                required
              />

              <input
                type="number"
                id="limbahDomestikNonPlastikNonB3Diverted"
                placeholder="Limbah Domestik Non Plastik Non B3 Diverted"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahDomestikNonPlastikNonB3Diverted}
                onChange={(e) => setLimbahDomestikNonPlastikNonB3Diverted(e.target.value)}
                required
              />

              <input
                type="number"
                id="limbahIndustriNonPlastikNonB3Diverted"
                placeholder="Limbah Industri Non Plastik Non B3 Diverted"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahIndustriNonPlastikNonB3Diverted}
                onChange={(e) => setLimbahIndustriNonPlastikNonB3Diverted(e.target.value)}
                required
              />
              <input
                type="number"
                id="limbahB3Diverted"
                placeholder="Limbah B3 Diverted"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={limbahB3Diverted}
                onChange={(e) => setLimbahB3Diverted(e.target.value)}
                required
              />
              <input
                type="number"
                id="totalLimbahPadatDiverted"
                placeholder="Total Limbah Padat Diverted"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={totalLimbahPadatDiverted}
                onChange={(e) => setTotalLimbahPadatDiverted(e.target.value)}
                required
              />
              <input
                type="number"
                id="totalLimbahPadat"
                placeholder="Total Limbah Padat"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={totalLimbahPadat}
                onChange={(e) => setTotalLimbahPadat(e.target.value)}
                required
              />
              <input
                type="number"
                id="percentageDiverted"
                placeholder="Percentage Diverted"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={percentageDiverted}
                onChange={(e) => setPercentageDiverted(e.target.value)}
                required
              />
                <input
                  type="date"
                  id="date"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={date}
                  onChange={handleDateChange}
                  required
                />
              </div>
              <div className="modal-action">
                {/* if there is a button, it will close the modal */}
                <button
                  type="button"
                  onClick={() => handleCallBack()}
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
        </div>
      )}
    </>
  );
};

export default ModalUpdateSolidWaste;