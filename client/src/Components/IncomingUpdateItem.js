import React from 'react';

const IncomingUpdateItem = props => {
    return (
        <span className="pb-2" >
            <li className="list-group-item  ">

                <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />

                {props.incomingupdate.name}

            </li>
        </span>
    )
};

export default IncomingUpdateItem;