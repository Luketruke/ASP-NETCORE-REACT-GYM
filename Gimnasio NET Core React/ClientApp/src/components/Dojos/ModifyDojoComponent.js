import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://localhost/gymapi/api/';
const apiEndpointAddress = `${API_BASE_URL}address/`;
const apiEndpointDojo = `${API_BASE_URL}dojo/`;

const ModifyDojoComponent = ({ match }) => {
    const [name, setName] = useState('');
    const [professor, setProfessor] = useState('');
    const [professorPhone, setProfessorPhone] = useState('');
    const [teamPhone, setTeamPhone] = useState('');
    const [address, setAddress] = useState('');
    const [remarks, setRemarks] = useState('');
    const [provinces, setProvinces] = useState([]);
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
    const history = useHistory();

    useEffect(() => {
        let source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                // Get dojo info on loading

                if (!match.params || !match.params.id) {
                    console.error('Dojo ID is missing in the URL.');
                    return;
                }

                const response = await axios.get(`${apiEndpointDojo}${match.params.id}`, {
                    cancelToken: source.token,
                });

                const dojoData = response.data.data;

                setName(dojoData.name);
                setProfessor(dojoData.instructorName);
                setProfessorPhone(dojoData.instructorPhone);
                setTeamPhone(dojoData.dojoPhone);
                setAddress(dojoData.shortAddress);
                setRemarks(dojoData.remarks);
                setSelectedProvinceId(dojoData.provinceId);
                setSelectedLocalityId(dojoData.localityId);

                // Fetch provinces and localities data from the API
                const provincesResponse = await axios.get(`${apiEndpointAddress}getprovinces`, {
                    cancelToken: source.token,
                });
                const localitiesResponse = await axios.get(`${apiEndpointAddress}getlocalities`, {
                    cancelToken: source.token,
                });

                setProvinces(provincesResponse.data.data);
                setAllLocalities(localitiesResponse.data.data); // Store all localities unfiltered

                // Filter localities based on the selected province
                const filteredLocalities = localitiesResponse.data.data.filter(locality => {
                    return locality.provinceId == dojoData.provinceId;
                });

                setFilteredLocalities(filteredLocalities);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();

        return () => {
            source.cancel();
        };
    }, [match.params]);

    // Handle change in selected province
    const handleProvinceChange = (selectedProvinceId) => {
        // Filter localities based on the selected province
        const filteredLocalities = allLocalities.filter(locality => {
            return locality.provinceId == selectedProvinceId;
        });

        setFilteredLocalities(filteredLocalities);
        setSelectedProvinceId(selectedProvinceId);
        setSelectedLocalityId('');
    };

    // Handle click on Modify button
    const handleModifyClick = async (e) => {
        e.preventDefault();

        // Clear previous errors
        clearErrors();

        // Validate that all required fields are filled in
        if (!name || !address || !professor || !professorPhone || !teamPhone || !selectedProvinceId || !selectedLocalityId) {
            setValidationErrors();
            return;
        }

        try {
            // Send data to the API to modify the dojo
            const response = await axios.put(
                `${apiEndpointDojo}${match.params.id}`,
                {
                    name,
                    shortAddress: address,
                    fullAddress: address,
                    instructorName: professor,
                    instructorPhone: professorPhone,
                    dojoPhone: teamPhone,
                    remarks,
                    provinceId: selectedProvinceId,
                    localityId: selectedLocalityId,
                    status: 1
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('API Response:', response.data);

            // Clear the form fields and redirect to the index page
            clearForm();
            history.push('/dojos/list');
        } catch (error) {
            console.error('Error modifying the dojo:', error);
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
        setSelectedProvinceId('');
        setSelectedLocalityId('');
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

    const handleCancel = () => {
        history.push(`/dojos/list/`);
    };

    return (
        <div className="container mt-5">
            <h1>MODIFY DOJO</h1>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleModifyClick}>
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
                            <select className="form-control" value={selectedProvinceId} onChange={(e) => handleProvinceChange(e.target.value)}>
                                <option value="">Select Province</option>
                                {provinces && provinces.map((province) => (
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
                        <button type="submit" className="btn btn-success">Modify</button>
                        <button type="submit" onClick={() => handleCancel()} className="btn btn-danger">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModifyDojoComponent;
