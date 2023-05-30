import { motion } from "framer-motion"

const ConfirmModal = ({ buttonRef, confirmAction }) => {

    const buttonRect = buttonRef.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const divStyle = {
        left: buttonCenterX,
        transform: `translateX(-50%)`,
        marginTop: "-150px"
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={divStyle}
            className="absolute border border-[#7169e8] bg-white rounded shadow-md text-gray-800"
        >
            <div
                className="relative p-4 w-full rounded bg-white">
                <div>
                    Are you sure?
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
            <div className="border border-[#7169e8] absolute -z-50 w-10 h-10 bottom-0 bg-white transform rotate-45 left-1/2 -translate-x-1/2"></div>
        </motion.div>
    )
}

export default ConfirmModal