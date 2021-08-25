import React, { useEffect, useState } from 'react';
import './uniqueUser.scss';
import { useParams } from 'react-router';

const UserDetails = (props) => {
    const { id } = useParams();

    // calling api to get unique user details
    useEffect(() => {
     props.getUniqueUserData(id)
    }, [id]
    )
    const { uniqueData } = props;
    const data = uniqueData && uniqueData.uniqueData;
    const addressHTml = (data && data.address && <ul>
        <li><span>City:</span>{data.address.city} </li>
        <li> <span>Lat: </span>{data.address.geo && data.address.geo.lat}</li>
        <li> <span>Lng: </span>{data.address.geo && data.address.geo.lng}</li>
        <li> <span>Street:</span> {data.address.street}</li>
        <li> <span>Suite: </span> {data.address.suite}</li>
        <li> <span>Zipcode: </span>{data.address.zipcode}</li>
      </ul>)
    const companyHTml = (data && data.company && <ul>
        <li><span>Name:</span> {data.company.name}</li>
        <li><span>CatchPhrase: </span>{data.company.catchPhrase}</li>
        <li><span>Bs:</span>{data.company.bs}</li>
    </ul>)
    // returning unique user details
    return (
        <>
        {data &&
            <div className="userDetails">
                    <div className="header">User Details</div>
                    <div>Name : {data.name || 'NA'}</div>
                    <div>Username : {data.username || 'NA'}</div>
                    <div>Address : {addressHTml || 'NA'}</div>
                    <div>Phone :{data.phone || 'NA'}</div>
                    <div>Email : {data.email || 'NA'}</div>
                    <div>Website: {data.website || 'NA'}</div>
                    <div> Company: {companyHTml || 'NA'}</div>
                </div>
            }
        </>
    )
}

export default UserDetails;