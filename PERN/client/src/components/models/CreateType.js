import React, { useState } from "react";
import { Button, Form, Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { createType } from "../../http/deviceApi";

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addType = () => {
        createType({name: value}).then( data => {
            setValue('')
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <ModalHeader>
                <ModalTitle id="contained-modal-title-vcenter">Добавить тип</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название типа"}
                    />
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"}  onClick={addType}>Добавить</Button>
            </ModalFooter>
        </Modal>
    )
}

export default CreateType;