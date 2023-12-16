/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DojosCRUD = () => {
    const [, setDojos] = useState([]);
    const [name, setName] = useState('');
    const [professor, setProfessor] = useState('');
    const [professorPhone, setProfessorPhone] = useState('');
    const [teamPhone, setTeamPhone] = useState('');
    const [address, setAddress] = useState('');
    const [remarks, setRemarks] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [, setLocalities] = useState([]);
    const [allLocalities, setAllLocalities] = useState([]);
    const [selectedProvinceId, setSelectedProvinceId] = useState('');
    const [selectedLocalityId, setSelectedLocalityId] = useState('');
    const [filteredLocalities, setFilteredLocalities] = useState([]);
    const [nameError, setNameError] = useState('');
    const [professorError, setProfessorError] = useState('');
    const [professorPhoneError, setProfessorPhoneError] = useState('');
    const [teamPhoneError, setTeamPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [provinceError, setProvinceError] = useState('');
    const [localityError, setLocalityError] = useState('');

    // Fetch dojos data from the API
    const fetchData = async (source) => {
        try {
            const response = await axios.get('https://localhost/gymapi/api/dojo', {
                cancelToken: source.token,
            });
            setDojos(response.data.data);
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error('Error fetching dojos:', error);
            }
        }
    };

    useEffect(() => {
        let source = axios.CancelToken.source();

        // Fetch provinces and localities data from the API
        const fetchProvincesAndLocalities = async () => {
            try {
                const provincesResponse = await axios.get('https://localhost/gymapi/api/address/getprovinces', {
                    cancelToken: source.token,
                });
                const localitiesResponse = await axios.get('https://localhost/gymapi/api/address/getlocalities', {
                    cancelToken: source.token,
                });

                console.log('Provinces response:', provincesResponse.data.data);
                console.log('Localities response:', localitiesResponse.data.data);

                setProvinces(provincesResponse.data.data);
                setAllLocalities(localitiesResponse.data.data); // Store all localities unfiltered
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching provinces or localities:', error);
                }
            }
        };

        fetchData(source);
        fetchProvincesAndLocalities();

        return () => {
            source.cancel();
        };
    }, []);

    // Handle change in selected province
    const handleProvinceChange = (selectedProvinceId) => {
        console.log('Selected Province:', selectedProvinceId);
        console.log('All localities before filter:', allLocalities);

        // Filter localities based on the selected province
        const filteredLocalities = allLocalities.filter(locality => {
            return locality.provinceId == selectedProvinceId;
        });
        console.log('Filtered Localities:', filteredLocalities);

        setFilteredLocalities(filteredLocalities);
        setSelectedProvinceId(selectedProvinceId);
        setSelectedLocalityId('');
    };

    // Handle click on Add button
    const handleAddClick = async (e) => {
        e.preventDefault();

        // Clear previous errors
        clearErrors();

        // Validate that all required fields are filled in
        if (!name || !address || !professor || !professorPhone || !teamPhone || !selectedProvinceId || !selectedLocalityId) {
            setValidationErrors();
            return;
        }

        try {
            console.log('Adding dojo...');
            console.log('Name:', name);
            console.log('Address:', address);
            console.log('Professor:', professor);
            console.log('Professor\'s Phone:', professorPhone);
            console.log('Team\'s Phone:', teamPhone);
            console.log('Remarks:', remarks);
            console.log('Selected Province:', selectedProvinceId);
            console.log('Selected Locality:', selectedLocalityId);

            // Send data to the API to add a new dojo
            const response = await axios.post(
                'https://localhost/gymapi/api/dojo',
                {
                    name,
                    shortAddress: address,
                    fullAddress: address,
                    instructorName: professor,
                    instructorPhone: professorPhone,
                    dojoPhone: teamPhone,
                    remarks: remarks,
                    provinceId: selectedProvinceId,
                    localityId: selectedLocalityId
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('API Response:', response.data);

            clearForm();
            fetchData(); // Update the list of dojos after adding
        } catch (error) {
            console.error('Error adding the dojo:', error);
        }
    };

    // Clear the form fields
    const clearForm = () => {
        setName('');
        setProfessor('');
        setProfessorPhone('');
        setTeamPhone('');
        setAddress('');
        setRemarks('');
        setLocalities([]);
        setSelectedProvinceId('');
    };

    const setValidationErrors = () => {
        // Set errors for each field that is empty
        if (!name) setNameError('Name is required.');
        if (!professor) setProfessorError('Professor is required.');
        if (!professorPhone) setProfessorPhoneError('Professor\'s Phone is required.');
        if (!teamPhone) setTeamPhoneError('Team\'s Phone is required.');
        if (!address) setAddressError('Address is required.');
        if (!selectedProvinceId) setProvinceError('Province is required.');
        if (!selectedLocalityId) setLocalityError('Locality is required.');
    };

    const clearErrors = () => {
        // Clear all error messages
        setNameError('');
        setProfessorError('');
        setProfessorPhoneError('');
        setTeamPhoneError('');
        setAddressError('');
        setProvinceError('');
        setLocalityError('');
    };

    return (
        <div className="container mt-5">
            <h1>Dojos CRUD</h1>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleAddClick}>
                        <div className="mb-3">
                            <label className="form-label">Name:</label>
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            <small className="text-danger">{nameError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Professor:</label>
                            <input type="text" className="form-control" value={professor} onChange={(e) => setProfessor(e.target.value)} />
                            <small className="text-danger">{professorError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Professor's Phone:</label>
                            <input type="text" className="form-control" value={professorPhone} onChange={(e) => setProfessorPhone(e.target.value)} />
                            <small className="text-danger">{professorPhoneError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Team's Phone:</label>
                            <input type="text" className="form-control" value={teamPhone} onChange={(e) => setTeamPhone(e.target.value)} />
                            <small className="text-danger">{teamPhoneError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address:</label>
                            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                            <small className="text-danger">{addressError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Province:</label>
                            <select className="form-control" onChange={(e) => handleProvinceChange(e.target.value)}>
                                <option value="">Select Province</option>
                                {Array.isArray(provinces) && provinces.map((province) => (
                                    <option key={province.id} value={province.id}>
                                        {province.description}
                                    </option>
                                ))}
                            </select>
                            <small className="text-danger">{provinceError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Locality:</label>
                            <select
                                className="form-control"
                                value={selectedLocalityId}
                                onChange={(e) => setSelectedLocalityId(e.target.value)}
                            >
                                <option value="">Select Locality</option>
                                {Array.isArray(filteredLocalities) &&
                                    filteredLocalities.map((locality) => (
                                        <option key={locality.id} value={locality.id}>
                                            {locality.description}
                                        </option>
                                    ))}
                            </select>
                            <small className="text-danger">{localityError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Remarks:</label>
                            <textarea className="form-control" value={remarks} onChange={(e) => setRemarks(e.target.value)} rows="5" />
                        </div>
                        <button type="submit" className="btn btn-success">Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DojosCRUD;