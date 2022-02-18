import React from 'react';
import MeetingItemService from '../../Services/MeetingItem';

const MeetingItem = props => {
    
    return (

        <div className="card my-1">
            <div className="card-header position-relative ">
                <h6 class="card-title p-1  ">
                    <span className="position-absolute top-50 start-0 translate-middle-y p-3">Created By:      </span>
                    <span className="position-absolute top-50 start-50 translate-middle"> Updated On: </span>
                    <span className="position-absolute top-50 end-0 translate-middle-y p-3"> Created On: Yesturday <i onClick={props.delete} class="fa fa-trash"></i></span>
                </h6>
            </div>
            <div className="card-body">

                <p className="card-text">
                    {props.meetingitem.item}
                </p>

            </div>
        </div>
    )
};

export default MeetingItem;