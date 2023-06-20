import React from "react";
import { PaperAirplaneIcon, XCircleIcon } from "@heroicons/react/24/outline";

const ConmentForm = ({
  handleSubmit,
  placeholder,
  value,
  formCancel = {state:false, func:function(){}},
}) => {
  return (
    <form
      method="post"
      className="flex w-full items-center relative"
      onSubmit={handleSubmit}
    >
      <textarea
        type="text"
        name="text"
        id="text"
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3 resize-none"
        cols={30} rows={10}
      ></textarea>

      <div className="flex items-center gap-x-2 pt-2">
        {formCancel.state && (
          <button
            type="button"
            className="absolute bottom-0 right-14 z-10 top-44"
            onClick={()=> formCancel.func()}
          >
            <XCircleIcon className="w-7 h-auto text-red-400" />
            <span className="hidden">cancel</span>
          </button>
        )}
        <button type="submit" className="absolute bottom-0 right-4 z-10 top-44">
          <PaperAirplaneIcon className="w-7 h-auto text-gray-400" />
          <span className="hidden">send</span>
        </button>
      </div>
    </form>
  );
};

export default ConmentForm;
