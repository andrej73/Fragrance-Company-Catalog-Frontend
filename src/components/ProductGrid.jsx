import React, { useContext, useState } from 'react';
import ProductCard from './ProductCard';
import { ProductContext } from '../ProductContext';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

function ProductGrid() {
    const products = useContext(ProductContext)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [currentPage, setCurrentPage] = useState(0)

    // Responsive pagination
    const productsPerRow = window.innerWidth < 768 ? 2 : window.innerWidth < 1440 ? 3 : 4
    const productsPerPage = productsPerRow * (window.innerWidth < 768 ? 4 : window.innerWidth < 1440 ? 5 : 6)

    // Handle checkbox changes. Remove if already selected, add if not.
    const handleCategoryChange = (event) => {
        const category = event.target.value
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category))
        } else {
            setSelectedCategories([...selectedCategories, category])
        }
    }

    // Check if product belongs to at least one selected category
    const productBelongsToSelectedCategories = (product) => {
        if (selectedCategories.length === 0) {
            return true
        }
        return selectedCategories.some((category) =>
            product.category.includes(category)
        )
    }

    const filteredProducts = products.filter(productBelongsToSelectedCategories)

    // Get number of pages total
    const pageCount = Math.ceil(filteredProducts.length / productsPerPage)

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected)
    };

    // Calculate index range of products to display on page
    const startIndex = currentPage * productsPerPage
    const endIndex = startIndex + productsPerPage
    const productsToDisplay = filteredProducts.slice(startIndex, endIndex)

    return (
        <div>
            <div className='lg:flex lg:flex-row lg:items-start'>
                {/* Filtering by categories. Map through a set so each category is displayed just once */}
                <div className='mt-4 mx-5'>
                    <p className='font-semibold md:text-xl lg:text-2xl'>Categories</p>
                    <div className='flex flex-wrap lg:flex-col mt-2 lg:space-y-2 md:text-lg lg:text-xl'>
                        {[...new Set(products.flatMap((product) => product.category))].map((category) => (
                            <label key={category} className="block cursor-pointer">
                                <div className='flex flex-row mr-3 items-center'>
                                    <input
                                        type="checkbox"
                                        value={category}
                                        checked={selectedCategories.includes(category)}
                                        onChange={handleCategoryChange}
                                        className="mr-1"
                                    />
                                    {category}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
                {/* Map through products array and display grid of product cards */}
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 p-4 gap-3 md:gap-5 xl:gap-7'>
                    {productsToDisplay.map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`}>
                            <ProductCard product={product} />
                        </Link>
                    ))}
                </div>
            </div>
            <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
    )
}

export default ProductGrid;