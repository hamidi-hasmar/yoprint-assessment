function Loading() {
  return (
    <div className="border-2 border-gray-100 shadow-lg rounded-lg p-4 bg-white animate-pulse">
      <div className="flex justify-center">
        <div className="bg-gray-300 w-48 h-48 rounded"></div>
      </div>
      <div className="my-4 grid grid-cols-2 gap-2">
        <div className="bg-gray-300 h-5 rounded col-span-1"></div>
        <div className="bg-gray-300 h-5 rounded col-span-1"></div>
      </div>
      <div className="my-4">
        <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
      </div>
      <div className="flex mt-2">
        <div className="bg-gray-300 h-4 w-1/2 rounded mr-2"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      </div>
      <div className="relative bottom-0 mt-4 bg-gray-300 h-4 w-1/4 rounded"></div>
    </div>
  );
}

export default Loading;
