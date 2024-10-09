"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // Import Modal component
import { IntensitasAirModel } from "@/app/home/intensitas_air/page";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { RoleModel } from "@/app/home/users/page";

interface ModalUpdateIntensitasAirProps {
  data: IntensitasAirModel;
  token: string;
  isOpen: boolean;
  onSubmitCallback: () => void;
}

const ModalUpdateIntensitasAir: React.FC<ModalUpdateIntensitasAirProps> = ({
  data,
  token,
  isOpen,
  onSubmitCallback,
}) => {
  const accidentRepos = new AccidentRepository();
  const [formData, setFormData] = useState<IntensitasAirModel>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await accidentRepos.updateIntensitasAir(token, formData.id.toString(), formData);
      onSubmitCallback();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onSubmitCallback}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Finish Good</label>
          <input
            type="number"
            name="product_finish_good"
            value={formData.product_finish_good || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Air Permukaan</label>
          <input
            type="number"
            name="air_permukaan"
            value={formData.air_permukaan || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Air Tanah</label>
          <input
            type="number"
            name="air_tanah"
            value={formData.air_tanah || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Air PAM / Pihak ke-3</label>
          <input
            type="number"
            name="air_pam"
            value={formData.air_pam || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default ModalUpdateIntensitasAir;
