import { useEffect, useRef } from 'react'; import ReactDOM from 'react-dom';
import { useGlobalCtx } from '../../../features/context/providers/Global/GlobalProvider';

/**
 * This component injects the modal in the target element with createPortal function.
 * @param {String} modalKey The key of the modal jsx which is stored in modals state.
 * @returns createPortal returns a React node that can be included into JSX or returned
 * from a React component. If React encounters it in the render output, it will place
 * the provided children inside the provided domNode.
 */
export default function ModalShell({ modalKey, i }) {
    const { modals, closeModal } = useGlobalCtx();
    const modalRef = useRef();

    useEffect(() => {
        const modalHandler = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closeModal(modalKey);
            }
        };
        const actualHandler = (Object.keys(modals).length - 1 === i) ? modalHandler : () => { };
        document.addEventListener('mousedown', actualHandler);
        return () => document.removeEventListener('mousedown', actualHandler);
    }, [modalKey, modals]);

    return (
        ReactDOM.createPortal(
            <div className='h-screen w-screen bg-black/70 fixed top-0 left-0 z-[5000]'>
                <div className='w-max absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' ref={modalRef}>{modals[modalKey]}</div>
            </div>,
            document.getElementById('modal'),
        )
    );
}