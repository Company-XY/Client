const LoadingSpinner = ({ active }) => {
  if (!active) return null;

  return (
    <div className="top-0 left-0 w-full h-[80vh] flex justify-center items-center z-20 mt-20 bg-opacity-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;
