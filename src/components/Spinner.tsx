const Spinner = () => {
  return (
    <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-80'>
      {/* Spinner Circle */}
      <div className='w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin shadow-md'></div>

      {/* Spinner Text */}
      <span className='mt-4 text-amber-700 font-semibold text-lg animate-pulse'>
        Submitting...
      </span>
    </div>
  );
};

export default Spinner;
