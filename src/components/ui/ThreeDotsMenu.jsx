import { useEffect, useRef, useState } from "react";

export default function ThreeDotsMenu({ updateFunction, deleteFunction }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" relative" ref={menuRef}>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-full hover:bg-gray-200"
      >
        <i className="fa-solid fa-ellipsis"></i>
      </button>

      {open && (
        <div className=" absolute right-0 top-full mt-2 z-50 bg-white shadow-lg rounded-lg p-2">
          <button
            className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
            onClick={() => {
              updateFunction();
              setOpen(false);
            }}
          >
            Edit
          </button>

          <button
            className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 rounded"
            onClick={() => {
              deleteFunction();
              setOpen(false);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
