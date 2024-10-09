"use client";
import React, { useEffect, useState } from "react";
import BarChart, { BarChartData } from "../components/home/chart/BarChart";
import { useRouter } from "next/navigation";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { User } from "./profile/page";
import { ChartOptions } from 'chart.js';

const HomePage = () => {
  const router = useRouter();
  const accidentRepos = new AccidentRepository();
  const currentYear = new Date().getFullYear();

  const [chartData1, setChartData1] = useState<BarChartData>({
    labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    datasets: [{
      data: [30, 50, 20, 30, 50, 20, 30, 50, 20, 30, 50, 113],
      label: "",
      backgroundColor: ["#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A"]
    }]
  });

  const [chartData2, setChartData2] = useState<BarChartData>({
    labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    datasets: [{
      data: [30, 50, 20, 30, 50, 20, 30, 50, 20, 30, 50, 113],
      label: "",
      backgroundColor: ["#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF"]
    }]
  });

  const [chartData3, setChartData3] = useState<BarChartData>({
    labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    datasets: [{
      data: [30, 50, 20, 30, 50, 20, 30, 50, 20, 30, 50, 113],
      label: "",
      backgroundColor: ["#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00"]
    }]
  });

  const [chartData4, setChartData4] = useState<BarChartData>({
    labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    datasets: [{
      data: [30, 50, 20, 30, 50, 20, 30, 50, 20, 30, 50, 113],
      label: "",
      backgroundColor: ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"]
    }]
  });

  const [yearInput, setYearInput] = useState(currentYear.toString());
  const [user, setUser] = useState<User>();
  const [selectedCharts, setSelectedCharts] = useState({
    ghg: true,
    intensitasAir: true,
    solidWaste: true,
    kejadianTerjadi: true,
  });

  const handleCheckboxChange = (chart: keyof typeof selectedCharts) => {
    setSelectedCharts((prev) => ({
      ...prev,
      [chart]: !prev[chart],
    }));
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/auth/login");
    }
    const data: any = localStorage.getItem("data");
    if (data) {
      const userData = JSON.parse(data);
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    if (user && user.token) {
      getList(user.token, yearInput);
    }
  }, [user]);

  const getList = async (token: string, year: string) => {
    try {
      const responseGhg = await accidentRepos.getChartGhgRate(token, year);
      const responseIntensitasAir = await accidentRepos.getChartIntensitasAirRate(token, year);
      const responseSolidWaste = await accidentRepos.getChartSolidWasteRate(token, year);
      const response = await accidentRepos.getChartReport(token, year);

      if (responseGhg.status === "SUCCESS" && responseGhg.data) {
        setChartData1({
          labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
          datasets: [{
            data: responseGhg.data.data_total,
            backgroundColor: ["#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A", "#A52A2A"]
          }]
        });
      }

      if (responseIntensitasAir.status === "SUCCESS" && responseIntensitasAir.data) {
        setChartData2({
          labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
          datasets: [{
            data: responseIntensitasAir.data.data_total,
            backgroundColor: ["#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF"]
          }]
        });
      }

      if (responseSolidWaste.status === "SUCCESS" && responseSolidWaste.data) {
        setChartData3({
          labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
          datasets: [{
            data: responseSolidWaste.data.data_total_limbah_padat,
            backgroundColor: ["#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00"]
          }]
        });
      }

      if (response.status === "SUCCESS" && response.data) {
        setChartData4({
          labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
          datasets: [{
            data: response.data,
            backgroundColor: ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"]
          }]
        });
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fungsi untuk menentukan apakah warna terang atau gelap
const isColorDark = (color: string): boolean => {
  const hex = color.replace('#', '');

  // Konversi ke format RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Rumus luminance untuk menentukan kecerahan warna
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  
  // Jika luminance rendah, berarti warna gelap
  return luminance < 140; // Nilai ambang kecerahan
};


  const chartOptions: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        display: false, // Menyembunyikan legenda
      },
      datalabels: {
        color: (context) => {
          // Mengambil warna background dari dataset
          const backgroundColor = context.dataset.backgroundColor;
          const barColor = Array.isArray(backgroundColor)
            ? backgroundColor[context.dataIndex] // Ambil warna sesuai index bar
            : backgroundColor;
  
          // Jika warnanya gelap, maka label putih, jika terang maka hitam
          return isColorDark(barColor) ? '#FFFFFF' : '#000000';
        },
        anchor: 'end', // Posisi label tetap di atas
        align: 'start', // Menempatkan label di dalam bar, bagian atas
        offset: -5, // Mengurangi jarak sedikit agar label tidak terlalu mepet ke atas
        formatter: (value) => value, // Format untuk label
      },
    },
    scales: {
      x: {
        display: true, // Menampilkan sumbu X
        grid: {
          display: false, // Menyembunyikan garis grid di sumbu X
        },
      },
      y: {
        display: false, // Menyembunyikan sumbu Y
        grid: {
          display: false, // Menyembunyikan garis grid di sumbu Y
        },
      },
    },
  };
  
  return (
    <>
      <div className="flex mb-5">
        <h1 className="text-darkGreen-200 font-bold text-3xl mb-2 flex-1">ESG DASHBOARD</h1>
        <input
          className="input input-bordered rounded-lg bg-tahunGreen text-white"
          type="number"
          placeholder="YYYY"
          min="2009"
          max="2024"
          value={yearInput}
          onChange={(e) => {
            setYearInput(e.target.value);
            if (user && user.token) {
              getList(user.token, e.target.value);
            }
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4 card bg-darkGreen-200 text-white p-5 rounded-lg">
        <div className="flex flex-wrap">
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={selectedCharts.ghg}
              onChange={() => handleCheckboxChange("ghg")}
              className="mr-2"
            />
            GHG Report
          </label>
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={selectedCharts.intensitasAir}
              onChange={() => handleCheckboxChange("intensitasAir")}
              className="mr-2"
            />
            Intensitas Air
          </label>
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={selectedCharts.solidWaste}
              onChange={() => handleCheckboxChange("solidWaste")}
              className="mr-2"
            />
            Solid Waste
          </label>
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={selectedCharts.kejadianTerjadi}
              onChange={() => handleCheckboxChange("kejadianTerjadi")}
              className="mr-2"
            />
            Kecelakaan Kerja
          </label>
        </div>
      </div>

      <div className={`grid ${Object.values(selectedCharts).filter(Boolean).length > 1 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'} gap-4 bg-darkGreen-200 p-4 rounded-lg`}>
        {selectedCharts.ghg && (
          <div className="card bg-customGreen-100 p-3">
            <div>
              <h1 className="text-darkGreen-700 font-bold text-2xl">GHG Report</h1>
              <BarChart data={chartData1} options={chartOptions} />
            </div>
          </div>
        )}
        {selectedCharts.intensitasAir && (
          <div className="card bg-customGreen-100 p-3">
            <div>
              <h1 className="text-darkGreen-700 font-bold text-2xl">Intensitas Air</h1>
              <BarChart data={chartData2} options={chartOptions} />
            </div>
          </div>
        )}
        {selectedCharts.solidWaste && (
          <div className="card bg-customGreen-100 p-3">
            <div>
              <h1 className="text-darkGreen-700 font-bold text-2xl">Solid Waste</h1>
              <BarChart data={chartData3} options={chartOptions} />
            </div>
          </div>
        )}
        {selectedCharts.kejadianTerjadi && (
          <div className="card bg-customGreen-100 p-3">
            <div>
              <h1 className="text-darkGreen-700 font-bold text-2xl">Kecelakaan Kerja</h1>
              <BarChart data={chartData4} options={chartOptions} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
