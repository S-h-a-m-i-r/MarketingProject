import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import {
  ClockCircleOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const ClientInfoTooltip = ({ children, placement = "top" }) => {
  const [clientTime, setClientTime] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [, setIsLoading] = useState(false);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      });
      setClientTime(timeString);
    };

    // Set initial time
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch IP address and location data
  const fetchIPAddress = async () => {
    if (ipAddress) return; // Already fetched

    setIsLoading(true);
    try {
      // First get IP address
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      setIpAddress(ipData.ip);

      // Then get location data using ipapi.co (free service)
      const locationResponse = await fetch(
        `https://ipapi.co/${ipData.ip}/json/`
      );
      const locationData = await locationResponse.json();

      if (locationData.country_name) {
        setCountry(locationData.country_name);
      }
      if (locationData.city) {
        setCity(locationData.city);
      }
    } catch (error) {
      console.error("Error fetching IP address or location:", error);
      setIpAddress("Unable to fetch IP");
      setCountry("Unable to fetch location");
    } finally {
      setIsLoading(false);
    }
  };

  const tooltipContent = (
    <div className="p-4 min-w-[320px] bg-gradient-to-br from-slate-900 via-purple-600 to-slate-900 rounded-xl border border-purple-500/20 shadow-2xl">
      {/* Header */}

      {/* Time Section */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-3 mb-3 border border-blue-500/20">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <ClockCircleOutlined className="text-white text-sm" />
          </div>
          <span className="font-semibold text-white text-sm uppercase tracking-wide">
            Current Time
          </span>
        </div>
        <div className="text-sm text-cyan-200 font-mono pl-11">
          <span className="bg-cyan-500/20 px-2 py-1 rounded text-cyan-100">
            {clientTime || "Loading..."}
          </span>
        </div>
      </div>

      {/* IP Address Section */}

      {/* Location Section */}
      {(country || city) && (
        <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-lg p-3 border border-orange-500/20">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
              <EnvironmentOutlined className="text-white text-sm" />
            </div>
            <span className="font-semibold text-white text-sm uppercase tracking-wide">
              Location
            </span>
          </div>
          <div className="text-sm text-pink-200 font-medium pl-11">
            <span className="bg-pink-500/20 px-2 py-1 rounded text-pink-100">
              {city && country
                ? `${city}, ${country}`
                : country || city || "Unknown"}
            </span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-purple-500/20">
        <div className="text-xs text-purple-300 text-center">
          Click anywhere to close
        </div>
      </div>
    </div>
  );

  return (
    <Tooltip
      title={tooltipContent}
      placement={placement}
      trigger="click"
      overlayStyle={{ maxWidth: "300px" }}
      overlayClassName="client-info-tooltip"
    >
      <div onClick={fetchIPAddress} className="cursor-pointer">
        {children}
      </div>
    </Tooltip>
  );
};

export default ClientInfoTooltip;
