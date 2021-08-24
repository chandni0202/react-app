import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { compareObjects, ccompareObjectsReverse } from '../../../helper/helper';

const Dashboard = (props) => {
    const { data } = props;
    const [status, statusChange] = useState(true);
    const [dashboard, setDashboard] = useState(4);
    const [pageNumber, setPageNumber] = useState(1)

    const handlePrev = () => {
        if (pageNumber === 1) return
        setPageNumber((page) => page - 1);
    }
    const handleNext = () => {
        const dataLength = document.getElementsByClassName("detailsContainer") && 
        document.getElementsByClassName("detailsContainer").length;
        if (dataLength == 0) return
        setPageNumber((page) => page + 1);

    }
    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setPageNumber(pageNumber);
    }
    const getPaginatedData = () => {
        const startIndex = pageNumber * dashboard - dashboard;
        const endIndex = startIndex + dashboard;
        return data && data.data && data.data.slice(startIndex, endIndex);
    };
    const getPaginationGroup = () => {
        let start = Math.floor((pageNumber - 1) / 3) * 3;
        return new Array(3).fill().map((_, idx) => start + idx + 1);
    };
    const handleOnPageClick = () => {
        const e = document.getElementById("select-item");

        const optionvalue = e && e.value;
        setDashboard(optionvalue)

    }

    useEffect(() => {
    if(props.getUserData){props.getUserData()}
    }, []
    )

    function handleDelete(id) {
        const element = document.getElementById(`${id}`);
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }

    }

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
    const callapi = () => {
        props.getUniqueUserData(id);
    }
    return (
        <Fragment>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
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
                        const addressHTml = (<div>
                            {address && address.city}
                            {address && address.geo && address.geo.lat}
                            {address && address.geo && address.geo.lng}
                            {address && address.street}
                            {address && address.suite}
                            {address && address.zipcode}
                        </div>)
                        const companyHTml = (<div>
                            {company && company.name}
                            {company && company.catchPhrase}
                            {company && company.bs}
                        </div>)
                        return (
                            <tr className="detailsContainer" id={`${item.id}`} key={index}>
                                <td>{item.id}</td>
                                <td>{item.name || 'NA'}</td>
                                <td>{item.username || 'NA'}</td>
                                <td>{addressHTml || 'NA'}</td>
                                <td>{item.phone || 'NA'}</td>
                                <td>{item.email || 'NA'}</td>
                                <td>{item.website || 'NA'}</td>
                                <td>{companyHTml || 'NA'}</td>
                                <td> <Link to={`./details/${item.id}`}><button onClick={callapi} className="btn-open">Open</button></Link></td>
                                <td><button className="btn-del" onClick={handleDelete.bind(this, item.id)}>Delete</button></td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
            <div className="pagination_container">
                <select className="select-item" id="select-item" value={"4"} onChange={handleOnPageClick}>
                    <option value="2">2/Page</option>
                    <option value="4" >4/Page</option>
                    <option value="6">6/Page</option>
                    <option value="8">8/Page</option>
                    <option value="10">10/Page</option>
                    <option value="20">20/Page</option>
                    <option value="50">50/Page</option>
                </select>
                <div style={{ margin: "0", display: "flex" }}>

                    <div className="dataContainer">

                    </div>
                    <div className="pagination">
                        <button
                            onClick={handlePrev}
                        >
                            prev
                        </button>

                        {getPaginationGroup() && getPaginationGroup().map((item, index) => (
                            <button
                                key={index}
                                onClick={changePage}
                            >
                                <span>{item}</span>
                            </button>
                        ))}
                        <button
                            onClick={handleNext}
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