import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [integer, setInteger] = useState("");
  const [roman, setRoman] = useState("");
  const [integerOutput, setIntegerOutput] = useState("");
  const [romanOutput, setRomanOutput] = useState("");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepping, setIsStepping] = useState(false);

  const convertToRoman = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/convert", {
        integer,
      });
      setRomanOutput(response.data.result);
      setSteps(response.data.steps || []);
      setCurrentStep(0);
      setIsStepping(true);
    } catch (error) {
      setRomanOutput("Invalid Input");
      setSteps([]);
    }
  };

  const convertToInteger = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/convert", {
        roman,
      });
      setIntegerOutput(response.data.result);
      setSteps(response.data.steps || []);
      setCurrentStep(0);
      setIsStepping(true);
    } catch (error) {
      setIntegerOutput("Invalid Input");
      setSteps([]);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-row items-center justify-evenly bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Flask Roman ↔ Integer Converter
          </h1>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Integer:
            </label>
            <input
              type="number"
              min="1"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter a number"
              value={integer}
              onChange={(e) => setInteger(e.target.value)}
            />
            <button
              onClick={convertToRoman}
              className="mt-3 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded transition"
            >
              Convert to Roman
            </button>
            {romanOutput && (
              <p className="mt-2 text-lg font-semibold text-gray-700">
                Roman: {romanOutput}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Roman Numeral:
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter a Roman numeral"
              value={roman}
              onChange={(e) => setRoman(e.target.value.toUpperCase())}
            />
            <button
              onClick={convertToInteger}
              className="mt-3 w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded transition"
            >
              Convert to Integer
            </button>
            {integerOutput && (
              <p className="mt-2 text-lg font-semibold text-gray-700">
                Integer: {integerOutput}
              </p>
            )}
          </div>

          
        </div>
            <div className="mt-6 bg-white p-8 rounded-lg shadow-lg  w-[500px]">
            <h2 className="text-lg font-bold text-gray-700 mb-2">
                Conversion Steps:
              </h2>
            {isStepping && steps.length > 0 && (<>
              
              <ul className="list-disc list-inside text-gray-600">
                {steps.slice(0, currentStep).map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
              {currentStep < steps.length && (
                <button
                  onClick={nextStep}
                  className="mt-3 w-full bg-purple-500 hover:bg-purple-700 text-white py-2 rounded transition"
                >
                  Next Step
                </button>
              )}
              </>
            )}
            </div>
      </div>
    </>
  );
}

export default App;
