"use client";
import React, { useEffect, useState } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { RoleModel } from "@/app/home/users/page";

interface UserModalProps {
  token: string; // Definisikan tipe token sebagai string
  onSubmitCallback: () => void;
}

const ModalAddUser: React.FC<UserModalProps> = ({
  token,
  onSubmitCallback,
}) => {
  const [roleList, setRoleList] = useState<RoleModel[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState(0);

  const accidentRepos = new AccidentRepository();

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setRole(parseInt(selectedValue)); // Convert string value to integer
  };

  const handleSubmitInsert = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await accidentRepos.insertUser(token, {
        name: name,
        email: email,
        password: password,
        phone_number: phone_number,
        address: address,
        role: role,
      });
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

  const getRoles = async () => {
    try {
      const response = await accidentRepos.getRoles(token);
      console.log("🚀 ~ getRoles ~ response:", response);
      setRoleList(response.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    // Mengambil data dari localStorage saat komponen pertama kali dimuat
    console.log("token", token);
    if (token != "") {
      getRoles();
    }
  }, [token]);

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
                className="select select-bordered w-full rounded-lg mt-3"
                onChange={handleUserChange}
                required
              >
                <option
                  disabled
                  selected
                  className="text-gray-400 font-bold py-2 px-4"
                >
                  Select User
                </option>
                {roleList.map((role) => (
                  <option className="text-black py-2 px-4" value={role.id} key={role.id}>
                    {role.name.toUpperCase()}
                  </option>
                ))}
              </select>

              <input
                type="text"
                id="name"
                placeholder="Name"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                id="email"
                placeholder="Email"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                type="number"
                id="phone_number"
                placeholder="Phone Number"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />

              <input
                type="text"
                id="address"
                placeholder="Address"
                className="input input-bordered w-full rounded-lg mt-3 flex-1"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="modal-action">
              {/* if there is a button, it will close the modal */}
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

export default ModalAddUser;