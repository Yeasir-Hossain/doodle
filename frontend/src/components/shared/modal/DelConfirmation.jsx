import React from 'react';
import { useGlobalCtx } from '../../../features/context/providers/Global/GlobalProvider';

const DelConfirmation = ({ name = '', handleDelete = () => { } }) => {
    const { closeModal } = useGlobalCtx();
    return (
        <div className='shadow-lg border border-gray-800 w-[350px] max-h-max bg-white rounded'>
            <h5 className="font-bold text-center uppercase py-2">Delete</h5>
            <div className='p-2'>
                <p>This action cannot be undone. Do you wish to proceed?</p>
                <div className='pt-3 flex justify-end gap-4'>
                    <button onClick={() => closeModal(name)} className='text-sm font-bold px-3 py-1 bg-blue-600 rounded text-white'>Cancel</button>
                    <button onClick={handleDelete} className='text-sm font-bold px-3 py-1 bg-red-600 rounded cursor-pointer text-white' >Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DelConfirmation;