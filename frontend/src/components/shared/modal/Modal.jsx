
import { useGlobalCtx } from '../../../features/context/providers/Global/GlobalProvider';
import ModalShell from './ModalShell';
/**
 * This component loop over the modals state to render specific modal.
 * @returns It returns the modals found in the modals state.
 */
export default function Modal() {
    const { modals } = useGlobalCtx();
    return (
        <>
            {Object.keys(modals).map((k, i) => <ModalShell key={k} i={i} modalKey={k} />)}
            <div id="modal" />
        </>
    );
}