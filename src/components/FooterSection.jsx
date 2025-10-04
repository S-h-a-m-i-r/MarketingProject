import React from "react";

const FooterSection = () => {
  return (
    <div className=" flex items-end pb-10 justify-center bg-[#BE1E23] h-screen mt-1">
      <div className="w-full flex flex-col items-center justify-end">
        <div className="max-w-1/5 w-full h-1/5 border-8 border-[#3d0a0a]/50 flex items-center justify-center flex-col p-20">
          <h3 className="text-[40px] text-center text-[#3d0a0a]/50 flex flex-col leading-[0.79]">
            <span className="tracking-[28px]">WHITE</span>
            <span className="text-[120px] font-bold text-[#3d0a0a tracking-[20px]">
              INK
            </span>
          </h3>
        </div>
        <h3 className="text-[#3d0a0a]/50 text-2xl font-bold mt-8 tracking-[1px]">
          WHERE IDEAS COME ALIVE
        </h3>
      </div>
    </div>
  );
};

export default FooterSection;

