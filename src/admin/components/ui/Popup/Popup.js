import { Modal } from "reactstrap";
import makeID from "@/admin/utils/makeID";
import styles from "@/admin/components/ui/Popup/Popup.module.scss"
import { FaTimes } from "react-icons/fa";

export default function SgPopup(props) {
    const {className, modalClassName = '', children, header, description, id = makeID(7), setToggleModal, toggleModal = false, size} = props;

    function toggleModalFN() {
        setToggleModal(!toggleModal)
    }



    const getModalSize = () => {
        switch (size) {
            case 'xs':
                return 'sm'

            case 'sm':
                return 'sm'

            case 'md':
                return ''

            case 'lg':
                return 'lg'

            case 'xl':
                return 'xl'

            default:
                return ''
        }
    }

    return (
        <>
            <Modal isOpen={toggleModal}
                   size={getModalSize()}
                   toggle={toggleModalFN}
                   modalClassName={[modalClassName].join(' ').trim()}
                   centered={true}
                   className={className}
                   id={id}
            >
                <div className={styles['modal-header']}>
                    <h1 className={styles['modal-title']} id={[id, 'Label'].join('')}>{header}</h1>
                    {description && <p className={styles['modal-description']}>{description}</p>}
                    <button type="button"
                            className={styles['modal-close']}
                            onClick={() => toggleModalFN()}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                    >
                        <FaTimes />
                    </button>
                </div>
                <div className={styles['modal-body']}>
                    {children}
                </div>
            </Modal>
        </>
    )
}
