"use client";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { useEffect, useState } from "react";
import { User } from "../profile/page";
import { useRouter, usePathname } from "next/navigation";
import ModalAdd from "@/app/components/home/modal/Modal";

export interface AccidentReport {
  id: number;
  user_id: number;
  date_accident: string | null;
  time_accident: string | null;
  location: string | null;
  department: string | null;
  informasi: string | null;
  kronologi: string | null;
  image_accident: string | null;
  first_aid: string | null;
  image_first_aid: string | null;
  event_category: string | null;
  approved: string | null;
  approved_date: string | null;
  user: {
    id: number;
    name: string | null;
    email: string | null;
    phone_number: string | null;
    address: string | null;
    role: string | null;
    date_create: string | null;
    date_update: string | null;
  };
  approved_by: {
    id: number;
    name: string | null;
    email: string | null;
    phone_number: string | null;
    address: string | null;
    role: string | null;
    date_create: string | null;
    date_update: string | null;
  };
}

export default function ListReportPage() {
  const [user, setUser] = useState<User>();
  const [dataList, setDataList] = useState<AccidentReport[]>([]);
  const [open, setOpen] = useState(false);

  const accidentRepos = new AccidentRepository();

  const pathname = usePathname();
  const router = useRouter();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fungsi untuk mengambil data
  const getList = async (token: string) => {
    try {
      const response = await accidentRepos.getListAllApi(token);
      if (response.status === "SUCCESS") {
        setDataList(response.data);
        console.log("🚀 ~ getList ~ response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("data");
      router.push("/auth/login");
    }
  };

  const deleteReport = async (id: string) => {
    try {
      if (user && user.token && confirm(`Apakah Anda yakin ingin menghapus data Incident Report dengan ID ${id}?`)) {
        const response = await accidentRepos.deleteReport(user.token, id);
        console.log("🚀 ~ getList ~ response:", response.data);
        window.alert("Data berhasil dihapus!");
        getList(user.token);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
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

  // Memanggil getList ketika user diubah
  useEffect(() => {
    if (user && user.token) {
      getList(user.token);
    }
  }, [user]);

  const filterDataByDate = () => {
    if (!startDate || !endDate) return dataList;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return dataList.filter(item => {
      const itemDate = new Date(item.date_accident || '');
      return itemDate >= start && itemDate <= end;
    });
  };

  const paginatedData = (data: AccidentReport[]) => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return data.slice(startIndex, endIndex);
  };

  const filteredData = filterDataByDate();
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  
  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <h1 className="text-darkGreen font-bold text-3xl">
            Incident Report
          </h1>
        </div>

        {user && user.token && (
          <ModalAdd
            token={user.token}
            onSubmitCallback={() => getList(user.token)}
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

      <div className="relative overflow-x-auto ">
        <table className="w-full text-sm text-left rtl:text-right text-customGreen-500 dark:text-customGreen-400 bg-tahunGreen rounded-lg">
          <thead className="text-xs text-customGreen-700 uppercase bg-customGreen-100 dark:bg-darkGreen-200 dark:text-customGreen-700">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg normal-case border-r-2 border-customGreen-200">
                NO
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Name
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Departement
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Lokasi Kejadian
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Informasi
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Kronologi
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Date Accident
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
                  {item.user.name || "-"}
                </th>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.department || "-"}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.location || "-"}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.informasi || "-"}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.kronologi || "-"}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.date_accident?.split("T")[0] || 0}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white text-center border-t-2 border-customGreen-200">
                  {item.approved != "1" ? (
                    <button
                      className="btn btn-circle btn-warning"
                      type="button"
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
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="btn btn-circle btn-success"
                      type="button"
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
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </button>
                  )}

                  <button
                    className="btn btn-circle btn-error ml-2 "
                    type="button"
                    onClick={() => deleteReport(item.id.toString())}
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

                  {/* <button
                    className="btn btn-circle btn-warning ml-2 "
                    type="button"
                    onClick={() => deleteReport(item.id.toString())}
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
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold text-customGreen-900 dark:text-white bg-darkGreen-200">
              <th scope="row" className="px-6 py-3 text-customGreen-700  rounded-s-lg">
                Total
              </th>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700"></td>
              <td className="px-6 py-3 text-customGreen-700 rounded-e-lg text-center">
                Count : {dataList.length} Data 
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
}
