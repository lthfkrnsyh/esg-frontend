// app/components/Sidebar.tsx
"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/app/home/profile/page";

const Sidebar = () => {
  const [user, setUser] = useState<User>();
  const pathname = usePathname();
  const router = useRouter();

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
  return (
    <>
      <aside
        id="cta-button-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform  sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto flex flex-col bg-customGreen-50 dark:bg-darkGreen-800 bg-darkGreen-800">
        <div className="flex justify-center mb-4">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-20"
            />
          </div>
          <ul className="flex-1 space-y-2 font-medium px-3 py-4">
            
            <li>
              <a
                onClick={() => {
                  router.push("/home");
                }}
                className={
                  pathname === "/home"
                    ? "flex items-center p-2 rounded-lg text-darkGreen-200 dark:text-darkGreen-200 hover:bg-customGreen-700 group bg-customGreen-700"
                    : "flex items-center p-2 rounded-lg text-customGreen-900 dark:text-customGreen-100 hover:text-customGreen-100 hover:bg-darkGreen-100 dark:hover:text-darkGreen-200 dark:hover:bg-customGreen-700 group"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={
                    pathname === "/home"
                      ? "w-5 h-5 text-darkGreen-200 transition duration-75 dark:text-darkGreen-200"
                      : "w-5 h-5 text-customGreen-900 transition duration-75 dark:text-customGreen-100 group-hover:text-customGreen-100 dark:group-hover:text-darkGreen-200"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <span className="ms-3 user-select: none">Dashboard</span>
              </a>
            </li>

            {user && (user.role === "1" || user.role === "2") && (
            <li>
              <a
                onClick={() => {
                  router.push("/home/ghg");
                }}
                className={
                  pathname === "/home/ghg"
                    ? "flex items-center p-2 rounded-lg text-darkGreen-200 dark:text-darkGreen-200 hover:bg-customGreen-700 group bg-customGreen-700"
                    : "flex items-center p-2 rounded-lg text-customGreen-900 dark:text-customGreen-100 hover:text-customGreen-100 hover:bg-darkGreen-100 dark:hover:text-darkGreen-200 dark:hover:bg-customGreen-700 group"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className={
                    pathname === "/home/ghg"
                      ? "w-5 h-5 text-darkGreen-200 transition duration-75 dark:text-darkGreen-200"
                      : "w-5 h-5 text-customGreen-900 transition duration-75 dark:text-customGreen-100 group-hover:text-customGreen-100 dark:group-hover:text-darkGreen-200"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Input GHG Report
                </span>
              </a>
            </li>
            )}

            {user && (user.role === "1" || user.role === "2") && (
            <li>
              <a
                onClick={() => {
                  router.push("/home/intensitas_air");
                }}
                className={
                  pathname === "/home/intensitas_air"
                    ? "flex items-center p-2 rounded-lg text-darkGreen-200 dark:text-darkGreen-200 hover:bg-customGreen-700 group bg-customGreen-700"
                    : "flex items-center p-2 rounded-lg text-customGreen-900 dark:text-customGreen-100 hover:text-customGreen-100 hover:bg-darkGreen-100 dark:hover:text-darkGreen-200 dark:hover:bg-customGreen-700 group"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className={
                    pathname === "/home/intensitas_air"
                      ? "w-5 h-5 text-darkGreen-200 transition duration-75 dark:text-darkGreen-200"
                      : "w-5 h-5 text-customGreen-900 transition duration-75 dark:text-customGreen-100 group-hover:text-customGreen-100 dark:group-hover:text-darkGreen-200"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Input Intensitas Air
                </span>
              </a>
            </li>
            )}

            {user && (user.role === "1" || user.role === "2") && (
            <li>
              <a
                onClick={() => {
                  router.push("/home/solidwaste");
                }}
                className={
                  pathname === "/home/solidwaste"
                    ? "flex items-center p-2 rounded-lg text-darkGreen-200 dark:text-darkGreen-200 hover:bg-customGreen-700 group bg-customGreen-700"
                    : "flex items-center p-2 rounded-lg text-customGreen-900 dark:text-customGreen-100 hover:text-customGreen-100 hover:bg-darkGreen-100 dark:hover:text-darkGreen-200 dark:hover:bg-customGreen-700 group"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className={
                    pathname === "/home/solidwaste"
                      ? "w-5 h-5 text-darkGreen-200 transition duration-75 dark:text-darkGreen-200"
                      : "w-5 h-5 text-customGreen-900 transition duration-75 dark:text-customGreen-100 group-hover:text-customGreen-100 dark:group-hover:text-darkGreen-200"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Input Solid Waste
                </span>
              </a>
            </li>
            )}
            
            {user && (user.role === "1" || user.role === "2") && (
            <li>
              <a
                onClick={() => {
                  router.push("/home/conversion");
                }}
                className={
                  pathname === "/home/conversion"
                    ? "flex items-center p-2 rounded-lg text-darkGreen-200 dark:text-darkGreen-200 hover:bg-customGreen-700 group bg-customGreen-700"
                    : "flex items-center p-2 rounded-lg text-customGreen-900 dark:text-customGreen-100 hover:text-customGreen-100 hover:bg-darkGreen-100 dark:hover:text-darkGreen-200 dark:hover:bg-customGreen-700 group"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className={
                    pathname === "/home/conversion"
                      ? "w-5 h-5 text-darkGreen-200 transition duration-75 dark:text-darkGreen-200"
                      : "w-5 h-5 text-customGreen-900 transition duration-75 dark:text-customGreen-100 group-hover:text-customGreen-100 dark:group-hover:text-darkGreen-200"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Conversion Table
                </span>
              </a>
            </li>
            )}

            {user && (user.role === "1" || user.role === "2") && (
            <li>
              <a
                onClick={() => {
                  router.push("/home/report_history");
                }}
                className={
                  pathname === "/home/report_history"
                    ? "flex items-center p-2 rounded-lg text-darkGreen-200 dark:text-darkGreen-200 hover:bg-customGreen-700 group bg-customGreen-700"
                    : "flex items-center p-2 rounded-lg text-customGreen-900 dark:text-customGreen-100 hover:text-customGreen-100 hover:bg-darkGreen-100 dark:hover:text-darkGreen-200 dark:hover:bg-customGreen-700 group"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className={
                    pathname === "/home/report_history"
                      ? "w-5 h-5 text-darkGreen-200 transition duration-75 dark:text-darkGreen-200"
                      : "w-5 h-5 text-customGreen-900 transition duration-75 dark:text-customGreen-100 group-hover:text-customGreen-100 dark:group-hover:text-darkGreen-200"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Incident Report Analysis
                </span>
              </a>
            </li>
            )}

            {user && (user.role === "1" || user.role === "2") && (
            <li>
              <a
                onClick={() => {
                  router.push("/home/main");
                }}
                className={
                  pathname === "/home/main"
                    ? "flex items-center p-2 rounded-lg text-darkGreen-200 dark:text-darkGreen-200 hover:bg-customGreen-700 group bg-customGreen-700"
                    : "flex items-center p-2 rounded-lg text-customGreen-900 dark:text-customGreen-100 hover:text-customGreen-100 hover:bg-darkGreen-100 dark:hover:text-darkGreen-200 dark:hover:bg-customGreen-700 group"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className={
                    pathname === "/home/main"
                      ? "w-5 h-5 text-darkGreen-200 transition duration-75 dark:text-darkGreen-200"
                      : "w-5 h-5 text-customGreen-900 transition duration-75 dark:text-customGreen-100 group-hover:text-customGreen-100 dark:group-hover:text-darkGreen-200"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Input Incident Report
                </span>
              </a>
            </li>
            )}

            {user && user.role === "1" && (
              <li>
                <a
                  onClick={() => {
                    router.push("/home/licensing");
                  }}
                  className={
                    pathname === "/home/licensing"
                      ? "flex items-center p-2 rounded-lg text-darkGreen-200 dark:text-darkGreen-200 hover:bg-customGreen-700 group bg-customGreen-700"
                      : "flex items-center p-2 rounded-lg text-customGreen-900 dark:text-customGreen-100 hover:text-customGreen-100 hover:bg-darkGreen-100 dark:hover:text-darkGreen-200 dark:hover:bg-customGreen-700 group"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className={
                      pathname === "/home/licensing"
                        ? "w-5 h-5 text-darkGreen-200 transition duration-75 dark:text-darkGreen-200"
                        : "w-5 h-5 text-customGreen-900 transition duration-75 dark:text-customGreen-100 group-hover:text-customGreen-100 dark:group-hover:text-darkGreen-200"
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>

                  <span className="flex-1 ms-3 whitespace-nowrap">
                    SHE Permissions List
                  </span>
                </a>
              </li>
            )}

            {user && user.role === "1" && (
              <li>
                <a
                  onClick={() => {
                    router.push("/home/approve");
                  }}
                  className={
                    pathname === "/home/approve"
                      ? "flex items-center p-2 rounded-lg text-darkGreen-200 dark:text-darkGreen-200 hover:bg-customGreen-700 group bg-customGreen-700"
                      : "flex items-center p-2 rounded-lg text-customGreen-900 dark:text-customGreen-100 hover:text-customGreen-100 hover:bg-darkGreen-100 dark:hover:text-darkGreen-200 dark:hover:bg-customGreen-700 group"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className={
                      pathname === "/home/approve"
                        ? "w-5 h-5 text-darkGreen-200 transition duration-75 dark:text-darkGreen-200"
                        : "w-5 h-5 text-customGreen-900 transition duration-75 dark:text-customGreen-100 group-hover:text-customGreen-100 dark:group-hover:text-darkGreen-200"
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>

                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Approval Incident Report
                  </span>
                </a>
              </li>
            )}

            {user && user.role === "1" && (
              <li>
                <a
                  onClick={() => {
                    router.push("/home/users");
                  }}
                  className={
                    pathname === "/home/users"
                      ? "flex items-center p-2 rounded-lg text-darkGreen-200 dark:text-darkGreen-200 hover:bg-customGreen-700 group bg-customGreen-700"
                    : "flex items-center p-2 rounded-lg text-customGreen-900 dark:text-customGreen-100 hover:text-customGreen-100 hover:bg-darkGreen-100 dark:hover:text-darkGreen-200 dark:hover:bg-customGreen-700 group"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className={
                      pathname === "/home/users"
                        ? "w-5 h-5 text-darkGreen-200 transition duration-75 dark:text-darkGreen-200"
                        : "w-5 h-5 text-customGreen-900 transition duration-75 dark:text-customGreen-100 group-hover:text-customGreen-100 dark:group-hover:text-darkGreen-200"
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>

                  <span className="flex-1 ms-3 whitespace-nowrap">
                    User
                  </span>
                </a>
              </li>
            )}
            {user && (user.role === "1" || user.role === "2") && (
            <li>
              <a
                onClick={() => {
                  router.push("/home/profile");
                }}
                className={
                  pathname === "/home/profile"
                    ? "flex items-center p-2 rounded-lg text-darkGreen-200 dark:text-darkGreen-200 hover:bg-customGreen-700 group bg-customGreen-700"
                    : "flex items-center p-2 rounded-lg text-customGreen-900 dark:text-customGreen-100 hover:text-customGreen-100 hover:bg-darkGreen-100 dark:hover:text-darkGreen-200 dark:hover:bg-customGreen-700 group"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={
                    pathname === "/home/profile"
                      ? "w-5 h-5 text-darkGreen-200 transition duration-75 dark:text-darkGreen-200"
                      : "w-5 h-5 text-customGreen-900 transition duration-75 dark:text-customGreen-100 group-hover:text-customGreen-100 dark:group-hover:text-darkGreen-200"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Profile
                </span>
              </a>
            </li>
            )}
          </ul>

          <label className="px-5 py-2 flex items-center cursor-pointer gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path
                d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input type="checkbox" value="synthwave" className="toggle theme-controller" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>

          <div className="w-full px-3 py-4 flex flex-col items-left bg-customGreen-50 dark:bg-customGreen-800 bg-customGreen-800 border-r-2 border-darkGreen-200">
            <h1 className="text-1xl font-bold text-darkGreen-200 mb-4">Welcome to, ESG System!</h1>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("data");
                router.push("/auth/login");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              <span className="text-lg font-bold">Logout</span>
          </div>

          </div>

          </div>
      </aside>
    </>
  );
};

export default Sidebar;