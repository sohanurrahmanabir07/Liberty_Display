import axios from "axios";
import React, { useRef, useState } from "react";
import { useOutletContext } from "react-router";
import Swal from "sweetalert2";
import { capitalizeWords } from "../../Functions/functions";
import { socket } from "../../Socket/socket";

export const InquiryModal = ({ item }) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: `${item?.model.toUpperCase()} Related Inquiry`,
    description: "",
    phone: "",
    type: "Inquiry",
  });

  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    socket.emit("sendQueries", contact);
    setContact({
      name: "",
      email: "",
      subject: "",
      description: "",
      phone: "",
      type: "Inquiry",
    });
    Swal.fire({
      title: "Your Queries!",
      text: "Successfully Sent!",
      icon: "success",
    });
  };

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setContact({
      name: "",
      email: "",
      subject: `${item?.model.toUpperCase()} Related Inquiry`,
      description: "",
      phone: "",
      type: "Inquiry",
    });
    document.getElementById("inquiryModal").checked = false;
  };

  return (
    <div>
      <input type="checkbox" id="inquiryModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <div
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </div>

          <div className="p-8 flex flex-col w-full space-y-5">
            <div className="flex w-full flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={contact.name}
                name="name"
                onChange={handleChange}
                className="border border-gray-300 rounded p-3 focus:outline-none focus:border-[#2a337b]"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={contact.email}
                onChange={handleChange}
                name="email"
                className="border w-1/2 border-gray-300 rounded p-3 focus:outline-none focus:border-[#2a337b]"
              />
            </div>
            <input
              type="text"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              placeholder="Phone number *"
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              value={contact.subject}
              disabled={true}
              onChange={handleChange}
              className="border border-gray-300 rounded p-3 focus:outline-none focus:border-[#2a337b]"
            />
            <textarea
              placeholder="Message"
              rows="5"
              name="description"
              value={contact.description}
              onChange={handleChange}
              className="border border-gray-300 rounded p-3 focus:outline-none focus:border-[#2a337b] resize-none"
            ></textarea>
            <button
              type="submit"
              disabled={
                !contact.name &&
                !contact.email &&
                !contact.subject &&
                !contact.description
              }
              onClick={handleSubmit}
              className={`  ${
                !contact.name ||
                !contact.email ||
                !contact.subject ||
                !contact.description
                  ? `bg-gray-400 cursor-not-allowed `
                  : `bg-[#2a337b] hover:bg-[#2a337b`
              }  text-white text-lg font-semibold rounded-full py-3 mt-2 transition`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
