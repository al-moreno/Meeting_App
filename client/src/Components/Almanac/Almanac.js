// child component to app.js where the props are coming from
// single card component
import React from 'react';

const Almanac = (props) => {

    return (
        <div className="card m-4">
            <div className="card-header position-relative ">
                <h6 class="card-title p-1  ">
                    <span className="position-absolute top-50 start-0 translate-middle-y p-3">Almanac</span>
                   
                </h6>
            </div>
            <div className="card-body">
            <span className="position-absolute top-75 start-0 translate-middle-y p-3">Created By: {props.name}</span>
                    <span className="position-absolute top-75 start-50 translate-middle"> Updated On: {props.updatedOn}</span>
                    <span className="position-absolute top-75 end-0 translate-middle-y p-3"> Created On: {props.createdOn}
                        <i class="fa fa-trash"></i>
                    </span>
                <p className="card-text py-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque auctor, urna at mattis aliquam, justo mauris mollis orci,
                 ut egestas justo ipsum ut nisl. Nulla euismod ut arcu eget dignissim. Proin bibendum eros dui, eu porttitor libero dapibus vel. Nulla a erat ipsum.
                  Cras sed ex id libero gravida hendrerit et a nisl. 
                Sed commodo sagittis justo et dictum. Nunc dictum id velit vel scelerisque. Duis felis arcu, faucibus sed iaculis ut, dignissim eget quam.
                    {props.text}
                </p>
            </div>
        </div>
    )

};

export default Almanac;