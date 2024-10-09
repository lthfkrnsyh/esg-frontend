"use client";
import React, { useEffect, useState } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { RoleModel } from "@/app/home/users/page";

interface UserModalProps {
  token: string; // Definisikan tipe token sebagai string
  onSubmitCallback: () => void;
}

const ModalAddGhg: React.FC<UserModalProps> = ({
  token,
  onSubmitCallback,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [Listrik, setListrik] = useState("");
  const [SolarDieselB30, setSolarDieselB30] = useState("");
  const [NaturalGas, setNaturalGas] = useState("");
  const [SolarDieselB35, setSolarDieselB35] = useState("");
  const [BensinPetrol, setBensinPetrol] = useState("");
  const [GRK, setGRK] = useState("");
  const [EnergyGJ, setEnergyGJ] = useState("");
  const [PenggunaanREC, setPenggunaanREC] = useState("");
  const [TotalAkhirGRK, setTotalAkhirGRK] = useState("");
  const [PersentaseReduceGRK, setPersentaseReduceGRK] = useState("");
  const [TotalAkhirEnergyGJ, setTotalAkhirEnergyGJ] = useState("");
  const [TotalRenewableEnergyGJ, setTotalRenewableEnergyGJ] = useState("");
  const [PersentaseRenewableEnergy, setPersentaseRenewableEnergy] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);

  const accidentRepos = new AccidentRepository();

  const handleSubmitInsert = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {  
      year: year,
      month: month,
      Listrik: Listrik,
      SolarDieselB30: SolarDieselB30,
      NaturalGas: NaturalGas,
      SolarDieselB35: SolarDieselB35,
      BensinPetrol: BensinPetrol,
      GRK: GRK,
      EnergyGJ: EnergyGJ,
      PenggunaanREC: PenggunaanREC,
      TotalAkhirGRK: TotalAkhirGRK,
      PersentaseReduceGRK: PersentaseReduceGRK,
      TotalAkhirEnergyGJ: TotalAkhirEnergyGJ,
      TotalRenewableEnergyGJ: TotalRenewableEnergyGJ,
      PersentaseRenewableEnergy: PersentaseRenewableEnergy,
    };
    const response = await accidentRepos.insertGhg(token, data);
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

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  const generateYearOptions = () => {
    const startYear = 2019;
    const currentYear = getCurrentYear();
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  const calculateValues = () => {
    // Implementasikan logika perhitungan di sini
    // Contoh perhitungan, ganti dengan logika yang sesuai
    const calculatedGRK = parseFloat(Listrik) * 0.5 + parseFloat(SolarDieselB30) * 0.7 + parseFloat(NaturalGas) * 0.8 + parseFloat(SolarDieselB35) * 0.6 + parseFloat(BensinPetrol) * 0.9;
    const calculatedEnergyGJ = parseFloat(Listrik) * 0.0036 + parseFloat(SolarDieselB30) * 0.0386 + parseFloat(NaturalGas) * 1.055 + parseFloat(SolarDieselB35) * 0.0386 + parseFloat(BensinPetrol) * 0.0342;
    const calculatedTotalAkhirGRK = calculatedGRK - parseFloat(PenggunaanREC);
    const calculatedPersentaseReduceGRK = ((calculatedGRK - calculatedTotalAkhirGRK) / calculatedGRK) * 100;
    const calculatedTotalAkhirEnergyGJ = calculatedEnergyGJ - parseFloat(PenggunaanREC);
    const calculatedTotalRenewableEnergyGJ = parseFloat(PenggunaanREC);
    const calculatedPersentaseRenewableEnergy = (calculatedTotalRenewableEnergyGJ / calculatedTotalAkhirEnergyGJ) * 100;

    setGRK(calculatedGRK.toFixed(2));
    setEnergyGJ(calculatedEnergyGJ.toFixed(2));
    setTotalAkhirGRK(calculatedTotalAkhirGRK.toFixed(2));
    setPersentaseReduceGRK(calculatedPersentaseReduceGRK.toFixed(2));
    setTotalAkhirEnergyGJ(calculatedTotalAkhirEnergyGJ.toFixed(2));
    setTotalRenewableEnergyGJ(calculatedTotalRenewableEnergyGJ.toFixed(2));
    setPersentaseRenewableEnergy(calculatedPersentaseRenewableEnergy.toFixed(2));

    setIsCalculated(true);
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
              <select
                id="year"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              >
                <option value="">Pilih Tahun</option>
                {generateYearOptions().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <select
                id="month"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
              >
                <option value="">Pilih Bulan</option>
                <option value="Januari">Januari</option>
                <option value="Februari">Februari</option>
                <option value="Maret">Maret</option>
                <option value="April">April</option>
                <option value="Mei">Mei</option>
                <option value="Juni">Juni</option>
                <option value="Juli">Juli</option>
                <option value="Agustus">Agustus</option>
                <option value="September">September</option>
                <option value="Oktober">Oktober</option>
                <option value="November">November</option>
                <option value="Desember">Desember</option>
              </select>

              <input
                type="number"
                id="Listrik"
                placeholder="Listrik pihak ke-3 (KWH)"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={Listrik}
                onChange={(e) => setListrik(e.target.value)}
                step="0.01"
                min={0}
                required
              />

              <input
                type="number"
                id="SolarDieselB30"
                placeholder="Solar / Diesel B30 (Liter)"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={SolarDieselB30}
                onChange={(e) => setSolarDieselB30(e.target.value)}
                step="0.01"
                min={0}
                required
              />

              <input
                type="number"
                id="NaturalGas"
                placeholder="Natural Gas (MMBTU)"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={NaturalGas}
                onChange={(e) => setNaturalGas(e.target.value)}
                step="0.01"
                min={0}
                required
              />
              <input
                type="number"
                id="SolarDieselB35"
                placeholder="Solar / Diesel B35 (Liter)"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={SolarDieselB35}
                onChange={(e) => setSolarDieselB35(e.target.value)}
                step="0.01"
                min={0}
                required
              />
              <input
                type="number"
                id="BensinPetrol"
                placeholder="Bensin/Petrol 100% (Liter)"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={BensinPetrol}
                onChange={(e) => setBensinPetrol(e.target.value)}
                step="0.01"
                min={0}
                required
              />
              <input
                type="number"
                id="PenggunaanREC"
                placeholder="Penggunaan REC (MWH)"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={PenggunaanREC}
                onChange={(e) => setPenggunaanREC(e.target.value)}
                step="0.01"
                min={0}
                required
              />

              <button
                type="button"
                onClick={calculateValues}
                className="btn btn-success btn-outline rounded-lg w-1/5 mt-3"
              >
                Calculate
              </button>

              <input
                type="number"
                id="GRK"
                placeholder="GRK (Ton CO₂)"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={GRK}
                readOnly
                required
              />
              <input
                type="number"
                id="EnergyGJ"
                placeholder="Energy (GJ)"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={EnergyGJ}
                readOnly
                required
              />
              <input
                type="number"
                id="TotalAkhirGRK"
                placeholder="Total Akhir GRK (Ton CO₂)"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={TotalAkhirGRK}
                readOnly
                required
              />
              <input
                type="number"
                id="PersentaseReduceGRK"
                placeholder="Persentase reduce GRK (%)"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={PersentaseReduceGRK}
                readOnly
                required
              />
              <input
                type="number"
                id="TotalAkhirEnergyGJ"
                placeholder="Total Akhir Energy (GJ)"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={TotalAkhirEnergyGJ}
                readOnly
                required
              />
              <input
                type="number"
                id="TotalRenewableEnergyGJ"
                placeholder="Total Renewable Energy (GJ)"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={TotalRenewableEnergyGJ}
                readOnly
                required
              />
              <input
                type="number"
                id="PersentaseRenewableEnergy"
                placeholder="Persentase Renewable Energy (%)"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={PersentaseRenewableEnergy}
                readOnly
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
                disabled={!isCalculated}
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

export default ModalAddGhg;
