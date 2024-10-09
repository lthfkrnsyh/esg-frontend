"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { User } from "../profile/page";
import ModalAddIntensitasAir from "@/app/components/home/modal/ModalAddIntensitasAir";
import ModalUpdateIntensitasAir from "@/app/components/home/modal/ModalUpdateIntensitasAir";

export interface IntensitasAirModel {
  id: number;
  product_finish_good: number | null;
  air_permukaan: number | null;
  air_tanah: number | null;
  air_pam: number | null;
  date: string | null;
  date_create?: Date | null;
  date_update?: Date | null;
}

const HomePage = () => {
  const router = useRouter();
  const accidentRepos = new AccidentRepository();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<IntensitasAirModel | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [user, setUser] = useState<User>();
  const [intensitasAirList, setIntensitasAirList] = useState<IntensitasAirModel[]>([]);

  const openModal = (data: IntensitasAirModel) => {
    setSelectedData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedData(null);
    setIsOpen(false);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      router.push("/auth/login");
    } else {
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
    }
  }, []);

  useEffect(() => {
    if (user && user.token) {
      getUserList(user.token);
    }
  }, [user]);

  const getUserList = async (token: string) => {
    try {
      const response = await accidentRepos.getListIntensitasAirAll(token);
      setIntensitasAirList(response.data || []);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const deleteIntensitasAir = async (token: string, id: string) => {
    try {
      if (confirm(`Apakah Anda yakin ingin menghapus data solid waste dengan ID ${id}?`)) {
        const response = await accidentRepos.deleteIntensitasAir(token, id);
        window.alert("Data berhasil dihapus!");
        getUserList(token);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const filterDataByDate = () => {
    if (!startDate || !endDate) return intensitasAirList;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return intensitasAirList.filter(item => {
      const itemDate = new Date(item.date || '');
      return itemDate >= start && itemDate <= end;
    });
  };

  const calculateSummary = (data: IntensitasAirModel[]) => {
    let summary = {
      product_finish_good: 0,
      air_permukaan: 0,
      air_tanah: 0,
      air_pam: 0
    };

    data.forEach(item => {
      summary.product_finish_good += item.product_finish_good || 0;
      summary.air_permukaan += item.air_permukaan || 0;
      summary.air_tanah += item.air_tanah || 0;
      summary.air_pam += item.air_pam || 0;
    });

    return summary;
  };

  const paginatedData = (data: IntensitasAirModel[]) => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return data.slice(startIndex, endIndex);
  };

  const filteredData = filterDataByDate();
  const summary = calculateSummary(filteredData);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  return (
    <>
      <div className="flex">
        <h1 className="flex-1 text-darkGreen-200 font-bold text-2xl mb-2">
          Intensitas Air
        </h1>
        {user && user.token && (
          <ModalAddIntensitasAir
            token={user.token}
            onSubmitCallback={() => {
              getUserList(user.token);
            }}
          />
        )}
        {user && user.token && selectedData && (
          <ModalUpdateIntensitasAir
            data={selectedData}
            token={user.token}
            isOpen={isOpen}
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
        </div>
      </div>

      <div className="relative overflow-x-auto">
  <table className="mt-4 w-full text-sm text-left rtl:text-right text-customGreen-500 dark:text-customGreen-400 bg-tahunGreen rounded-lg">
    <thead className="text-xs text-customGreen-700 uppercase bg-customGreen-100 dark:bg-darkGreen-200 dark:text-customGreen-700">
      <tr>
        <th scope="col" className="px-6 py-3 rounded-s-lg normal-case border-r-2 border-customGreen-200">
          NO
        </th>
        <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
          Product Finish Good
        </th>
        <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
          Air Permukaan (m3)
        </th>
        <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
          Air Tanah (m3)
        </th>
        <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
          Air PAM / Pihak ke-3 (m3)
        </th>
        <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
          Date
        </th>
        <th scope="col" className="px-6 py-3 rounded-e-lg justify-center normal-case text-center">
          Action
        </th>
      </tr>
    </thead>
    <tbody className="rounded-md bg-customGreen-800">
      {paginatedData(filteredData).map((item, index) => (
        <tr key={index} className="bg-white dark:bg-tahunGreen hover:bg-darkGreen-700">
          <th scope="row" className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
            {index + 1}
          </th>
          <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
            {item.product_finish_good}
          </td>
          <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
            {item.air_permukaan}
          </td>
          <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
            {item.air_tanah}
          </td>
          <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
            {item.air_pam}
          </td>
          <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
            {item.date}
          </td>
          <td className="px-6 py-4 flex justify-center space-x-2 border-t-2 border-customGreen-200">
            <button
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              onClick={() => openModal(item)}
            >
              Edit
            </button>
            <button
              className="font-medium text-red-600 dark:text-red-500 hover:underline"
              onClick={() => {
                if (user && user.token) {
                  deleteIntensitasAir(user.token, item.id.toString());
                }
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
        <tfoot>
          <tr className="font-bold text-customGreen-900 dark:text-white bg-darkGreen-200">
            <th scope="row" className="px-6 py-3 text-customGreen-700 rounded-s-lg">Total</th>
            <td className="px-6 py-3 text-customGreen-700"></td>
            <td className="px-6 py-3 text-customGreen-700"></td>
            <td className="px-6 py-3 text-customGreen-700"></td>
            <td className="px-6 py-3 text-customGreen-700"></td>
            <td className="px-6 py-3 text-customGreen-700"></td>
            <td className="px-6 py-3 text-customGreen-700 rounded-e-lg text-center">Count: {filteredData.length} Data</td>
          </tr>
        </tfoot>
      </table>
      <div className="flex justify-between mt-4">
        <div className="text-sm font-medium text-darkGreen-900 dark:text-darkGreen-300">
          Showing {paginatedData(filteredData).length} of {filteredData.length} entries
        </div>
        <div className="flex space-x-2">
          <button
            className="p-2 border rounded-md bg-darkGreen-300 text-white disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`p-2 border rounded-md ${currentPage === index + 1 ? 'bg-darkGreen-500 text-white' : 'bg-darkGreen-300 text-white'}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="p-2 border rounded-md bg-darkGreen-300 text-white disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>

    </>
  );
};

export default HomePage;
