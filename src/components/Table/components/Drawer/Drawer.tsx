import { ReactNode } from "react";

export default function Drawer({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: ReactNode }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Drawer Panel */}
      <div
        className={`w-[500px] bg-white shadow-lg h-full p-6 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          } border border-[#08091C14] rounded-l-[12px]`}
      >

        {/* Close Button */}
        <button className="text-gray-600 hover:text-gray-900 absolute top-6 right-6 text-[18px] w-[32px] h-[32px]" onClick={onClose}>
          ✕
        </button>

        {/* Drawer Content */}
        <div className="flex flex-col h-full">{children}</div>
      </div>
    </div>
  );
}
