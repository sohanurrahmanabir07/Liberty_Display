import React, { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { InquiryModal } from "./Inquiry Modal/InquiryModal";

const parameterData = [
  { label: "Voltage/Frequency:", value: "220–240V~50–60Hz" },
  { label: "Rate Power I/II:", value: "1000/2000W" },
  { label: "Temperature I/II:", value: "60/60–600℃" },
  { label: "Air Flow I/II:", value: "I:300L/min II:500L/min" },
];

const packingData = [
  { label: "Carton Size:", value: "52×28×30cm" },
  { label: "Gross Weight:", value: "7.5kg" },
  { label: "Net Weight:", value: "6.8kg" },
  { label: "Quantity per Carton:", value: "4pcs" },
];

const AccordionSection = ({ title, open, onClick, children }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (open) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open, children]);

  return (
    <div>
      <div
        onClick={onClick}
        className="flex items-center cursor-pointer px-5 py-4 text-lg font-medium border-b border-gray-200 select-none"
        style={{ userSelect: "none" }}
      >
        <span className="mr-2 text-2xl">{open ? "−" : "+"}</span>
        {title}
      </div>
      <div
        ref={contentRef}
        style={{
          maxHeight: open ? `${height}px` : "0px",
          transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }}
        className="px-3"
        aria-expanded={open}
      >
        <div className="py-4">{open && children}</div>
      </div>
    </div>
  );
};

const ParameterTable = ({ data }) => (
  <table className="w-full text-base">
    <tbody>
      {data &&
        data.map((ele, idx) => (
          <tr key={idx} className={idx % 2 === 0 ? "bg-gray-100" : ""}>
            <td className="py-4 px-4 font-medium w-1/2">
              {Object.keys(ele)[0]}
            </td>
            <td className="py-4 px-4 w-1/2">{Object.values(ele)[0]}</td>
          </tr>
        ))}
    </tbody>
  </table>
);

const ProductAccordion = ({ item }) => {
  const [openSection, setOpenSection] = useState("parameter");
  const { products } = useOutletContext();

  const handleModal = () => {
    setTimeout(() => {
      document.getElementById("inquiryModal").checked = true;
    }, 100);
  };
  return (
    <div className="border border-gray-300 rounded-md max-w-2xl  bg-white">
      <AccordionSection
        title="Parameter"
        open={openSection === "parameter"}
        onClick={() =>
          setOpenSection(openSection === "parameter" ? null : "parameter")
        }
      >
        <ParameterTable data={item?.parameter} />
      </AccordionSection>
      <div className="py-8 flex justify-start px-5">
        <button
          onClick={handleModal}
          className="bg-[#2a337b] cursor-pointer hover:bg-[#2a337b text-white text-lg font-semibold rounded-full px-10 py-3 flex items-center gap-2 transition"
        >
          Send Inquiry <span className="text-xl">➔</span>
        </button>
      </div>
      {item && <InquiryModal item={item}></InquiryModal>}
    </div>
  );
};

export default ProductAccordion;
