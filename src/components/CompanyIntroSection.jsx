import React from "react";

const CompanyIntroSection = () => {
  return (
    <div className=" flex items-center justify-center bg-[#BE1E23] h-screen mt-1">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="max-w-1/4 w-full h-1/2 border-8 border-amber-100 flex items-center justify-center flex-col p-30">
          <h3 className="text-[15px] sm:text-[20px] md:text-[30px] lg:text-[40px] xl:text-[60px] text-amber-100 flex flex-col leading-[0.79]">
            <span className="xl:tracking-[28px] tracking-[10px]">WHITE</span>
            <span className=" text-[56px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[180px] font-bold text-amber-100">
              INK
            </span>
          </h3>
        </div>
        <h3 className="text-amber-100 text-[15px] sm:text-[20px] md:text-[20px] lg:text-[20px] xl:text-2xl  font-bold mt-8 tracking-[10px] xl:tracking-[17px]">
          COMPONY INTRO
        </h3>
      </div>
    </div>
  );
};

export default CompanyIntroSection;

