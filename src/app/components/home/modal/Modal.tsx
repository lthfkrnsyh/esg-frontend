"use client";
import React, { useEffect, useState } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { User } from "@/app/home/profile/page";
import Select from "react-select";

interface FileUploadProps {
  token: string;
  onSubmitCallback: () => void;
}

const ModalAdd: React.FC<FileUploadProps> = ({ token, onSubmitCallback }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [userID, setUserID] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [informasi, setInformasi] = useState("");
  const [kronologi, setKronologi] = useState("");
  const [firstAid, setFirstAid] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [imageAccident, setImageAccident] = useState<File | null>(null);
  const [imageFirstAid, setImageFirstAid] = useState<File | null>(null);

  const [user, setUser] = useState<{ value: number; label: string }[]>([]);

  const accidentRepos = new AccidentRepository();

  const handleUserChange = (selectedOption: { value: number; label: string } | null) => {
    if (selectedOption) {
      setUserID(selectedOption.value);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", userID.toString());
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
      if (imageAccident.size > 1024 * 1024 * 5) {
        alert("File size is too large! Please select a file under 5 MB.");
        return;
      }
    }

    if (imageFirstAid) {
      formData.append("image_first_aid", imageFirstAid);
      if (imageFirstAid.size > 1024 * 1024 * 5) {
        alert("File size is too large! Please select a file under 5 MB.");
        return;
      }
    }

    try {
      const response = await accidentRepos.sentReport(token, formData);
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

      const data = response.data
        .filter((user: User) => user.role !== "1")
        .map((user: User) => ({
          value: user.id || 0,
          label: `${user.id} : ${user.name}`,
        }));

      setUser(data);
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
          <h3 className="font-bold text-lg w-full">Add Report</h3>
          <form method="post" onSubmit={handleSubmit}>
            <div className="m-2">
              <Select required options={user} onChange={handleUserChange} />
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
