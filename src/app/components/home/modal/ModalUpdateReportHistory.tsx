"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { ReportHistoryModel } from "@/app/home/report_history/page";

interface ReportHistoryProps {
  isOpen: boolean;
  data: ReportHistoryModel;
  token: string; // Definisikan tipe token sebagai string
  onSubmitCallback: () => void;
}

const ModalUpdateReportHistory: React.FC<ReportHistoryProps> = ({
  isOpen,
  data,
  token,
  onSubmitCallback,
}) => {
  const [frequncyKecelakaan, setFrequncyKecelakaan] = useState(
    data.frequncy_kecelakaan || "0"
  );
  const [mhWorkedHilang, setMhWorkedHilang] = useState(
    data.mh_worked_hilang || "0"
  );
  const [mhWorkedTersedia, setMhWorkedTersedia] = useState(
    data.mh_worked_tersedia || "0"
  );
  const [hariKerjaHilang, setHariKerjaHilang] = useState(
    data.hari_kerja_hilang || "0"
  );
  const [hariKerjaTersedia, setHariKerjaTersedia] = useState(
    data.hari_kerja_tersedia || "0"
  );
  const [jumlahKaryawan, setJumlahKaryawan] = useState(
    data.jumlah_karyawan || "0"
  );
  const [persenMhWorkedHilang, setPersenMhWorkedHilang] = useState(
    data.persen_mh_worked_hilang || "0"
  );
  const [frequencyRate, setFrequencyRate] = useState(data.frequency_rate || "0");
  const [severityRate, setSeverityRate] = useState(data.severity_rate || "0");
  const [costKecelakaaKerja, setCostKecelakaaKerja] = useState(
    data.cost_kecelakaa_kerja || "0"
  );
  const [kecTampaHariHilang, setKecTampaHariHilang] = useState(
    data.kec_tampa_hari_hilang || "0"
  );
  const [kecDgHariHilang, setKecDgHariHilang] = useState(
    data.kec_dg_hari_hilang || "0"
  );
  const [dataInput, setDateInput] = useState(
    data.data_input ? new Date(data.data_input).toISOString().split("T")[0] : ""
  );

  const accidentRepos = new AccidentRepository();

  const handleSubmitInsert = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("frequncy_kecelakaan", frequncyKecelakaan.toString());
      formData.append("mh_worked_hilang", mhWorkedHilang.toString());
      formData.append("mh_worked_tersedia", mhWorkedTersedia.toString());
      formData.append("hari_kerja_hilang", hariKerjaHilang.toString());
      formData.append("hari_kerja_tersedia", hariKerjaTersedia.toString());
      formData.append("jumlah_karyawan", jumlahKaryawan.toString());
      formData.append("persen_mh_worked_hilang", persenMhWorkedHilang.toString());
      formData.append("frequency_rate", frequencyRate.toString());
      formData.append("severity_rate", severityRate.toString());
      formData.append("cost_kecelakaa_kerja", costKecelakaaKerja.toString());
      formData.append("kec_tampa_hari_hilang", kecTampaHariHilang.toString());
      formData.append("kec_dg_hari_hilang", kecDgHariHilang.toString());
      formData.append("data_input", dataInput.toString());
      await accidentRepos.updateReportHistory(token, data.id.toString(), formData);
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
    setDateInput(event.target.value);
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-box w-11/12 max-w-5xl rounded-lg">
            <h3 className="font-bold text-lg w-full">Add Report</h3>
            <form method="post" onSubmit={handleSubmitInsert}>
              <div className="m-2">
                <div className="mt-3">
                  <span>Frequency Kecelakaan</span>
                  <input
                    type="number"
                    id="frequncyKecelakaan"
                    placeholder="Frequency  Kecelakaan"
                    className="input input-bordered w-full rounded-lg flex-1"
                    value={frequncyKecelakaan}
                    onChange={(e) => setFrequncyKecelakaan(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-3">
                  <span>M H Worked yg hilang</span>
                  <input
                    type="number"
                    id="mhWorkedHilang"
                    placeholder="M H  Worked  yg  hilang"
                    className="input input-bordered w-full rounded-lg flex-1"
                    value={mhWorkedHilang}
                    onChange={(e) => setMhWorkedHilang(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-3">
                  <span>M H Worked yg tersedia</span>
                  <input
                    type="number"
                    id="mhWorkedTersedia"
                    placeholder="M H  Worked  yg tersedia"
                    className="input input-bordered w-full rounded-lg flex-1"
                    value={mhWorkedTersedia}
                    onChange={(e) => setMhWorkedTersedia(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-3">
                  <span>Hari Kerja yg tersedia</span>
                  <input
                    type="number"
                    id="hariKerjaHilang"
                    placeholder="Hari  Kerja  yg  tersedia"
                    className="input input-bordered w-full rounded-lg flex-1"
                    value={hariKerjaHilang}
                    onChange={(e) => setHariKerjaHilang(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-3">
                  <span>Hari Kerja yg tersedia</span>
                  <input
                    type="number"
                    id="hariKerjaTersedia"
                    placeholder="Hari  Kerja  yg  tersedia"
                    className="input input-bordered w-full rounded-lg  flex-1"
                    value={hariKerjaTersedia}
                    onChange={(e) => setHariKerjaTersedia(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-3">
                  <span>Jumlah Karyawan</span>
                  <input
                    type="number"
                    id="jumlahKaryawan"
                    placeholder="Jumlah  Karyawan"
                    className="input input-bordered w-full rounded-lg  flex-1"
                    value={jumlahKaryawan}
                    onChange={(e) => setJumlahKaryawan(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-3">
                  <span>% M H Worked yg hilang</span>
                  <input
                    type="number"
                    id="persenMhWorkedHilang"
                    placeholder="% M H  Worked yg hilang"
                    className="input input-bordered w-full rounded-lg flex-1"
                    value={persenMhWorkedHilang}
                    onChange={(e) => setPersenMhWorkedHilang(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-3">
                  <span>Frequency Rate ( F R )</span>
                  <input
                    type="number"
                    id="frequencyRate"
                    placeholder="Frequency  Rate  ( F R )"
                    className="input input-bordered w-full rounded-lg flex-1"
                    value={frequencyRate}
                    onChange={(e) => setFrequencyRate(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-3">
                  <span>Cost Kecelakaan Kerja</span>
                  <input
                    type="number"
                    id="costKecelakaaKerja"
                    placeholder="Cost Kecelakaan Kerja"
                    className="input input-bordered w-full rounded-lg flex-1"
                    value={costKecelakaaKerja}
                    onChange={(e) => setCostKecelakaaKerja(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-3">
                  <span>Kec Tanpa Hari Hilang</span>
                  <input
                    type="number"
                    id="kecTampaHariHilang"
                    placeholder="Kec Tanpa Hari Hilang"
                    className="input input-bordered w-full rounded-lg flex-1"
                    value={kecTampaHariHilang}
                    onChange={(e) => setKecTampaHariHilang(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-3">
                  <span>M H Worked yg hilang</span>
                </div>
                <input
                  type="number"
                  id="kecDgHariHilang"
                  placeholder="Kec Dg Hari Hilang"
                  className="input input-bordered w-full rounded-lg flex-1"
                  value={kecDgHariHilang}
                  onChange={(e) => setKecDgHariHilang(e.target.value)}
                  required
                />

                <div className="mt-3">
                  <span>Date</span>
                  <input
                    type="date"
                    id="dataInput"
                    className="input input-bordered w-full rounded-lg flex-1"
                    value={dataInput}
                    onChange={handleDateChange}
                    required
                  />
                </div>
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

export default ModalUpdateReportHistory;
