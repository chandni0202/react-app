import React, { useEffect } from 'react';
import { useParams } from 'react-router';

const UserDetails = (props) => {
    
    const { id } = useParams();

    useEffect(() => {
        if(props.getUniqueUserData && id){props.getUniqueUserData(id)}

    }, [id]
    )

    const { uniqueData } = props;
    const data = uniqueData && uniqueData.uniqueData;
    const addressHTml = (data && data.address && <div>
        {data.address.city}
        {data.address.geo && data.address.geo.lat}
        {data.address.geo && data.address.geo.lng}
        {data.address.street}
        {data.address.suite}
        {data.address.zipcode}
    </div>)
    const companyHTml = (data && data.company && <div>
        {data.company.name}
        {data.company.catchPhrase}
        {data.company.bs}
    </div>)
    return (
        <>
            {data &&
                <div className="userDetails">
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