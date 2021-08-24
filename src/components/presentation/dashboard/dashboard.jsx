import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { compareObjects, ccompareObjectsReverse } from '../../../helper/helper';

const Dashboard = (props) => {

    const { data } = props;
    const [status, statusChange] = useState(true);

    // Initial number of data per page display set to 4
    const [dashboard, setDashboard] = useState(4);

    // Initial page no set to 1
    const [pageNumber, setPageNumber] = useState(1);
    
    // get userdata from api
    useEffect(() => {
        props.getUserData && props.getUserData() 
    }, []
    )

    // handle previous button action
    const handlePrev = () => {
        if (pageNumber === 1) return
        setPageNumber((page) => page - 1);
    }
    
    // handle next button action
    const handleNext = () => {
        const getdata = getPaginatedData();
        if (getdata && getdata.length == 0) return
        setPageNumber((page) => page + 1);
    }

    // get data to be displayed
    const getPaginatedData = () => {
        // it will give startindex 
        const startIndex = pageNumber * dashboard - dashboard;
        // it will give the endindex
        const endIndex = startIndex + dashboard;
        //It will return a array from startindex to endindex excluding
        return data && data.data && data.data.slice(startIndex, endIndex);
    };
    
    // function to select no of items to display per page
    const handleOnPageClick = () => {
        const e = document.getElementById("select-item");
        const optionvalue = e && e.value;
        setDashboard(optionvalue);
    }

    // handle delete for rows
    const handleDelete = (id) => {
        const element = id ? document.getElementById(`${id}`) : "";
        const checkForChildNode = element && element.parentNode.hasChildNodes();
        if (checkForChildNode) {
            if (element && element.parentNode) {
                return element.parentNode.removeChild(element);
             }
        }
    }
    
    // sort the table by name
    const sortByName = () => {
        data && data.data && data.data.sort((book1, book2) => {
            if (status) {
                return compareObjects(book1, book2, 'name');
            }
            else {
                return ccompareObjectsReverse(book1, book2, 'name');
            }
        })
        statusChange(!status);
    };

     // sort the table by email
    const sortByEmail = () => {
        data && data.data && data.data.sort((book1, book2) => {
            if (status) {
                return compareObjects(book1, book2, 'email');
            }
            else {
                return ccompareObjectsReverse(book1, book2, 'email');
            }
        })
        statusChange(!status);
    };
    
    // returning html table
    return (
        <Fragment>
            <table>
                <tbody>
                    <tr>
                        <th>Name<span className="name" onClick={sortByName}></span></th>
                        <th>UserName</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Email<span className="email" onClick={sortByEmail}></span></th>
                        <th>Website</th>
                        <th>Company</th>
                        <th>Action</th>
                    </tr>
                    {getPaginatedData() && getPaginatedData().map((item, index) => {
                        const { address, company } = item;
                        const addressHTml = 
                        (address && <ul>
                            <li><span>City:</span>{address.city} </li>
                            <li> <span>Lat: </span>{address.geo && address.geo.lat}</li>
                            <li> <span>Lng: </span>{address.geo && address.geo.lng}</li>
                            <li> <span>Street:</span> {address.street}</li>
                            <li> <span>Suite: </span> {address.suite}</li>
                            <li> <span>Zipcode: </span>{address.zipcode}</li>
                        </ul>)
                        const companyHTml = 
                        (company && <ul>
                            <li><span>Name:</span> {company.name}</li>
                            <li><span>CatchPhrase: </span>{company.catchPhrase}</li>
                            <li><span>Bs:</span>{company.bs}</li>
                        </ul>)
                        return (
                            <tr className="detailsContainer" id={`${item.id}`} key={index}>
                                <td>{item.name || 'NA'}</td>
                                <td>{item.username || 'NA'}</td>
                                <td>{addressHTml || 'NA'}</td>
                                <td>{item.phone || 'NA'}</td>
                                <td>{item.email || 'NA'}</td>
                                <td>{item.website || 'NA'}</td>
                                <td>{companyHTml || 'NA'}</td>
                                <td> <Link to={`./details/${item.id}`}><button className="btn-open">Open</button></Link></td>
                                <td><button className="btn-del" onClick={handleDelete.bind(this,item.id)}>Delete</button></td>
                            </tr>
                      )
                    })}
                </tbody>
            </table>
            <div className="pagination_container">
                <select className="select-item" id="select-item" defaultValue={"4"} onChange={handleOnPageClick}>
                    <option value="2">2 Per Page</option>
                    <option value="4">4 Per Page</option>
                    <option value="6">6 Per Page</option>
                    <option value="8">8 Per Page</option>
                    <option value="10">10 Per Page</option>
                    <option value="20">20 Per Page</option>
                    <option value="50">50 Per Page</option>
                </select>
                <div style={{ margin: "-2em", display: "flex" }}>
                    <div className="pagination">
                        <button
                            onClick={handlePrev}
                            disabled={pageNumber === 1 ? true : false}
                        >
                        previous
                        </button>
                        <button
                            onClick={handleNext}
                            id="next"
                        >
                        next
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Dashboard;