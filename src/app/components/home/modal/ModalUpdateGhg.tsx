"use client";
import React, { FormEvent, useState } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { GhgModel } from "@/app/home/ghg/page";

interface GhgModalProps {
  isOpen: boolean;
  data: GhgModel;
  token: string; // Define the token type as a string
  onSubmitCallback: () => void;
}

const ModalUpdateGhg: React.FC<GhgModalProps> = ({
  isOpen,
  data,
  token,
  onSubmitCallback,
}) => {
  const [year, setYear] = useState(data.year || "0");
  const [month, setMonth] = useState(data.month || "");
  const [Listrik, setListrik] = useState(data.Listrik || "0");
  const [SolarDieselB30, setSolarDieselB30] = useState(data.SolarDieselB30 || "0");
  const [NaturalGas, setNaturalGas] = useState(data.NaturalGas || "0");
  const [SolarDieselB35, setSolarDieselB35] = useState(data.SolarDieselB35 || "0");
  const [BensinPetrol, setBensinPetrol] = useState(data.BensinPetrol || "0");
  const [GRK, setGRK] = useState(data.GRK || "0");
  const [EnergyGJ, setEnergyGJ] = useState(data.EnergyGJ || "0");
  const [PenggunaanREC, setPenggunaanREC] = useState(data.PenggunaanREC || "0");
  const [TotalAkhirGRK, setTotalAkhirGRK] = useState(data.TotalAkhirGRK || "0");
  const [PersentaseReduceGRK, setPersentaseReduceGRK] = useState(data.PersentaseReduceGRK || "0");
  const [TotalAkhirEnergyGJ, setTotalAkhirEnergyGJ] = useState(data.TotalAkhirEnergyGJ || "0");
  const [TotalRenewableEnergyGJ, setTotalRenewableEnergyGJ] = useState(data.TotalRenewableEnergyGJ || "0");
  const [PersentaseRenewableEnergy, setPersentaseRenewableEnergy] = useState(data.PersentaseRenewableEnergy || "0");

  const accidentRepos = new AccidentRepository();

  const handleSubmitInsert = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("year", year.toString());
      formData.append("month", month.toString());
      formData.append("Listrik", Listrik.toString());
      formData.append("SolarDieselB30", SolarDieselB30.toString());
      formData.append("NaturalGas", NaturalGas.toString());
      formData.append("SolarDieselB35", SolarDieselB35.toString());
      formData.append("BensinPetrol", BensinPetrol.toString());
      formData.append("GRK", GRK.toString());
      formData.append("EnergyGJ", EnergyGJ.toString());
      formData.append("PenggunaanREC", PenggunaanREC.toString());
      formData.append("TotalAkhirGRK", TotalAkhirGRK.toString());
      formData.append("PersentaseReduceGRK", PersentaseReduceGRK.toString());
      formData.append("TotalAkhirEnergyGJ", TotalAkhirEnergyGJ.toString());
      formData.append("TotalRenewableEnergyGJ", TotalRenewableEnergyGJ.toString());
      formData.append("PersentaseRenewableEnergy", PersentaseRenewableEnergy.toString());

      await accidentRepos.updateGhg(token, data.id.toString(), formData);
      handleCallBack();
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error("Error submitting report:", error);
    }
  };

  const handleCallBack = async () => {
    onSubmitCallback();
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
                  id="year"
                  placeholder="Tahun"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  min={2019}
                  required
                />

                <input
                  type="text"
                  id="month"
                  placeholder="Bulan"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                />

                <input
                  type="number"
                  id="Listrik"
                  placeholder="Listrik pihak ke-3 (KWH)"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={Listrik}
                  onChange={(e) => setListrik(e.target.value)}
                  step="0.01"
                  min="0"
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
                  min="0"
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
                  min="0"
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
                  min="0"
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
                  min="0"
                  required
                />
                <input
                  type="number"
                  id="GRK"
                  placeholder="GRK (Ton CO₂)"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={GRK}
                  onChange={(e) => setGRK(e.target.value)}
                  step="0.01"
                  min="0"
                  required
                />
                <input
                  type="number"
                  id="EnergyGJ"
                  placeholder="Energy (GJ)"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={EnergyGJ}
                  onChange={(e) => setEnergyGJ(e.target.value)}
                  step="0.01"
                  min="0"
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
                  min="0"
                  required
                />
                <input
                  type="number"
                  id="TotalAkhirGRK"
                  placeholder="Total Akhir GRK (Ton CO₂)"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={TotalAkhirGRK}
                  onChange={(e) => setTotalAkhirGRK(e.target.value)}
                  step="0.01"
                  min="0"
                  required
                />
                <input
                  type="number"
                  id="PersentaseReduceGRK"
                  placeholder="Persentase reduce GRK (%)"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={PersentaseReduceGRK}
                  onChange={(e) => setPersentaseReduceGRK(e.target.value)}
                  step="0.01"
                  min="0"
                  required
                />
                <input
                  type="number"
                  id="TotalAkhirEnergyGJ"
                  placeholder="Total Akhir Energy (GJ)"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={TotalAkhirEnergyGJ}
                  onChange={(e) => setTotalAkhirEnergyGJ(e.target.value)}
                  step="0.01"
                  min="0"
                  required
                />
                <input
                  type="number"
                  id="TotalRenewableEnergyGJ"
                  placeholder="Total Renewable Energy (GJ)"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={TotalRenewableEnergyGJ}
                  onChange={(e) => setTotalRenewableEnergyGJ(e.target.value)}
                  step="0.01"
                  min="0"
                  required
                />
                <input
                  type="number"
                  id="PersentaseRenewableEnergy"
                  placeholder="Persentase Renewable Energy (%)"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={PersentaseRenewableEnergy}
                  onChange={(e) => setPersentaseRenewableEnergy(e.target.value)}
                  step="0.01"
                  min="0"
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

export default ModalUpdateGhg;
