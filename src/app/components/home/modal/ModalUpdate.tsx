"use client";
import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { User } from "@/app/home/profile/page";
import { AccidentReport } from "@/app/home/main/page";

interface FileUploadProps {
  data: AccidentReport;
  token: string;
  onSubmitCallback: () => void;
}

const ModalAdd: React.FC<FileUploadProps> = ({
  data,
  token,
  onSubmitCallback,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [userID, setUserID] = useState<string>("");
  const [date, setDate] = useState(data.date_accident || "");
  const [time, setTime] = useState(data.date_accident || "");
  const [location, setLocation] = useState(data.date_accident || "");
  const [department, setDepartment] = useState(data.date_accident || "");
  const [informasi, setInformasi] = useState(data.date_accident || "");
  const [kronologi, setKronologi] = useState(data.date_accident || "");
  const [firstAid, setFirstAid] = useState(data.date_accident || "");
  const [eventCategory, setEventCategory] = useState(data.date_accident || "");
  const [imageAccident, setImageAccident] = useState<File | null>(null);
  const [imageFirstAid, setImageFirstAid] = useState<File | null>(null);

  const [user, setUser] = useState<User[]>([]);

  const accidentRepos = new AccidentRepository();

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setUserID(selectedValue);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleSubmit = async (id: string, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("date_accident", date);
      formData.append("time_accident", time);
      formData.append("location", location);
      formData.append("department", department);
      formData.append("informasi", informasi);
      formData.append("kronologi", kronologi);
      formData.append("first_aid", firstAid);
      formData.append("event_category", eventCategory);
      if (imageAccident) {
        formData.append("image_accident", imageAccident);
      }
      if (imageFirstAid) {
        formData.append("image_first_aid", imageFirstAid);
      }

      const response = await accidentRepos.updateUser(token, id, formData);
      handleCallBack();
    } catch (error) {
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
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
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
          <form method="post" onSubmit={(event) => handleSubmit(userID, event)}>
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
                {user.map((user) => (
                  <option className="text-black py-2 px-4" value={user.id} key={user.id}>
                    {user.name.toUpperCase()}
                  </option>
                ))}
              </select>

              <div className="flex gap-3">
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
                  required
                />

                <input
                  type="text"
                  placeholder="Department"
                  onChange={(e) => setDepartment(e.target.value)}
                  className="input input-bordered w-full rounded-lg mt-3 flex-1"
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Informasi"
                onChange={(e) => setInformasi(e.target.value)}
                className="input input-bordered w-full rounded-lg mt-3"
                required
              />

              <input
                type="text"
                placeholder="Kronologi"
                onChange={(e) => setKronologi(e.target.value)}
                className="input input-bordered w-full rounded-lg mt-3"
                required
              />

              <input
                type="text"
                placeholder="First Aid"
                onChange={(e) => setFirstAid(e.target.value)}
                className="input input-bordered w-full rounded-lg mt-3"
                required
              />

              <input
                type="text"
                placeholder="Event Category"
                onChange={(e) => setEventCategory(e.target.value)}
                className="input input-bordered w-full rounded-lg mt-3"
                required
              />

              <label className="form-control w-full mt-3">
                <div className="label">
                  <span className="label-text">Image Accident</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageAccident(e.target.files ? e.target.files[0] : null)}
                  className="file-input file-input-bordered w-full rounded-lg"
                  required
                />
              </label>

              <label className="form-control w-full mt-3">
                <div className="label">
                  <span className="label-text">Image First Aid</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFirstAid(e.target.files ? e.target.files[0] : null)}
                  className="file-input file-input-bordered w-full rounded-lg"
                  required
                />
              </label>
            </div>
            <div className="modal-action">
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

export default ModalAdd;
