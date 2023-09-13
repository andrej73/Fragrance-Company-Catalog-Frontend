import React from 'react';

function Header() {
    return (
        <div>
            <div className='flex flex-row justify-center items-center space-x-2 md:justify-start bg-gray-700 p-4'>
                <div>
                    <i className='fa fa-flask text-2xl md:text-3xl text-orange-100'></i>
                </div>
                <p className='text-white font-bold text-lg md:text-xl'>
                    ScentSational
                </p>
            </div>
        </div>
    )
}

export default Header;