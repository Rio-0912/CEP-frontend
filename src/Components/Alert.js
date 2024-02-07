import React from 'react';


const Alert = (props) => {


    return (
        <div className='modal-dialog modal-dialog-scrollable'>
            <div style={{ height: '34px' }} >
                {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show `} role="alert">
                    <strong> </strong>{props.alert.msg}

                </div>}
            </div>
        </div>
    );
};

export default Alert;
