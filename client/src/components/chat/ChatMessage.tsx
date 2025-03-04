import React, { useState } from "react";
import { Bot, User, Filter, ChevronDown } from "lucide-react";

interface StructuredData {
  summary: string;
  key_insights: string[];
  data: Record<string, any>;
}

interface ChatMessageProps {
  message: {
    content: string;
    sender: "ai" | "user";
    structuredData?: StructuredData;
  };
}

const DataTable: React.FC<{ data: any[] }> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header) => (
                <td key={header} className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const countryStateData: Record<string, string[]> = {
  USA: ["California", "Texas", "New York", "Florida"],
  Canada: ["Ontario", "Quebec", "British Columbia"],
  India: ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu"],
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAi = message.sender === "ai";

  // Filter Dropdown State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState(""); // Reset state when country changes
  };

  return (
    <div className={`flex w-full mb-4 ${isAi ? "justify-start" : "justify-end"}`}>
      <div className={`flex max-w-[90%] ${isAi ? "flex-row" : "flex-row-reverse"}`}>
        <div
          className={`flex items-center justify-center h-10 w-10 rounded-full ${
            isAi ? "bg-indigo-100 text-indigo-600" : "bg-gray-200 text-gray-600"
          } flex-shrink-0`}
        >
          {isAi ? <Bot size={20} /> : <User size={20} />}
        </div>

        <div className={`relative mx-3 px-4 py-3 rounded-lg ${isAi ? "bg-gray-100" : "bg-indigo-100"} overflow-hidden`}>
          {isAi && (
            <div className="absolute top-2 right-2">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
              >
                <Filter size={16} />
                <ChevronDown size={16} />
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-3 z-10">
                  <h4 className="text-sm font-semibold mb-2">Filter Options</h4>

                  {/* Country Dropdown */}
                  <label className="text-xs font-medium text-gray-600">Select Country:</label>
                  <select
                    className="w-full border rounded p-2 mt-1 text-sm"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    <option value="">-- Select Country --</option>
                    {Object.keys(countryStateData).map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>

                  {/* State Dropdown */}
                  {selectedCountry && (
                    <>
                      <label className="text-xs font-medium text-gray-600 mt-2">Select State:</label>
                      <select
                        className="w-full border rounded p-2 mt-1 text-sm"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                      >
                        <option value="">-- Select State --</option>
                        {countryStateData[selectedCountry].map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </>
                  )}

                  {/* Apply Filter Button */}
                  <button
                    className="w-full mt-3 bg-indigo-600 text-white py-1.5 rounded text-sm hover:bg-indigo-700"
                    onClick={() => {
                      console.log("Filter Applied:", selectedCountry, selectedState);
                      setIsFilterOpen(false);
                    }}
                  >
                    Apply Filters
                  </button>
                </div>
              )}
            </div>
          )}

          <p className="text-sm mb-2">{message.content}</p>

          {message.structuredData && (
            <div className="mt-4">
              {message.structuredData.key_insights?.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Key Insights:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {message.structuredData.key_insights.map((insight, index) => (
                      <li key={index}>{insight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {message.structuredData.data && (
                <div>
                  {Object.entries(message.structuredData.data).map(([key, value]) => {
                    if (Array.isArray(value)) {
                      return (
                        <div key={key} className="mt-4">
                          <h4 className="text-sm font-semibold mb-2">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </h4>
                          <DataTable data={value} />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
