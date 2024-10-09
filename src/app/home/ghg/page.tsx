// app/layout.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { User } from "../profile/page";
import ModalAddGhg from "@/app/components/home/modal/ModalAddGhg";
import ModalUpdateGhg from "@/app/components/home/modal/ModalUpdateGhg";
import ModalConversion from "@/app/components/home/modal/ModalConversion";

export interface GhgModel {
  id: number;
  year: string | null;
  month: string | null;
  Listrik: number | null;
  SolarDieselB30: number | null;
  NaturalGas: number | null;
  SolarDieselB35: number | null;
  BensinPetrol: number | null;
  GRK: number | null;
  EnergyGJ: number | null;
  PenggunaanREC: number | null;
  TotalAkhirGRK: number | null;
  PersentaseReduceGRK: number | null;
  TotalAkhirEnergyGJ: number | null;
  TotalRenewableEnergyGJ: number | null;
  PersentaseRenewableEnergy: number | null;
}

export interface ConversionModel {
  id: number;
  SumberEnergi: string | null;
  FaktorKonversiEmisiCO2: string | null;
  FaktorKonversiEmisiCH4: string | null;
  FaktorKonversiEmisiN2O: string | null;
  FaktorKonversiEnergiGJ: string | null;
}

const HomePage = () => {
  const router = useRouter();
  const accidentRepos = new AccidentRepository();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<GhgModel | null>(
    null
  );
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isConversionModalOpen, setIsConversionModalOpen] = useState(false); // State untuk mengatur kapan modal harus terbuka

  const openModal = (data: GhgModel) => {
    setSelectedData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedData(null);
    setIsOpen(false);
  };

  const [user, setUser] = useState<User>();
  const [ghgList, setGhgList] = useState<GhgModel[]>([]);
  
  useEffect(() => {
    // Mendapatkan data login dari local storage
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Melakukan sesuatu berdasarkan status login
    if (isLoggedIn !== "true") {
      router.push("/auth/login");
    }
    const data: any = localStorage.getItem("data");
    if (data) {
      const userData = JSON.parse(data);
      const userDataObject: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone_number: userData.phone_number,
        address: userData.address,
        role: userData.role,
        token: userData.token,
        date_create: userData.date_create,
        date_update: userData.date_update,
      };
      setUser(userDataObject);
    }
  }, []);

  const getUserList = async (token: string) => {
    try {
      const response = await accidentRepos.getListGhgAll(token);
      setGhgList(response.data || []);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const deleteGhg = async (token: string, id: string) => {
    try {
      if (confirm(`Apakah Anda yakin ingin menghapus data solid waste dengan ID ${id}?`)) {  
      const response = await accidentRepos.deleteGhg(token, id);
      window.alert("Data berhasil dihapus!");
      getUserList(token);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    // Mendapatkan data login dari local storage
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Melakukan sesuatu berdasarkan status login
    if (user && user.token) {
      getUserList(user.token);
    }
  }, [user]);

  const filterDataByDate = () => {
    if (!startDate || !endDate) return ghgList;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return ghgList.filter(item => {
      const itemDate = new Date(item.month || '');
      return itemDate >= start && itemDate <= end;
    });
  };

  const paginatedData = (data: GhgModel[]) => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return data.slice(startIndex, endIndex);
  };

  const filteredData = filterDataByDate();
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  return (
    <>
      <div className="flex">
        {" "}
        <h1 className="flex-1 text-darkGreen-200 font-bold text-2xl mb-2">
          Greenhouse Gases Report
        </h1>
        {user && user.token && (
          <ModalAddGhg
            token={user.token}
            onSubmitCallback={() => {
              getUserList(user.token);
            }}
          />
        )}
        {user && user.token && selectedData && (
          <ModalUpdateGhg
            isOpen={isOpen}
            data={selectedData}
            token={user.token}
            onSubmitCallback={() => {
              getUserList(user.token);
              closeModal();
            }}
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-darkGreen-900 dark:text-darkGreen-300">
          Filter by Date:
        </label>
        <div className="flex space-x-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded-md bg-tahunGreen text-white"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded-md bg-tahunGreen text-white"
          />
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="p-2 border rounded-md bg-tahunGreen text-white"
          >
            <option value={10}>10 entries per page</option>
            <option value={25}>25 entries per page</option>
            <option value={50}>50 entries per page</option>
            <option value={100}>100 entries per page</option>
          </select>
          <button onClick={() => setIsConversionModalOpen(true)} className="bg-darkGreen-200 text-white px-4 py-2 rounded-md ml-4">Conversion Table</button>
        </div>
      </div>

      <div className="relative overflow-x-auto ">
        <table className="mt-4 w-full text-sm text-left rtl:text-right text-customGreen-500 dark:text-customGreen-400 bg-tahunGreen rounded-lg">
          <thead className="text-xs text-customGreen-700 uppercase bg-customGreen-100 dark:bg-darkGreen-200 dark:text-customGreen-700">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg normal-case border-r-2 border-customGreen-200">
                NO
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Year
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Month
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Listrik pihak ke-3 (KWH)
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Solar / Diesel B30 (Liter)
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Natural Gas (MMBTU)
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Solar / Diesel B35 (Liter)
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Bensin/Petrol 100% (Liter)
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                GRK (Ton CO₂)
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Energy (GJ)
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
              Penggunaan REC (MWH)
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
              Total Akhir GRK (Ton CO₂)
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
              Presentase reduce GRK (%)
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
              Total Akhir Energy (GJ)
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
              Total Renewable Energy (GJ)
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
              Presentase Renewable Energy (%)
              </th>
              <th
                scope="col"
                className="px-6 py-3 rounded-e-lg justify-center normal-case text-center"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="rounded-md bg-customGreen-800">
          {paginatedData(filteredData).map((item, index) => (
              <tr
                key={index}
                className="bg-white dark:bg-tahunGreen hover:bg-darkGreen-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200"
                >
                  {index + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200"
                >
                  {item.year || 0}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200"
                >
                  {item.month || 0}
                </th>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.Listrik || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.SolarDieselB30 || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.NaturalGas || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.SolarDieselB35 || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.BensinPetrol || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.GRK || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.EnergyGJ || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.PenggunaanREC || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.TotalAkhirGRK || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.PersentaseReduceGRK || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.TotalAkhirEnergyGJ || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.TotalRenewableEnergyGJ || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.PersentaseRenewableEnergy || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-t-2 border-customGreen-200">
                  <button
                    className="btn btn-circle btn-error mr-2"
                    type="button"
                    onClick={() => {
                      if (user && user.token) {
                        deleteGhg(user.token, item.id.toString());
                      }
                    }}
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      openModal(item);
                    }}
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold text-customGreen-900 dark:text-white bg-darkGreen-200">
              <th scope="row" className="px-6 py-3 text-customGreen-700 rounded-s-lg">
                Summary
              </th>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700 rounded-e-lg text-center">
                Count : {filteredData.length} Data
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="mt-4 flex justify-between">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-2 bg-darkGreen-200 rounded-md text-customGreen-100"
          >
            Previous
          </button>
          <span className="p-2" style={{ color: 'darkGreen' }}>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-2 bg-darkGreen-200 rounded-md text-customGreen-100"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;