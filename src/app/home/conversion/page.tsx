"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { User } from "../profile/page";

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
  const [selectedData, setSelectedData] = useState<ConversionModel | null>(null);
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isConversionModalOpen, setIsConversionModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("2024");
  const [conversionList2019, setConversionList2019] = useState<ConversionModel[]>([]);
  const [conversionList2024, setConversionList2024] = useState<ConversionModel[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
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

  const getUserList = async (token: string, year: string) => {
    try {
      let response;
      if (year === "2019") {
        response = await accidentRepos.getListTabelKonversi2019All(token);
        setConversionList2019(response.data || []);
      } else if (year === "2024") {
        response = await accidentRepos.getListTabelKonversi2024All(token);
        setConversionList2024(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    if (user && user.token) {
      getUserList(user.token, activeTab);
    }
  }, [user, activeTab]);

  const paginatedData = (data: ConversionModel[]) => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return data.slice(startIndex, endIndex);
  };

  const totalPages = activeTab === "2019" ? Math.ceil(conversionList2019.length / entriesPerPage) : Math.ceil(conversionList2024.length / entriesPerPage);

  return (
    <>
      <div className="flex">
        <h1 className="flex-1 text-darkGreen-200 font-bold text-2xl mb-2">
          Tabel Konversi
        </h1>
      </div>
     
      <div className="mb-4">
        <div className="flex space-x-4">
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
        </div>
      </div>

      <div className="mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("2024")}
            className={`p-2 border border-darkGreen-200 rounded-md ${activeTab === "2024" ? "bg-darkGreen-200 text-white" : ""}`}
          >
            Data 2024
          </button>
          <button
            onClick={() => setActiveTab("2019")}
            className={`p-2 border border-darkGreen-200 rounded-md  ${activeTab === "2019" ? "bg-darkGreen-200 text-white" : ""}`}
          >
            Data 2019
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="mt-4 w-full text-sm text-left rtl:text-right text-customGreen-500 dark:text-customGreen-400 bg-tahunGreen rounded-lg">
          <thead className="text-xs text-customGreen-700 uppercase bg-customGreen-100 dark:bg-darkGreen-200 dark:text-customGreen-700">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg normal-case border-r-2 border-customGreen-200">
                ID
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Sumber Energi
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Faktor Konversi Emisi CO2
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Faktor Konversi Emisi CH4
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Faktor Konversi Emisi N2O
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg justify-center normal-case text-center">
                Faktor Konversi Energi GJ
              </th>
            </tr>
          </thead>
          <tbody className="rounded-md bg-customGreen-800">
            {paginatedData(activeTab === "2019" ? conversionList2019 : conversionList2024).map((item, index) => (
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
                  {item.SumberEnergi || 0}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200"
                >
                  {item.FaktorKonversiEmisiCO2 || 0}
                </th>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.FaktorKonversiEmisiCH4 || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.FaktorKonversiEmisiN2O || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-t-2 border-customGreen-200">
                  {item.FaktorKonversiEnergiGJ || 0}
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
              <td className="px-6 py-3 text-customGreen-700 rounded-e-lg text-center">
                Count: {activeTab === "2019" ? conversionList2019.length : conversionList2024.length} Data
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="mt-4 flex justify-between">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-2 bg-darkGreen-200 text-customGreen-100 rounded-md"
          >
            Previous
          </button>
          <span className="p-2" style={{ color: 'darkGreen' }}>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-2 bg-darkGreen-200 text-customGreen-100 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
