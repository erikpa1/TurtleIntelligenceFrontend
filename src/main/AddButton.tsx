import React from "react";
import {Col, Modal, Row} from "react-bootstrap";
import {ImageTileButton} from "../ui/ImageTileButton";


export function AddButton({}) {

    const [popupVisible, setPopupVisible] = React.useState(false)

    return (
        <div style={{
            position: "absolute",
            left: "50px",
            bottom: "25px"
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
            {
                popupVisible && <_SelectionModal
                    onHide={() => setPopupVisible(false)}
                    selected={() => {
                        console.log("Building started")
                        setPopupVisible(false)
                    }}
                />
            }
        </div>
    )
}

function _SelectionModal({onHide, selected}) {
    return (
        <Modal
            show={true}
            onHide={onHide}
        >
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <ImageTileButton
                            icon={"/textures/wheat-field.png"}
                            text={"Wheat field"}
                            onClick={selected}
                        />
                    </Col>
                    <Col>
                        <ImageTileButton
                            icon={"/textures/wheat-field.png"}
                            text={"Wheat field"}
                            onClick={selected}
                        />
                    </Col>
                    <Col>
                        <ImageTileButton
                            icon={"/textures/wheat-field.png"}
                            text={"Wheat field"}
                            onClick={selected}
                        />
                    </Col>
                </Row>

            </Modal.Body>
        </Modal>
    )
}


