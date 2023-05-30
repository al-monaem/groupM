import Modal from "react-modal"
import "./common.css"

const MobileModal = ({ mobileModalOpen, confirmAction }) => {

    Modal.setAppElement("#root")

    return (
        <Modal
            closeTimeoutMS={500}
            isOpen={mobileModalOpen}
            preventScroll={true}
            className={`border border-[#7169e8] bg-white rounded-lg p-10 text-sm w-[70%]}`}
        >
            <div
                className="relative p-4 w-full rounded bg-white">
                <div>
                    Are you sure to delete?
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        id="no"
                        onClick={(e) => confirmAction(e)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:font-semibold transition hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        id="yes"
                        onClick={(e) => confirmAction(e)}
                        className="ml-2 px-4 py-2 bg-[#7169e8] text-white rounded hover:font-semibold transition hover:bg-[#9c95ef]"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default MobileModal