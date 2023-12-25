import React from "react";
import {Modal} from "react-bootstrap";


export function AddButton({}) {

    const [popupVisible, setPopupVisible] = React.useState(false)

    return (
        <div style={{
            position: "absolute",
            left: "50px",
            bottom: "0px"
        }}>
            <img
                style={{
                    width: "100px",
                    height: "100px",
                    cursor: "pointer"
                }}
                src={"/textures/add.png"}
                onClick={() => {
                    setPopupVisible(true)
                }}
            />
        </div>
    )
}

function _SelectionModal({}) {
    return (
        <Modal>
            <Modal.Header closeButton>

            </Modal.Header>

        </Modal>
    )
}

