import { useEffect, useState } from "react";
import ModalImage from "react-modal-image";
import { useOutletContext } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export const Certificate = () => {
  // const [certificate, setCertificate] = useState([
  //     {
  //         "_id": "68667e69f23a25c663eff402",
  //         "name": "Fire Safety",
  //         "imageUrl": [
  //             "https://res.cloudinary.com/des05ruq7/image/upload/v1751361455/cbxitqbc1htyw4zkjszl.png"
  //         ],
  //         "createdAt": {
  //             "$date": { "$numberLong": "1751361456625" }
  //         },
  //         "updatedAt": {
  //             "$date": { "$numberLong": "1751361456625" }
  //         },
  //         "__v": { "$numberInt": "0" }
  //     },
  //     {
  //         "_id": "68667eacf23a25c663eff403",
  //         "name": "Govt Approved",
  //         "imageUrl": [
  //             "https://res.cloudinary.com/des05ruq7/image/upload/v1751363308/jny6x7eauypyflgkvix6.png"
  //         ],
  //         "createdAt": {
  //             "$date": { "$numberLong": "1751363309066" }
  //         },
  //         "updatedAt": {
  //             "$date": { "$numberLong": "1751363309066" }
  //         },
  //         "__v": { "$numberInt": "0" }
  //     }
  // ])

  const { certificate } = useOutletContext();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="bg-gray-100 px-5 py-10">
      <br />
      <h2 className="text-center text-4xl font-bold mb-8">
        OUR <span className="text-[#2a337b]">CERTIFICATES</span>
        <div className="flex justify-center mt-2">
          <span className="w-12 h-1 bg-[#2a337b] rounded"></span>
        </div>
      </h2>

      <br />
      <br />
      <div className="flex flex-col md:justify-center items-center max-sm:space-y-5 px-5 md:flex-row  md:flex-wrap max-w-[1340px] gap-10 mx-auto">
        {certificate
          ? certificate &&
            certificate?.map((item, index) => {
              return (
                <div key={index} className="space-y-2">
                  <ModalImage
                    small={item?.imageUrl[0]}
                    large={item?.imageUrl[0]}
                    // alt={item?.name}
                    className="md:w-[300px] bg-white hover:scale-105 duration-150 transition-all ease-in-out object-cover"
                    hideDownload={true}
                    hideZoom={true}
                  />
                  <div className="text-center text-xl font-semibold text-gray-700 ">
                    <p>{item?.name}</p>
                  </div>
                </div>
              );
            })
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
              return (
                <div
                  key={index}
                  className="skeleton h-[350px] w-full md:w-[250px]  "
                ></div>
              );
            })}
      </div>
    </div>
  );
};
