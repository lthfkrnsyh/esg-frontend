"use client";
import React, { useState, useEffect } from "react";
import { AccidentRepository } from "@/repository/accident/accidentRepository";
import { ConversionModel } from "../../../home/conversion/page";

interface ModalConversionProps {
  isOpen: boolean;
  onClose: () => void;
  data: ConversionModel | null;
}

const ModalConversion: React.FC<ModalConversionProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Detail Konversi</h2>
        <div className="flex flex-col space-y-2">
          <p>ID: {data?.id}</p>
          <p>Sumber Energi: {data?.SumberEnergi}</p>
          <p>Faktor Konversi Emisi CO2: {data?.FaktorKonversiEmisiCO2}</p>
          <p>Faktor Konversi Emisi CH4: {data?.FaktorKonversiEmisiCH4}</p>
          <p>Faktor Konversi Emisi N2O: {data?.FaktorKonversiEmisiN2O}</p>
          <p>Faktor Konversi Energi GJ: {data?.FaktorKonversiEnergiGJ}</p>
        </div>
        <button onClick={onClose} className="mt-4 p-2 bg-gray-200 rounded-md">
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalConversion;
