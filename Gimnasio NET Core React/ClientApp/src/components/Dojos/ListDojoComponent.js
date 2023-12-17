// Import necessary dependencies from React and Axios
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

// Define the base URL and endpoint for the API
const API_BASE_URL = 'https://localhost/gymapi/api/';
const apiEndpointDojo = `${API_BASE_URL}dojo/`;

// Assuming a fixed page size
const pageSize = 9;
const maxPageNumbers = 5;

// Define the structure of the Dojo object
interface Dojo {
    id: number;
    name: string;
    instructorName: string;
    instructorPhone: string;
    dojoPhone: string;
    shortAddress: string;
    remarks: string;
    provinceId: number;
    localityId: number;
}

// Define the structure of the pagination details
interface PaginationDetails {
    CurrentPage: number;
    TotalPages: number;
    PageSize: number;
    TotalCount: number;
}

// Define the functional component
const ListDojoComponent = () => {
    // State variables to manage the list of dojos, current page, loading state, and total items
    const [dojos, setDojos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);

    // Function to fetch data based on the page number
    const fetchData = async (pageNumber: number) => {
        try {
            // Make an Axios GET request to the API endpoint with pagination parameters
            const response: AxiosResponse<{ data: Dojo[] }> = await axios.get(apiEndpointDojo, {
                params: { pageNumber, pageSize },
            });

            // Log the response headers to the console
            console.log('Response Headers:', response.headers);

            // Check if the "X-Pagination" header is present in the response
            if ('x-pagination' in response.headers) {
                // Parse the pagination details from the header and update the state
                const paginationDetails: PaginationDetails = JSON.parse(response.headers['x-pagination']);
                setTotalItems(paginationDetails.TotalCount);
            } else {
                // Log an error if the "X-Pagination" header is not found
                console.error('"X-Pagination" header not found in the response.');
            }

            // Update the state with the retrieved data and pagination details
            setDojos(response.data.data);
            setCurrentPage(pageNumber);
            setLoading(false);
        } catch (error) {
            // Log an error if there is an issue fetching data
            console.error('Error fetching data:', error);
        }
    };

    // useEffect hook to fetch data on component mount (page 1)
    useEffect(() => {
        fetchData(currentPage);
    }, []); // Empty dependency array ensures it only runs once on mount

    // Functions to handle pagination - fetch next and previous pages
    const handleNextPage = () => {
        fetchData(currentPage + 1);
    };

    const handlePreviousPage = () => {
        fetchData(currentPage - 1);
    };

    const generatePageNumbers = () => {
        const totalPages = Math.ceil(totalItems / pageSize);
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));

        for (let i = startPage; i <= Math.min(totalPages, startPage + maxPageNumbers - 1); i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };
    // Render JSX content based on loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    // Render the list of dojos and pagination controls
    return (
        <div>
            <h1>Dojo List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Instructor</th>
                        <th>Instructor's Phone</th>
                        <th>Team's Phone</th>
                        <th>Address</th>
                        <th>Remarks</th>
                        <th>Province</th>
                        <th>Locality</th>
                    </tr>
                </thead>
                <tbody>
                    {dojos.map((dojo) => (
                        <tr key={dojo.id}>
                            <td>{dojo.name}</td>
                            <td>{dojo.instructorName}</td>
                            <td>{dojo.instructorPhone}</td>
                            <td>{dojo.dojoPhone}</td>
                            <td>{dojo.shortAddress}</td>
                            <td>{dojo.remarks}</td>
                            <td>{dojo.provinceId}</td>
                            <td>{dojo.localityId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div>
                <p>
                    Page {currentPage} of {Math.ceil(totalItems / pageSize)} ({totalItems} items)
                </p>
                {currentPage > 1 && (
                    <button onClick={handlePreviousPage}>Previous</button>
                )}
                {generatePageNumbers().map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => fetchData(pageNumber)}
                        className={pageNumber === currentPage ? 'active' : ''}
                    >
                        {pageNumber}
                    </button>
                ))}
                {currentPage < Math.ceil(totalItems / pageSize) && (
                    <button onClick={handleNextPage}>Next</button>
                )}
            </div>
        </div>
    );
};

export default ListDojoComponent;