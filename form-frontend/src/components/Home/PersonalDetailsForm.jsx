import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';

const INDIAN_PHONE_REGEX = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;

const schema = yup.object().shape({
  name: yup
    .string()
    .test('len', 'Must be less then 20 characters', (val) => val.length <= 20)
    .required('Name is required'),

  age: yup
    .string()
    .test('len', 'Must be less then 20 characters', (val) => val.length <= 20)
    .required(),
  sex: yup
    .string()
    .test('len', 'Must be less then 20 characters', (val) => val.length <= 20)
    .required(),
  mobile: yup.lazy((value) => {
    if (value && value.length > 0) {
      return yup
        .string()
        .required('Mobile number is required')
        .matches(INDIAN_PHONE_REGEX, 'Must be a valid indian phone number');
    } else {
      return yup.string().nullable().notRequired();
    }
  }),
  govtIdType: yup.string(),
  govtId: yup.string().when('govtIdType', (govtIdType, schema) => {
    if (!govtIdType[0]) return schema;
    if (govtIdType[0] === 'none') return schema.notRequired();
    if (govtIdType[0] === 'aadhar')
      return schema
        .matches(/^\d{12}$/, 'Aadhar number should be 12 digits')
        .required('Aadhar number is required');
    if (govtIdType[0] === 'pan')
      return schema
        .matches(
          /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
          'PAN length should be 10 digits'
        )
        .required('PAN number is required');
  }),

  guardianNameLabel: yup.string(),
  guardianName: yup.string(),
  guardianEmail: yup.string(),
  emergencyContactPhone: yup.lazy((value) => {
    if (value && value.length > 0) {
      return yup
        .string()
        .required('Mobile number is required')
        .matches(INDIAN_PHONE_REGEX, 'Must be a valid indian phone number');
    } else {
      return yup.string().nullable().notRequired();
    }
  }),
  address: yup.string(),
  state: yup.string(),
  city: yup.string(),
  country: yup.string(),
  pincode: yup.string(),

  occupation: yup.string(),
  region: yup.string(),
  maritalStatus: yup.string(),
  bloodGroup: yup.string(),
  nationality: yup.string('Indian'),
});

const PersonalDetailsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = (data) => {
    axios
      .post('http://localhost:3300/api/save', data)
      .then((response) => {
        console.log(response.data);
        reset();
      })
      .catch((error) => {
        console.error(error);
      });
    Swal.fire({
      icon: 'success',
      title: 'Saved!',
      text: 'You have successfully Save data.',
      html: 'Click <a href="/display"><b><u>here</u></b></a> to go to the data dashboard.',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked OK button
        Swal.fire('Changes are saved in Data', '', 'info');
      } else if (result.isDenied) {
        // User clicked Cancel button
        Swal.fire('Changes are saved in Data', '', 'info');
      }
    });
    reset();
  };
  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        );
        reset();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  };
  return (
    <>
      <div className="w-full max-w-full padding-top-10 px-10 text-xs text-left">
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="w-full max-w-full py-10"
        >
          <div>
            <h3 className="text-sm underline font-bold text-left mb-4">
              Personal Details
            </h3>
            <div className="flex flex-wrap -mx-3 mb-6 px-10">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <div className="mb-4 flex ">
                  <label
                    htmlFor="name"
                    className="block self-center font-medium mb-1 w-2/4"
                  >
                    Name<span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('name')}
                    placeholder="Enter Name"
                    type="text"
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                  />
                </div>

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/3 px-3">
                <div className="mb-4 flex">
                  <label
                    htmlFor="age"
                    className="block self-center font-medium mb-1 w-2/4"
                  >
                    Date of birth or Age<span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('age')}
                    placeholder="DD/MM/YYYY or Age in years"
                    type="text"
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500 ${
                      errors.age ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.age.message}
                  </p>
                )}
              </div>

              <div className="w-full md:w-1/3 px-3">
                <div className="mb-4 flex">
                  <label
                    htmlFor="sex"
                    className="block self-center font-medium mb-1 w-2/4"
                  >
                    Sex<span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register('sex')}
                    onChange={(e) => setValue('sex', e.target.value)}
                    className="block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value={''}>Enter Sex</option>
                    <option value={'male'}>Male</option>
                    <option value={'female'}>Female</option>
                    <option value={'other'}>Other</option>
                  </select>
                </div>

                {errors.sex && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.sex.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 px-10">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <div className="mb-4 flex">
                  <label
                    htmlFor="mobile"
                    className="block self-center font-medium mb-1 w-2/4"
                  >
                    Mobile Number
                  </label>
                  <input
                    {...register('mobile')}
                    onChange={(e) => setValue('mobile', e.target.value)}
                    placeholder="Mobile Number"
                    type="text"
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                  />
                </div>
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-2/3 px-3 mb-6 text-right">
                <div className="mb-4 flex">
                  <label
                    htmlFor="govtId"
                    className="block self-center font-medium mb-1 w-2/4"
                  >
                    Govt Issed ID
                  </label>
                  <div className="mb-4 flex">
                    <select
                      {...register('govtIdType', { defaultValue: 'null' })}
                      onChange={(e) => {
                        setValue('govtIdType', e.target.value);
                      }}
                      className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                    >
                      <option value="null">ID Type</option>
                      <option value="aadhar">Aadhar</option>
                      <option value="pan">PAN</option>
                    </select>
                    {errors.govtIdType && <p>{errors.govtIdType.message}</p>}

                    <input
                      {...register('govtId')}
                      placeholder="Government ID"
                      type="text"
                      className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                    />
                  </div>
                  {errors.govtId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.govtId.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm underline font-bold text-left mb-4">
              Contact Details
            </h3>
            <div className="flex flex-wrap -mx-3 mb-6 px-10">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <div className="mb-4 flex">
                  <label
                    htmlFor="guardianName"
                    className="block self-center font-medium mb-1 w-2/4"
                  >
                    Guardian Details
                  </label>
                  <select
                    {...register('guardianNameLabel')}
                    onChange={(e) =>
                      setValue('guardianNameLabel', e.target.value)
                    }
                    className="block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value={''}>Enter Label</option>
                    <option value={'father'}>Father</option>
                    <option value={'mother'}>Mother</option>
                    <option value={'other'}>Other</option>
                  </select>
                  <input
                    {...register('guardianName')}
                    placeholder="Guardian Name"
                    type="text"
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <div className="mb-4 flex">
                  <label
                    htmlFor="guardianEmail"
                    className="block self-center font-medium mb-1 w-2/4"
                  >
                    Email
                  </label>
                  <input
                    {...register('guardianEmail')}
                    placeholder="Enter Email"
                    type="text"
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <div className="mb-4 flex">
                  <label
                    htmlFor="emergencyContactPhone"
                    className="block self-center font-medium mb-1 w-2/4"
                  >
                    Emergency Contact Number
                  </label>
                  <input
                    {...register('emergencyContactPhone')}
                    onChange={(e) =>
                      setValue('emergencyContactPhone', e.target.value)
                    }
                    placeholder="Enter Emergency No"
                    type="text"
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                  />
                </div>

                {errors.emergencyContactPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emergencyContactPhone.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm underline font-bold text-left mb-4">
              Address Details
            </h3>
            <div className="flex flex-wrap -mx-3 mb-6 px-10">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <div className="mb-4 flex">
                  <label
                    htmlFor="address"
                    className="block self-center font-medium mb-1 w-2/4"
                  >
                    Address
                  </label>
                  <input
                    {...register('address')}
                    placeholder="Enter Address"
                    type="text"
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <div className="mb-4 flex">
                  <label
                    htmlFor="city"
                    className="block self-center font-medium mb-1 w-2/4"
                  >
                    City
                  </label>
                  <select
                    {...register('city')}
                    onChange={(e) => setValue('city', e.target.value)}
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                  >
                    <option value="">Select City</option>
                    <option value="lucknow">Lucknow</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="bangalore">Bangalore</option>
                  </select>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <div className="mb-4 flex">
                  <label
                    htmlFor="state"
                    className="block self-center font-medium mb-1 w-2/4"
                  >
                    State
                  </label>
                  <select
                    {...register('state')}
                    onChange={(e) => setValue('state', e.target.value)}
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                  >
                    <option value="">Select State</option>
                    <option value="delhi">Delhi</option>
                    <option value="uttarpradesh">Uttar Pradesh</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="karnataka">Karnataka</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 px-10">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <div className="mb-4 flex">
                  <label
                    htmlFor="country"
                    className="block self-center font-medium mb-1 w-2/4"
                  >
                    Country
                  </label>
                  <select
                    {...register('country')}
                    onChange={(e) => setValue('country', e.target.value)}
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                  >
                    <option value="">Select Country</option>
                    <option value="india">India</option>
                    <option value="usa">USA</option>
                    <option value="uk">UK</option>
                  </select>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <div className="mb-4 flex">
                  <label
                    htmlFor="pin"
                    className="block self-center font-medium mb-1 w-2/4"
                  >
                    Pin Code
                  </label>
                  <input
                    {...register('pin')}
                    placeholder="Enter Pin Code"
                    type="text"
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm underline font-bold text-left mb-4">
              Other Details
            </h3>
            <div className="flex flex-wrap -mx-3 mb-6 px-10">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <div className="mb-4 flex">
                  <label
                    htmlFor="occupation"
                    className="block self-center mb-1"
                  >
                    Occupation
                  </label>
                  <input
                    {...register('occupation')}
                    placeholder="Enter Occupation"
                    type="text"
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <div className="mb-4 flex">
                  <label htmlFor="religion" className="block self-center mb-1">
                    Religion
                  </label>
                  <select
                    {...register('religion')}
                    onChange={(e) => setValue('religion', e.target.value)}
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                  >
                    <option value="">Select Religion</option>
                    <option value="hindu">Hindu</option>
                    <option value="muslim">Muslim</option>
                    <option value="sikh">Sikh</option>
                    <option value="christian">Christian</option>
                  </select>
                </div>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <div className="mb-4 flex">
                  <label
                    htmlFor="maritalStatus"
                    className="block self-center mb-1"
                  >
                    Marital Status
                  </label>
                  <select
                    {...register('maritalStatus')}
                    onChange={(e) => setValue('maritalStatus', e.target.value)}
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                  >
                    <option value="">Select Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  </select>
                </div>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <div className="mb-4 flex">
                  <label
                    htmlFor="bloodGroup"
                    className="block self-center mb-1"
                  >
                    Blood Group
                  </label>
                  <select
                    {...register('bloodGroup')}
                    onChange={(e) => setValue('bloodGroup', e.target.value)}
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="a+">A+</option>
                    <option value="b+">B+</option>
                    <option value="o+">O+</option>
                    <option value="ab+">AB+</option>
                    <option value="a-">A-</option>
                    <option value="b-">B-</option>
                    <option value="o-">O-</option>
                    <option value="ab-">AB-</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 px-10">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <div className="mb-4 flex">
                  <label
                    htmlFor="nationality"
                    className="block self-center mb-1"
                  >
                    Nationality
                  </label>
                  <select
                    {...register('nationality')}
                    onChange={(e) => setValue('nationality', e.target.value)}
                    className={`block w-full px-4 py-2 rounded-md border-gray-400 shadow-md focus:border-indigo-500 focus:ring-indigo-500`}
                  >
                    <option value={'India'}>Indian</option>
                    <option value={'USA'}>USA</option>
                    <option value={'UK'}>UK</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end px-10">
            <button
              onClick={handleCancel}
              className="bg-red-300  hover:bg-red-700 text-white font-bold text-right py-2 px-4 rounded mr-2"
            >
              CANCEL
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-right py-2 px-4 rounded">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PersonalDetailsForm;
