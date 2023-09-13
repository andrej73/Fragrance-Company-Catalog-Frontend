import React from 'react';

function ProductCard({ product }) {
    return (
        <div className='flex flex-col items-center text-center rounded-lg shadow-lg p-4 lg:p-6 bg-white '>
            <div className='w-full h-52 xs:h-60 lg:h-72 overflow-hidden'>
                <img src={product.image} alt={product.productName} className='h-full w-full object-cover' />
            </div>
            <div className='mt-2'>
                {/* Not very proud of the height constraints but I couldn't come up with better solution(troubles with truncate or so) in reasonable time*/}
                <p className='font-bold md:text-xl h-12 md:h-14 3xl:h-14 text-ellipsis'>{product.productName}</p> 
                <div className='flex flex-wrap justify-center mt-1 space-x-1 font-semibold md:text-xl'>
                    {product.category.map((cat) => (
                        <span key={cat} className='mb-1 px-2 py-1 rounded-full bg-gray-200 text-gray-800 text-xs md:text-base'>
                            {cat}
                        </span>
                    ))}
                </div>
                <p className='text-red-600 font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl'>${product.price.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default ProductCard;