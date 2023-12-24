import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://localhost/gymapi/api/';
const apiEndpointFighter = `${API_BASE_URL}fighter/`;
const apiEndpointDojo = `${API_BASE_URL}dojo/`;
const apiEndpointModality = `${API_BASE_URL}modality/`;
const apiEndpointCategory = `${API_BASE_URL}category/`;
const apiEndpointGender = `${API_BASE_URL}gender/`;

const ModifyFighterComponent = ({ match }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [fightCount, setFightCount] = useState('');
    const [nic, setNic] = useState('');
    const [remarks, setRemarks] = useState('');
    const [dojos, setDojos] = useState([]);
    const [modalities, setModalities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [genders, setGenders] = useState('');
    const [selectedDojoId, setSelectedDojoId] = useState('');
    const [selectedModality, setSelectedModality] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedGender, setSelectedGender] = useState('');

    // Errors
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [weightError, setWeightError] = useState('');
    const [heightError, setHeightError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [fightCountError, setFightCountError] = useState('');
    const [nicError, setNicError] = useState('');
    const [dojoError, setDojoError] = useState('');
    const [modalityError, setModalityError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [genderError, setGenderError] = useState('');

    const history = useHistory();

    useEffect(() => {
        let source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                // Get fighter info on loading

                if (!match.params || !match.params.id) {
                    console.error('Fighter ID is missing in the URL.');
                    return;
                }

                const response = await axios.get(`${apiEndpointFighter}${match.params.id}`, {
                    cancelToken: source.token,
                });

                const fighterData = response.data.data;

                setFirstName(fighterData.firstName);
                setLastName(fighterData.lastName);
                setWeight(fighterData.weight);
                setHeight(fighterData.height);
                setAge(fighterData.age);
                setNic(fighterData.nic);
                setFightCount(fighterData.fightCount);
                setRemarks(fighterData.remarks);
                setSelectedDojoId(fighterData.dojoId);
                setSelectedModality(fighterData.modality || '');
                setSelectedCategory(fighterData.category || '');
                setSelectedGender(fighterData.gender || '');


                // Fetch provinces and localities data from the API
                const dojosResponse = await axios.get(`${apiEndpointDojo}getdojosddl`, {
                    cancelToken: source.token,
                });
                const modalitiesResponse = await axios.get(`${apiEndpointModality}getmodalities`, {
                    cancelToken: source.token,
                });
                const categoriesResponse = await axios.get(`${apiEndpointCategory}getcategories`, {
                    cancelToken: source.token,
                });
                const gendersResponse = await axios.get(`${apiEndpointGender}getgenders`, {
                    cancelToken: source.token,
                });

                setDojos(dojosResponse.data.data);
                setModalities(modalitiesResponse.data.data);
                setCategories(categoriesResponse.data.data);
                setGenders(gendersResponse.data.data);
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
    }, []);

    // Handle click on Modify button
    const handleModifyClick = async (e) => {
        e.preventDefault();

        // Clear previous errors
        clearErrors();

        // Validate that all required fields are filled in
        if (!firstName || !lastName || !weight || !height || !age || !fightCount || !nic
            || !selectedCategory || !selectedModality || !selectedGender || !selectedDojoId) {
            setValidationErrors();
            return;
        }

        try {
            // Send data to the API to modify a fighter
            const response = await axios.put(
                `${apiEndpointFighter}${match.params.id}`, // Use axios.put for updating data
                {
                    firstName,
                    lastName,
                    weight,
                    height,
                    age,
                    fightCount,
                    nic,
                    remarks,
                    dojoId: selectedDojoId,
                    modality: selectedModality,
                    category: selectedCategory,
                    gender: selectedGender,
                    status: 1,
                    eventId: 1
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
            console.error('Error updating the fighter:', error);
        }
    };

    // Clear the form fields
    const clearForm = () => {
        setFirstName('');
        setLastName('');
        setWeight('');
        setHeight('');
        setAge('');
        setFightCount('');
        setNic('');
        setRemarks('');
        setSelectedDojoId('');
        setSelectedModality('');
        setSelectedCategory('');
        setSelectedGender('');
    };

    const setValidationErrors = () => {
        // Set errors for each field that is empty
        if (!firstName) setFirstNameError('First name is required.');
        if (!lastName) setLastNameError('Last name is required.');
        if (!weight) setWeightError('Weight is required.');
        if (!height) setHeightError('Height is required.');
        if (!age) setAgeError('Age is required.');
        if (!fightCount) setFightCountError('Fight count is required.');
        if (!nic) setNicError('NIC is required.');
        if (!selectedDojoId) setDojoError('Dojo is required.');
        if (!selectedCategory) setCategoryError('Category is required.');
        if (!selectedModality) setModalityError('Modality is required.');
        if (!selectedGender) setGenderError('Gender is required.');
    };

    const clearErrors = () => {
        // Clear all error messages
        setFirstNameError('');
        setLastNameError('');
        setWeightError('');
        setHeightError('');
        setAgeError('');
        setFightCountError('');
        setNicError('');
        setDojoError('');
        setCategoryError('');
        setModalityError('');
        setGenderError('');
    };

    const handleCancel = () => {
        history.push(`/fighters/list/`);
    };

    return (
        <div className="container mt-5">
            <h1>MODIFY FIGHTER</h1>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleModifyClick}>
                        <div className="mb-3">
                            <label className="form-label">FirstName:</label>
                            <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <small className="text-danger">{firstNameError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">LastName:</label>
                            <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <small className="text-danger">{lastNameError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Weight:</label>
                            <input type="text" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} />
                            <small className="text-danger">{weightError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Height:</label>
                            <input type="text" className="form-control" value={height} onChange={(e) => setHeight(e.target.value)} />
                            <small className="text-danger">{heightError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Age:</label>
                            <input type="text" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                            <small className="text-danger">{ageError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">NIC:</label>
                            <input type="text" className="form-control" value={nic} onChange={(e) => setNic(e.target.value)} />
                            <small className="text-danger">{nicError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">FightCount:</label>
                            <input type="text" className="form-control" value={fightCount} onChange={(e) => setFightCount(e.target.value)} />
                            <small className="text-danger">{fightCountError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Dojo:</label>
                            <select className="form-control" value={selectedDojoId} onChange={(e) => setSelectedDojoId(e.target.value)}>
                                <option value="">Select Dojo</option>
                                {dojos && dojos.map((dojo) => (
                                    <option key={dojo.id} value={dojo.id}>
                                        {dojo.name}
                                    </option>
                                ))}
                            </select>
                            <small className="text-danger">{dojoError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Modality:</label>
                            <select className="form-control" value={selectedModality} onChange={(e) => setSelectedModality(e.target.value)}>
                                <option value="">Select Modality</option>
                                {modalities && modalities.map((modality) => (
                                    <option key={modality} value={modality} selected={modality === selectedModality}>
                                        {modality}
                                    </option>
                                ))}
                            </select>
                            <small className="text-danger">{modalityError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Category:</label>
                            <select className="form-control" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                {categories && categories.map((category) => (
                                    <option key={category} value={category} selected={category === selectedCategory}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <small className="text-danger">{categoryError}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gender:</label>
                            <select className="form-control" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
                                <option value="">Select Gender</option>
                                {genders && genders.map((gender) => (
                                    <option key={gender} value={gender} selected={gender === selectedGender}>
                                        {gender}
                                    </option>
                                ))}
                            </select>
                            <small className="text-danger">{genderError}</small>
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

export default ModifyFighterComponent;
