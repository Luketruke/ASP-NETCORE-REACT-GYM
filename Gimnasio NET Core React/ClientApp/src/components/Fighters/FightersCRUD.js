import React, { useState } from 'react';

const FightersCRUD = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [team, setTeam] = useState('');
    const [category, setCategory] = useState('');
    const [modality, setModality] = useState('');
    const [gender, setGender] = useState('');
    const [dni, setDNI] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [fightCount, setFightCount] = useState('');
    const [observations, setObservations] = useState('');

    const handleAddClick = () => {
        // Logic to add/modify fighter; you can send data to the backend here
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Fighters</h1>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="mb-0">
                        <label htmlFor="txtFirstName" className="form-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="txtFirstName"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {/* Add any additional elements or validations */}
                    </div>

                    <div className="mb-0">
                        <label htmlFor="txtLastName" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="txtLastName"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {/* Add any additional elements or validations */}
                    </div>

                    <div>
                        <label htmlFor="ddlTeams" className="form-label">
                            Team
                        </label>
                        {/* Add logic to populate the dropdown options */}
                        <select
                            id="ddlTeams"
                            className="form-select"
                            value={team}
                            onChange={(e) => setTeam(e.target.value)}
                        >
                            {/* Add dropdown options here */}
                        </select>
                        {/* Add any additional elements or validations */}
                    </div>

                    <div>
                        <label htmlFor="ddlCategories" className="form-label">
                            Category
                        </label>
                        {/* Add logic to populate the dropdown options */}
                        <select
                            id="ddlCategories"
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {/* Add dropdown options here */}
                        </select>
                        {/* Add any additional elements or validations */}
                    </div>

                    <div>
                        <label htmlFor="ddlModalities" className="form-label">
                            Modality
                        </label>
                        {/* Add logic to populate the dropdown options */}
                        <select
                            id="ddlModalities"
                            className="form-select"
                            value={modality}
                            onChange={(e) => setModality(e.target.value)}
                        >
                            {/* Add dropdown options here */}
                        </select>
                        {/* Add any additional elements or validations */}
                    </div>

                    <div>
                        <label htmlFor="ddlGenders" className="form-label">
                            Gender
                        </label>
                        {/* Add logic to populate the dropdown options */}
                        <select
                            id="ddlGenders"
                            className="form-select"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            {/* Add dropdown options here */}
                        </select>
                        {/* Add any additional elements or validations */}
                    </div>

                    <div className="mb-0">
                        <label htmlFor="txtDNI" className="form-label">
                            DNI
                        </label>
                        <input
                            type="text"
                            id="txtDNI"
                            maxLength="50"
                            className="form-control"
                            value={dni}
                            onKeyPress={(e) => e.preventDefault()}
                            onChange={(e) => setDNI(e.target.value)}
                        />
                    </div>

                    <div className="mb-0" style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="txtWeight" className="form-label">
                                Weight
                            </label>
                            <input
                                type="text"
                                id="txtWeight"
                                maxLength="6"
                                className="form-control"
                                value={weight}
                                onKeyPress={(e) => e.preventDefault()}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                        <div style={{ width: '10px' }}></div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="txtAge" className="form-label">
                                Age
                            </label>
                            <input
                                type="text"
                                id="txtAge"
                                maxLength="2"
                                value={age}
                                className="form-control"
                                onKeyPress={(e) => e.preventDefault()}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="txtHeight" className="form-label">
                                Height
                            </label>
                            <input
                                type="text"
                                id="txtHeight"
                                maxLength="2"
                                value={height}
                                className="form-control"
                                onKeyPress={(e) => e.preventDefault()}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="txtFightCount" className="form-label">
                                Fight Count
                            </label>
                            <input
                                type="text"
                                id="txtFightCount"
                                maxLength="5"
                                value={fightCount}
                                className="form-control"
                                onKeyPress={(e) => e.preventDefault()}
                                onChange={(e) => setFightCount(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-0">
                        <label htmlFor="txtObservations" className="form-label">
                            Observations
                        </label>
                        <textarea
                            id="txtObservations"
                            className="form-control"
                            value={observations}
                            onChange={(e) => setObservations(e.target.value)}
                        />
                    </div>

                    <div>
                        <table style={{ width: '100%' }}>
                            <tr style={{ width: '100%' }}>
                                <td style={{ width: '100%' }}>
                                    <label htmlFor="fileUpload" className="form-label">
                                        Upload Photo
                                    </label>
                                </td>
                            </tr>
                            <tr style={{ width: '100%' }}>
                                <td style={{ width: '100%' }}>
                                    <div className="input-group" style={{ width: '100%' }}>
                                        <input type="file" id="fileUpload" className="form-control" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <br />

                    <div id="buttons" style={{ marginLeft: 'auto' }}>
                        <button className="btn btn-danger" onClick={handleAddClick}>
                            Cancel
                        </button>
                        <button className="btn btn-success" onClick={handleAddClick}>
                            Add
                        </button>
                        <button className="btn btn-success" onClick={handleAddClick} style={{ display: 'none' }}>
                            Modify
                        </button>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    );
};

export default FightersCRUD;
