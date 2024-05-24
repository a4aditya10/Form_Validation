import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const countriesAndCities = {
    India: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Surat', 'Jaipur'],
    USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
    Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Victoria'],
    Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Newcastle', 'Wollongong', 'Hobart'],
    UK: ['London', 'Birmingham', 'Glasgow', 'Liverpool', 'Bristol', 'Manchester', 'Sheffield', 'Leeds', 'Edinburgh', 'Leicester'],
    Germany: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
    France: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
    Italy: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Catania', 'Bari'],
    Japan: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama'],
    Brazil: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Goiânia'],
  };

  const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  const aadharValidator = /^\d{12}$/;
  const panValidator = /^[A-Z0-9]{10}$/;
  const nameValidator =/^[A-Za-z]/
  const phonenoValidator = /^[0-9]{10}$/;


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'country') {
      setFormData({
        ...formData,
        country: value,
        city: '',
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
    } else if (!nameValidator.test(formData.firstName)) {
        newErrors.firstName = 'Invalid input';
    }
    
    if (!formData.lastName) {
        newErrors.lastName = 'First name is required';
    } else if (!nameValidator.test(formData.lastName)) {
        newErrors.lastName = 'Invalid input';
    }
    
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailValidator.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordValidator.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long, contain at least one number, one uppercase letter, and one lowercase letter';
    }
    

    if (!formData.phoneNo) {
        newErrors.phoneNo = 'Phone number is required';
      } else if (!phonenoValidator.test(formData.phoneNo)) {
        newErrors.phoneNo = 'Phone number must be a 10-digit number';
      }

    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.panNo) {
      newErrors.panNo = 'PAN number is required';
    } else if (!panValidator.test(formData.panNo)) {
      newErrors.panNo = 'PAN number must be 10 characters long and contain only uppercase alphanumeric characters';
    }
    if (!formData.aadharNo) {
      newErrors.aadharNo = 'Aadhar number is required';
    } else if (!aadharValidator.test(formData.aadharNo)) {
      newErrors.aadharNo = 'Aadhar number must be a 12-digit number';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      navigate('/success', { state: { ...formData } });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <span>{errors.firstName}</span>}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span>{errors.lastName}</span>}
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNo"
          value={formData.phoneNo}
          onChange={handleChange}
        />
        {errors.phoneNo && <span>{errors.phoneNo}</span>}
      </div>
      <div>
        <label>Country:</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          {Object.keys(countriesAndCities).map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        {errors.country && <span>{errors.country}</span>}
      </div>
      <div>
        <label>City:</label>
        <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.country}>
          <option value="">Select City</option>
          {formData.country && countriesAndCities[formData.country].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <span>{errors.city}</span>}
      </div>
      <div>
        <label>PAN Number:</label>
        <input
          type="text"
          name="panNo"
          value={formData.panNo}
          onChange={handleChange}
        />
        {errors.panNo && <span>{errors.panNo}</span>}
      </div>
      <div>
        <label>Aadhar Number:</label>
        <input
          type="text"
          name="aadharNo"
          value={formData.aadharNo}
          onChange={handleChange}
        />
        {errors.aadharNo && <span>{errors.aadharNo}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
