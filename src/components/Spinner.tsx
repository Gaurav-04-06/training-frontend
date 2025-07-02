const Spinner = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center   '>
      <div className='w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin'></div>
      <span className='ml-4  text-lg font-semibold'>Submitting...</span>
    </div>
  );
};

export default Spinner;
