import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const API_BASE_URL = 'https://localhost/gymapi/api/';
const apiEndpointDojo = `${API_BASE_URL}dojo/`;
const pageSize = 9;
const maxPageNumbers = 5;

const ListDojoComponent = () => {
    const [dojos, setDojos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedDojoId, setSelectedDojoId] = useState(null);

    const history = useHistory();

    const fetchData = async (pageNumber) => {
        try {
            const response = await axios.get(apiEndpointDojo, {
                params: { pageNumber, pageSize },
            });

            if ('x-pagination' in response.headers) {
                const paginationDetails = JSON.parse(response.headers['x-pagination']);
                setTotalItems(paginationDetails.TotalCount);
            } else {
                console.error('"X-Pagination" header not found in the response.');
            }

            setDojos(response.data.data);
            setCurrentPage(pageNumber);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        fetchData(currentPage + 1);
    };

    const handlePreviousPage = () => {
        fetchData(currentPage - 1);
    };

    const handleModify = (id) => {
        history.push(`/dojos/modify/${id}`);
    };

    const handleDelete = (id) => {
        setSelectedDojoId(id);
    };

    // Delete the selected dojo and reset the selectedDojoId state
    const handleConfirmDelete = async () => {
        try {
            // Send HTTP DELETE request to delete the dojo
            await axios.delete(`${apiEndpointDojo}${selectedDojoId}`);

            // Reset the selectedDojoId state
            setSelectedDojoId(null);

            // Refetch data after successful deletion
            fetchData(currentPage);

        } catch (error) {
            console.error('Error deleting dojo:', error);
        }
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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Dojo List</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Instructor</th>
                        {/*<th>Instructor's Phone</th>*/}
                        <th>Team's Phone</th>
                        <th>Address</th>
                        <th>Remarks</th>
                        {/*<th>Province</th>*/}
                        {/*<th>Locality</th>*/}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dojos.map((dojo) => (
                        <tr key={dojo.id}>
                            <td>{dojo.name}</td>
                            <td>{dojo.instructorName}</td>
                            {/*<td>{dojo.instructorPhone}</td>*/}
                            <td>{dojo.dojoPhone}</td>
                            <td>{dojo.shortAddress}</td>
                            <td>{dojo.remarks}</td>
                            {/*<td>{dojo.provinceName}</td>*/}
                            {/*<td>{dojo.localityName}</td>*/}
                            <td>
                                <button
                                    className="btn btn-primary mr-2"
                                    onClick={() => handleModify(dojo.id)}>
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(dojo.id)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <p>
                    Page {currentPage} of {Math.ceil(totalItems / pageSize)} ({totalItems} items)
                </p>
                {currentPage > 1 && (
                    <button
                        className="btn btn-secondary mr-2"
                        onClick={handlePreviousPage}
                    >
                        Previous
                    </button>
                )}
                {generatePageNumbers().map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => fetchData(pageNumber)}
                        className={`btn ${pageNumber === currentPage
                            ? 'btn-primary'
                            : 'btn-secondary'
                            } mr-2`}
                    >
                        {pageNumber}
                    </button>
                ))}
                {currentPage < Math.ceil(totalItems / pageSize) && (
                    <button className="btn btn-secondary" onClick={handleNextPage}>
                        Next
                    </button>
                )}
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm delete?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {/*<div className="modal-body">*/}

                        {/*</div>*/}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleConfirmDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListDojoComponent;