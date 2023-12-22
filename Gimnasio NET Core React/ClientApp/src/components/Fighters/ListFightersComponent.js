import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const API_BASE_URL = 'https://localhost/gymapi/api/';
const apiEndpointFighter = `${API_BASE_URL}fighter/`;
const pageSize = 9;
const maxPageNumbers = 5;

const ListFightersComponent = () => {
    const [fighters, setFighters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedFighterId, setSelectedFighterId] = useState(null);

    const history = useHistory();

    const fetchData = async (pageNumber) => {
        try {
            const response = await axios.get(apiEndpointFighter, {
                params: { pageNumber, pageSize },
            });

            if ('x-pagination' in response.headers) {
                const paginationDetails = JSON.parse(response.headers['x-pagination']);
                setTotalItems(paginationDetails.TotalCount);
            } else {
                console.error('"X-Pagination" header not found in the response.');
            }

            setFighters(response.data.data);
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
        history.push(`/fighters/modify/${id}`);
    };

    const handleDelete = (id) => {
        setSelectedFighterId(id);
    };

    const handleAddFighter = () => {
        history.push(`/fighters/add/`);
    };

    // Delete the selected fighter and reset the selectedFighterId state
    const handleConfirmDelete = async () => {
        try {
            // Send HTTP DELETE request to delete the fighter
            await axios.delete(`${apiEndpointFighter}${selectedFighterId}`);

            // Reset the selectedFighterId state
            setSelectedFighterId(null);

            // Refetch data after successful deletion
            fetchData(currentPage);

        } catch (error) {
            console.error('Error deleting fighter:', error);
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
            <h1>Fighter List</h1>
            <button type="submit" onClick={() => handleAddFighter()} className="btn btn-success">Add Fighter</button>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Category</th>
                        <th>Modality</th>
                        <th>NIC</th>
                        <th>Remarks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fighters.map((fighter) => (
                        <tr key={fighter.id}>
                            <td>{fighter.firstName}</td>
                            <td>{fighter.lastName}</td>
                            <td>{fighter.category}</td>
                            <td>{fighter.modality}</td>
                            <td>{fighter.nic}</td>
                            <td>{fighter.remarks}</td>
                            <td>
                                <button
                                    className="btn btn-primary mr-2"
                                    onClick={() => handleModify(fighter.id)}>
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(fighter.id)}
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

export default ListFightersComponent;