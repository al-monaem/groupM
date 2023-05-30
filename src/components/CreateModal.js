import Modal from "react-modal"
import { useSelector } from "react-redux"

const CreateModal = ({ props }) => {

    Modal.setAppElement("#root")

    const { saveChanges, submitTicket, modalOpen, setType, setDescription, setModalOpen, type, description, isEdit } = props
    const mobile = useSelector(state => state.settingsReducer.mobile)

    return (
        <Modal
            closeTimeoutMS={500}
            isOpen={modalOpen}
            preventScroll={true}
            className={`border border-[#7169e8] bg-white rounded-lg p-10 ${mobile ? "text-sm w-[70%]" : "w-[50%] "}`}
        >
            <form
                onSubmit={isEdit ? e => saveChanges(e) : e => submitTicket(e)}
                className="flex flex-col">
                <div className="text-[#7169e8] mb-5 font-semibold text-lg">
                    Add Ticket Type
                </div>
                <div className="flex flex-col mb-5">
                    <div className="p-1">
                        <span className="text-red-500">*</span>
                        <span className="text-[#73707c] font-semibold">Ticket Type:</span>
                    </div>
                    <input
                        onChange={e => setType(e.target.value)}
                        className="text-sm flex-grow border rounded-lg px-3 py-2 focus:outline-[#7169e8]"
                        placeholder="Enter a ticket type"
                        required
                        value={type}
                    />
                </div>
                <div className="flex flex-col">
                    <div className="p-1 text-[#73707c] font-semibold">
                        Description:
                    </div>
                    <textarea
                        onChange={e => setDescription(e.target.value)}
                        className="text-sm flex-grow border rounded-lg px-3 py-1 focus:outline-[#7169e8]"
                        placeholder="Enter description"
                        value={description}
                    />
                </div>
                <div className="flex ml-auto space-x-2 mt-5">
                    <button
                        type="button"
                        onClick={e => setModalOpen(false)}
                        className="px-3 py-1 transition rounded-md border bg-red-500 font-semibold text-white hover:bg-red-400">Cancel</button>
                    <button className="px-3 py-1 transition rounded-md border bg-[#7169e8] font-semibold text-white hover:bg-[#9c95ef]">{isEdit ? "Save Changes" : "Add Ticket Type"}</button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateModal