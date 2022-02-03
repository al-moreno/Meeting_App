import React from 'react';

const IncomingUpdateItem = props => {
    return (

        <div class="card my-1">
            <div class="card-header">
            <h5 class="card-title">Created by: XYZ          On:          Updated On:</h5>
            </div>
            <div class="card-body">
               
                <p class="card-text">
                    {props.incomingupdate.name}
                </p>
            </div>
        </div>
    )
};

export default IncomingUpdateItem;