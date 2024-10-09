"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent  } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { User } from "@/app/home/profile/page";

interface UserModalProps {
  userdata: User;
  token: string; // Definisikan tipe token sebagai string
  onSubmitCallback: () => void;
}

const ModalAddUser: React.FC<UserModalProps> = ({
  userdata,
  token,
  onSubmitCallback,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [userID, setUserID] = useState<string>("");
  const [name, setName] = useState(userdata.name);
  const [email, setEmail] = useState(userdata.email);
  const [phone_number, setPhoneNumber] = useState(userdata.phone_number);
  const [address, setAddress] = useState(userdata.address);
  const [role, setRole] = useState(userdata.role);

  const accidentRepos = new AccidentRepository();

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setUserID(selectedValue); // Convert string value to integer
  };

  const handleSubmitInsert = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone_number", phone_number);
    formData.append("address", address);
    formData.append("role", role);

    const response = await accidentRepos.updateUser(token, userID, formData);
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

  const getUserList = async () => {
    try {
      const response = await accidentRepos.getUserList(token);
      setUserID(response.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    // Mengambil data dari localStorage saat komponen pertama kali dimuat
    console.log("token", token);
    if (token) {
      getUserList();
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
              {/* <select
                className="select select-bordered w-full rounded-lg mt-3"
                onChange={handleUserChange}
              >
                <option
                  disabled
                  selected
                  className="text-gray-400 font-bold py-2 px-4"
                >
                  Select User
                </option>
                {user.map((user) => (
                  <option className="text-black py-2 px-4" value={user.id}>
                    {user.name.toUpperCase()}
                  </option>
                ))}
              </select> */}

              {/* <div className="flex gap-3">
                <input
                  type="date"
                  id="date"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={date}
                  onChange={handleDateChange}
                  required
                />
                <input
                  type="time"
                  id="time"
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  value={time}
                  onChange={handleTimeChange}
                  required
                />
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Location"
                  onChange={(e) => setLocation(e.target.value)}
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                />

                <input
                  type="text"
                  placeholder="Department"
                  onChange={(e) => setDepartment(e.target.value)}
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                />
              </div>

              <input
                type="text"
                placeholder="Informasi"
                onChange={(e) => setInformasi(e.target.value)}
                className="input input-bordered w-full rounded-lg mt-3"
              />

              <input
                type="text"
                placeholder="Kronologi"
                onChange={(e) => setKronologi(e.target.value)}
                className="input input-bordered w-full rounded-lg mt-3"
              />

              <input
                type="text"
                placeholder="First Aid"
                onChange={(e) => setFirstAid(e.target.value)}
                className="input input-bordered w-full rounded-lg mt-3"
              />

              <input
                type="text"
                placeholder="Event Category"
                onChange={(e) => setEventCategory(e.target.value)}
                className="input input-bordered w-full rounded-lg mt-3"
              />

              <label className="form-control w-full  mt-3">
                <div className="label">
                  <span className="label-text">Image Accident</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageAccident(e.target.files[0])}
                  className="file-input file-input-bordered w-full rounded-lg"
                />
              </label>

              <label className="form-control w-full  mt-3">
                <div className="label">
                  <span className="label-text">Image First Aid</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFirstAid(e.target.files[0])}
                  className="file-input file-input-bordered w-full rounded-lg"
                />
              </label> */}
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
