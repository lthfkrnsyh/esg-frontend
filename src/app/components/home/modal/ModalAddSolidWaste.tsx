"use client";
import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { RoleModel } from "@/app/home/users/page";

interface UserModalProps {
  token: string;
  onSubmitCallback: () => void;
}

const ModalAddSolidWaste: React.FC<UserModalProps> = ({
  token,
  onSubmitCallback,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [limbahPlastikNonB3Disposed, setLimbahPlastikNonB3Disposed] = useState("");
  const [limbahDomestikNonPlastikNonB3Disposed, setLimbahDomestikNonPlastikNonB3Disposed] = useState("");
  const [limbahIndustriNonPlastikNonB3Disposed, setLimbahIndustriNonPlastikNonB3Disposed] = useState("");
  const [limbahPadatB3Disposed, setLimbahPadatB3Disposed] = useState("");
  const [totalLimbahPadatDisposed, setTotalLimbahPadatDisposed] = useState("");
  const [limbahPlastikNonB3Diverted, setLimbahPlastikNonB3Diverted] = useState("");
  const [limbahDomestikNonPlastikNonB3Diverted, setLimbahDomestikNonPlastikNonB3Diverted] = useState("");
  const [limbahIndustriNonPlastikNonB3Diverted, setLimbahIndustriNonPlastikNonB3Diverted] = useState("");
  const [limbahPadatB3Diverted, setLimbahPadatB3Diverted] = useState("");
  const [totalLimbahPadatDiverted, setTotalLimbahPadatDiverted] = useState("");
  const [totalLimbahPadat, setTotalLimbahPadat] = useState("");
  const [percentageDiverted, setPercentageDiverted] = useState("");
  const [date, setDate] = useState("");
  const [unit, setUnit] = useState("KG");

  const accidentRepos = new AccidentRepository();

  const handleCalculate = () => {
    const disposedTotal =
      parseFloat(limbahPlastikNonB3Disposed) +
      parseFloat(limbahDomestikNonPlastikNonB3Disposed) +
      parseFloat(limbahIndustriNonPlastikNonB3Disposed) +
      parseFloat(limbahPadatB3Disposed);
    
    const divertedTotal =
      parseFloat(limbahPlastikNonB3Diverted) +
      parseFloat(limbahDomestikNonPlastikNonB3Diverted) +
      parseFloat(limbahIndustriNonPlastikNonB3Diverted) +
      parseFloat(limbahPadatB3Diverted);
    
    const totalPadat = disposedTotal + divertedTotal;
    const percentage = (divertedTotal / totalPadat) * 100 || 0;

    setTotalLimbahPadatDisposed(disposedTotal.toString());
    setTotalLimbahPadatDiverted(divertedTotal.toString());
    setTotalLimbahPadat(totalPadat.toString());
    setPercentageDiverted(percentage.toString());
  };

  const handleSubmitInsert = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        limbah_plastik_non_b3_disposed: limbahPlastikNonB3Disposed,
        limbah_domestik_non_plastik_non_b3_disposed: limbahDomestikNonPlastikNonB3Disposed,
        limbah_industri_non_plastik_non_b3_disposed: limbahIndustriNonPlastikNonB3Disposed,
        limbah_padat_b3_disposed: limbahPadatB3Disposed,
        total_limbah_padat_disposed: totalLimbahPadatDisposed,
        limbah_plastik_non_b3_diverted: limbahPlastikNonB3Diverted,
        limbah_domestik_non_plastik_non_b3_diverted: limbahDomestikNonPlastikNonB3Diverted,
        limbah_industri_non_plastik_non_b3_diverted: limbahIndustriNonPlastikNonB3Diverted,
        limbah_padat_b3_diverted: limbahPadatB3Diverted,
        total_limbah_padat_diverted: totalLimbahPadatDiverted,
        total_limbah_padat: totalLimbahPadat,
        percentage_diverted: percentageDiverted,
        date: date,
      };
      const response = await accidentRepos.insertSolidWaste(token, data);
      handleCallBack();
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  const handleCallBack = async () => {
    onSubmitCallback();
    setIsOpen(false);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
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
            <div className="m-2 grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <h4 className="font-bold mt-4">Limbah Plastik Non B3 Disposed</h4>
                <input
                  type="number"
                  id="limbahPlastikNonB3Disposed"
                  placeholder="Limbah Plastik Non B3 Disposed"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={limbahPlastikNonB3Disposed}
                  onChange={(e) => setLimbahPlastikNonB3Disposed(e.target.value)}
                  min={0}
                  required
                />
              </div>
              <div>
                <h4 className="font-bold mt-4">Satuan</h4>
                <select
                  id="unit"
                  className="select select-bordered w-full rounded-lg mt-3"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                >
                  <option value="Ton">Ton</option>
                  <option value="KG">KG</option>
                </select>
              </div>

              <div className="col-span-2">
                <h4 className="font-bold mt-4">Limbah Domestik Non Plastik Non B3 Disposed</h4>
                <input
                  type="number"
                  id="limbahDomestikNonPlastikNonB3Disposed"
                  placeholder="Limbah Domestik Non Plastik Non B3 Disposed"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={limbahDomestikNonPlastikNonB3Disposed}
                  onChange={(e) => setLimbahDomestikNonPlastikNonB3Disposed(e.target.value)}
                  min={0}
                  required
                />
              </div>
              <div>
                <h4 className="font-bold mt-4">Satuan</h4>
                <select
                  id="unit"
                  className="select select-bordered w-full rounded-lg mt-3"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                >
                  <option value="Ton">Ton</option>
                  <option value="KG">KG</option>
                </select>
              </div>

              <div className="col-span-2">
                <h4 className="font-bold mt-4">Limbah Industri Non Plastik Non B3 Disposed</h4>
                <input
                  type="number"
                  id="limbahIndustriNonPlastikNonB3Disposed"
                  placeholder="Limbah Industri Non Plastik Non B3 Disposed"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={limbahIndustriNonPlastikNonB3Disposed}
                  onChange={(e) => setLimbahIndustriNonPlastikNonB3Disposed(e.target.value)}
                  min={0}
                  required
                />
              </div>
              <div>
                <h4 className="font-bold mt-4">Satuan</h4>
                <select
                  id="unit"
                  className="select select-bordered w-full rounded-lg mt-3"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                >
                  <option value="Ton">Ton</option>
                  <option value="KG">KG</option>
                </select>
              </div>

              <div className="col-span-2">
                <h4 className="font-bold mt-4">Limbah Padat B3 Disposed</h4>
                <input
                  type="number"
                  id="limbahPadatB3Disposed"
                  placeholder="Limbah Padat B3 Disposed"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={limbahPadatB3Disposed}
                  onChange={(e) => setLimbahPadatB3Disposed(e.target.value)}
                  min={0}
                  required
                />
              </div>
              <div>
                <h4 className="font-bold mt-4">Satuan</h4>
                <select
                  id="unit"
                  className="select select-bordered w-full rounded-lg mt-3"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                >
                  <option value="Ton">Ton</option>
                  <option value="KG">KG</option>
                </select>
              </div>

              <div className="col-span-2">
                <h4 className="font-bold mt-4">Limbah Plastik Non B3 Diverted</h4>
                <input
                  type="number"
                  id="limbahPlastikNonB3Diverted"
                  placeholder="Limbah Plastik Non B3 Diverted"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={limbahPlastikNonB3Diverted}
                  onChange={(e) => setLimbahPlastikNonB3Diverted(e.target.value)}
                  min={0}
                  required
                />
              </div>
              <div>
                <h4 className="font-bold mt-4">Satuan</h4>
                <select
                  id="unit"
                  className="select select-bordered w-full rounded-lg mt-3"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                >
                  <option value="Ton">Ton</option>
                  <option value="KG">KG</option>
                </select>
              </div>

              <div className="col-span-2">
                <h4 className="font-bold mt-4">Limbah Domestik Non Plastik Non B3 Diverted</h4>
                <input
                  type="number"
                  id="limbahDomestikNonPlastikNonB3Diverted"
                  placeholder="Limbah Domestik Non Plastik Non B3 Diverted"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={limbahDomestikNonPlastikNonB3Diverted}
                  onChange={(e) => setLimbahDomestikNonPlastikNonB3Diverted(e.target.value)}
                  min={0}
                  required
                />
              </div>
              <div>
                <h4 className="font-bold mt-4">Satuan</h4>
                <select
                  id="unit"
                  className="select select-bordered w-full rounded-lg mt-3"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                >
                  <option value="Ton">Ton</option>
                  <option value="KG">KG</option>
                </select>
              </div>

              <div className="col-span-2">
                <h4 className="font-bold mt-4">Limbah Industri Non Plastik Non B3 Diverted</h4>
                <input
                  type="number"
                  id="limbahIndustriNonPlastikNonB3Diverted"
                  placeholder="Limbah Industri Non Plastik Non B3 Diverted"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={limbahIndustriNonPlastikNonB3Diverted}
                  onChange={(e) => setLimbahIndustriNonPlastikNonB3Diverted(e.target.value)}
                  min={0}
                  required
                />
              </div>
              <div>
                <h4 className="font-bold mt-4">Satuan</h4>
                <select
                  id="unit"
                  className="select select-bordered w-full rounded-lg mt-3"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                >
                  <option value="Ton">Ton</option>
                  <option value="KG">KG</option>
                </select>
              </div>

              <div className="col-span-2">
                <h4 className="font-bold mt-4">Limbah Padat B3 Diverted</h4>
                <input
                  type="number"
                  id="limbahPadatB3Diverted"
                  placeholder="Limbah Padat B3 Diverted"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={limbahPadatB3Diverted}
                  onChange={(e) => setLimbahPadatB3Diverted(e.target.value)}
                  min={0}
                  required
                />
              </div>
              <div>
                <h4 className="font-bold mt-4">Satuan</h4>
                <select
                  id="unit"
                  className="select select-bordered w-full rounded-lg mt-3"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                >
                  <option value="Ton">Ton</option>
                  <option value="KG">KG</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <h4 className="font-bold mt-4">Total Limbah Padat Disposed</h4>
                <input
                  type="number"
                  id="totalLimbahPadatDisposed"
                  placeholder="Total Limbah Padat Disposed"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={totalLimbahPadatDisposed}
                  readOnly
                />
              </div>

              <div className="col-span-2">
                <h4 className="font-bold mt-4">Total Limbah Padat Diverted</h4>
                <input
                  type="number"
                  id="totalLimbahPadatDiverted"
                  placeholder="Total Limbah Padat Diverted"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={totalLimbahPadatDiverted}
                  readOnly
                />
              </div>

              <div className="col-span-2">
                <h4 className="font-bold mt-4">Total Limbah Padat</h4>
                <input
                  type="number"
                  id="totalLimbahPadat"
                  placeholder="Total Limbah Padat"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={totalLimbahPadat}
                  readOnly
                />
              </div>

              <div className="col-span-2">
                <h4 className="font-bold mt-4">Persentase Diverted</h4>
                <input
                  type="number"
                  id="percentageDiverted"
                  placeholder="Persentase Diverted"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value='{percentageDiverted}'
                  readOnly
                />
              </div>

              <div className="col-span-2">
                <h4 className="font-bold mt-4">Date</h4>
                <input
                  type="date"
                  id="date"
                  placeholder="Date"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={date}
                  onChange={handleDateChange}
                  required
                />
              </div>

              <div className="col-span-2">
              <h4 className="font-bold mt-4">Calculate (Mencari nilai Total)</h4>
              <button type="button" className="btn mt-4" onClick={handleCalculate}>
                Calculate
              </button>
              </div>
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={() => setIsOpen(false)}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ModalAddSolidWaste;
