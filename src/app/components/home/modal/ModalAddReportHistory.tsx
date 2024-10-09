"use client";
import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { RoleModel } from "@/app/home/users/page";

interface ReportHistoryProps {
  token: string; // Definisikan tipe token sebagai string
  onSubmitCallback: () => void;
}

const ModalAddReportHistory: React.FC<ReportHistoryProps> = ({
  token,
  onSubmitCallback,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [frequncyKecelakaan, setFrequncyKecelakaan] = useState("");
  const [mhWorkedHilang, setMhWorkedHilang] = useState("");
  const [mhWorkedTersedia, setMhWorkedTersedia] = useState("");
  const [hariKerjaHilang, setHariKerjaHilang] = useState("");
  const [hariKerjaTersedia, setHariKerjaTersedia] = useState("");
  const [jumlahKaryawan, setJumlahKaryawan] = useState("");
  const [persenMhWorkedHilang, setPersenMhWorkedHilang] = useState("");
  const [frequencyRate, setFrequencyRate] = useState("");
  const [severityRate, setSeverityRate] = useState("");
  const [costKecelakaaKerja, setCostKecelakaaKerja] = useState("");
  const [kecTampaHariHilang, setKecTampaHariHilang] = useState("");
  const [kecDgHariHilang, setKecDgHariHilang] = useState("");
  const [dataInput, setDateInput] = useState("");

  const accidentRepos = new AccidentRepository();

  const handleSubmitInsert = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await accidentRepos.insertReportHistory(token, {
        frequncy_kecelakaan: frequncyKecelakaan,
        mh_worked_hilang: mhWorkedHilang,
        mh_worked_tersedia: mhWorkedTersedia,
        hari_kerja_hilang: hariKerjaHilang,
        hari_kerja_tersedia: hariKerjaTersedia,
        jumlah_karyawan: jumlahKaryawan,
        persen_mh_worked_hilang: persenMhWorkedHilang,
        frequency_rate: frequencyRate,
        severity_rate: severityRate,
        cost_kecelakaa_kerja: costKecelakaaKerja,
        kec_tampa_hari_hilang: kecTampaHariHilang,
        kec_dg_hari_hilang: kecDgHariHilang,
        data_input: dataInput,
      });
      handleCallBack();
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error("Error submitting report:", error);
    }
  };

  const handleCallBack = async () => {
    onSubmitCallback();
    setIsOpen(false);
  };
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateInput(event.target.value);
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
                id="frequncyKecelakaan"
                placeholder="Frequency Kecelakaan"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={frequncyKecelakaan}
                onChange={(e) => setFrequncyKecelakaan(e.target.value)}
                step="0.01"
                min="0"
                required
              />

              <input
                type="number"
                id="mhWorkedHilang"
                placeholder="M H Worked yang hilang"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={mhWorkedHilang}
                onChange={(e) => setMhWorkedHilang(e.target.value)}
                step="0.01"
                min="0"
                required
              />

              <input
                type="number"
                id="mhWorkedTersedia"
                placeholder="M H Worked yang tersedia"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={mhWorkedTersedia}
                onChange={(e) => setMhWorkedTersedia(e.target.value)}
                step="0.01"
                min="0"
                required
              />

              <input
                type="number"
                id="hariKerjaHilang"
                placeholder="Hari Kerja yang Hilang"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={hariKerjaHilang}
                onChange={(e) => setHariKerjaHilang(e.target.value)}
                step="0.01"
                min="0"
                required
              />

              <input
                type="number"
                id="hariKerjaTersedia"
                placeholder="Hari Kerja yang tersedia"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={hariKerjaTersedia}
                onChange={(e) => setHariKerjaTersedia(e.target.value)}
                step="0.01"
                min="0"
                required
              />

              <input
                type="number"
                id="jumlahKaryawan"
                placeholder="Jumlah Karyawan"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={jumlahKaryawan}
                onChange={(e) => setJumlahKaryawan(e.target.value)}
                step="0.01"
                min="0"
                required
              />

              <input
                type="number"
                id="persenMhWorkedHilang"
                placeholder="% M H Worked yg hilang"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={persenMhWorkedHilang}
                onChange={(e) => setPersenMhWorkedHilang(e.target.value)}
                step="0.01"
                min="0"
                required
              />
              <input
                type="number"
                id="frequencyRate"
                placeholder="Frequency Rate (FR)"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={frequencyRate}
                onChange={(e) => setFrequencyRate(e.target.value)}
                step="0.01"
                min="0"
                required
              />

              <input
                type="number"
                id="severityRate"
                placeholder="Severity Rate (SR)"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={severityRate}
                onChange={(e) => setSeverityRate(e.target.value)}
                step="0.01"
                min="0"
                required
              />

              <input
                type="number"
                id="costKecelakaaKerja"
                placeholder="Cost Kecelakaan Kerja"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={costKecelakaaKerja}
                onChange={(e) => setCostKecelakaaKerja(e.target.value)}
                step="0.01"
                min="0"
                required
              />

              <input
                type="number"
                id="kecTampaHariHilang"
                placeholder="Kec Tanpa Hari Hilang"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={kecTampaHariHilang}
                onChange={(e) => setKecTampaHariHilang(e.target.value)}
                step="0.01"
                min="0"
                required
              />

              <input
                type="number"
                id="kecDgHariHilang"
                placeholder="Kec Dg Hari Hilang"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={kecDgHariHilang}
                onChange={(e) => setKecDgHariHilang(e.target.value)}
                step="0.01"
                min="0"
                required
              />

              <input
                type="date"
                id="dataInput"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={dataInput}
                onChange={handleDateChange}
                required
              />
            </div>
            <div className="modal-action">
              {/* if there is a button, it will close the modal */}
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

export default ModalAddReportHistory;
