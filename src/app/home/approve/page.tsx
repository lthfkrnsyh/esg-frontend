"use client";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { useEffect, useState } from "react";
import { User } from "../profile/page";
import { useRouter } from "next/navigation";
import ModalAdd from "@/app/components/home/modal/Modal";

interface AccidentReport {
  id: number;
  user_id: number;
  date_accident: Date;
  time_accident: string;
  location: string;
  department: string;
  informasi: string;
  kronologi: string;
  image_accident: string;
  first_aid: string;
  image_first_aid: string;
  event_category: string;
  approved: string;
  approved_date: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    address: string;
    role: string;
    date_create: string;
    date_update: string | null;
  };
  approved_by: {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    address: string;
    role: string;
    date_create: string;
    date_update: string | null;
  };
}

export default function ApprovePage() {
  const [user, setUser] = useState<User>();
  const [dataList, setDataList] = useState<AccidentReport[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const accidentRepos = new AccidentRepository();
  const router = useRouter();

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
    }
  };

  const approvedReport = async (id: string) => {
    try {
      if (user && user.token) {
        const response = await accidentRepos.approvedReport(
          user.token,
          id,
          user.id.toString()
        );
        if (response.status === "SUCCESS") {
          getList(user.token);
          console.log("🚀 ~ getList ~ response:", response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleApproveClick = (id: string) => {
    setSelectedReportId(id);
    setOpen(true);
  };

  const handleConfirmApprove = () => {
    if (selectedReportId) {
      approvedReport(selectedReportId);
    }
    setOpen(false);
    setSelectedReportId(null);
  };

  const handleCancelApprove = () => {
    setOpen(false);
    setSelectedReportId(null);
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

    if (user && user.token && user.role != "1") {
      router.push("/home");
    }
  }, [user]);

  const filterDataByDate = () => {
    if (!startDate || !endDate) return dataList;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return dataList.filter(item => {
      const itemDate = new Date(item.date_accident);
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
            Approve Incident Report for Section Head
          </h1>
        </div>
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
                Address
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Informasi
              </th>
              <th scope="col" className="px-6 py-3 normal-case border-r-2 border-customGreen-200">
                Date Accident
              </th>
              <th
                scope="col"
                className="px-6 py-3 rounded-e-lg justify-center normal-case text-center"
              >
                Approve
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
                  {item.user.name}
                </th>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.user.address}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.informasi}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white border-r-2 border-t-2 border-customGreen-200">
                  {item.date_accident.toString()}
                </td>
                <td className="px-6 py-4 font-medium text-customGreen-900 whitespace-nowrap dark:text-white text-center border-t-2 border-customGreen-200">
                  {item.approved !== "1" ? (
                    <button
                      className="btn btn-circle btn-warning"
                      type="button"
                      onClick={() => handleApproveClick(item.id.toString())}
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
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold text-customGreen-900 dark:text-white bg-darkGreen-200">
              <th scope="row" className="px-6 py-3 text-customGreen-700  rounded-s-lg">
                Total
              </th>
              <td className="px-6 py-3 text-customGreen-700 "></td>
              <td className="px-6 py-3 text-customGreen-700 "></td>
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

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <p>Are you sure you want to approve this report?</p>
            <div className="flex justify-end mt-4">
              <button
                className="btn btn-secondary mr-2"
                onClick={handleCancelApprove}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirmApprove}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
