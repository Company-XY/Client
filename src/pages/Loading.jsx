const Skeleton = () => {
  return (
    <div className="p-4 w-full bg-white rounded-md h-[90vh]">
      <div className="animate-pulse space-y-4">
        <div className="h-96 w-full bg-gray-300 rounded-lg"></div>

        <div className="h-12 bg-gray-300 rounded w-3/4 text-center"></div>

        <div className="h-20 bg-gray-300 rounded w-2/4"></div>
        <ul className="space-y-4">
          <li>
            <div className="h-12 bg-gray-300 rounded w-3/4"></div>
          </li>
          <li>
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          </li>
          <li>
            <div className="h-8 bg-gray-300 rounded w-2/4"></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Skeleton;
