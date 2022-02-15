// usercard
import React from 'react';


const AlmanacCard = (props) => {
    console.log(props.children)

    return (

        <div className="card m-4">
            <div className="card-header position-relative ">
                <h6 class="card-title p-1  ">
                    <span className="position-absolute top-50 start-0 translate-middle-y p-3">Created By: Sam Moreno </span>
                    <span className="position-absolute top-50 start-50 translate-middle"> Updated On: June 3</span>
                    <span className="position-absolute top-50 end-0 translate-middle-y p-3"> Created On: April 27
                        <i class="fa fa-trash p-1"></i>
                        <i class="fa fa-plus p-1"></i>
                    </span>
                </h6>
            </div>
            <div className="card-body">
                <p className="card-text">
                    {props.children}

                </p>
            </div>
        </div>
    )

};

export default AlmanacCard;