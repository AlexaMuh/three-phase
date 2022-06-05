import React from 'react';

function Header() {
  return (
    <div className="w-full sticky flex-1 bg-teal-700 flex flex-row justify-end text-white">
      <div className="flex flex-row items-center justify-center px-4">
        <p className='mr-2 text-2xl font-semibold'>Monitoring Tiga Fasa</p>
      </div>
    </div>
  );
}

export default Header;