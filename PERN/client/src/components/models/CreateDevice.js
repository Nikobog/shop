import React, { useContext, useState, useEffect } from "react";
import { Button, Col, Dropdown, Form, FormControl, Modal, ModalBody, ModalFooter, ModalTitle, Row } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Context } from "../../index";
import { fetchTypes, fetchBrands } from "../../http/deviceApi";
import { observer } from "mobx-react-lite";
import { createDevice } from "../../http/deviceApi";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data.brands))
    }, [device])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('brand', device.selectedBrand.id)
        formData.append('type', device.selectedType.id)
        formData.append('img', file)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
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
                    <Dropdown className="mt-2 mb-2 full-dropdown">
                        <DropdownToggle>{device.selectedType.name || "Выберите тип"}</DropdownToggle>
                        <DropdownMenu style={{width: '100%'}}>
                            {device.types.map(type =>
                                <DropdownItem onClick={() => device.setSelectedType(type) } key={type.id}>{type.name}</DropdownItem>    
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    
                    <Dropdown className="mt-2 mb-2 full-dropdown">
                        <DropdownToggle>{device.selectedBrand.name || "Выберите брэнд"}</DropdownToggle>
                        <DropdownMenu>
                            {device.brands.map(brand =>
                                <DropdownItem onClick={() => device.setSelectedBrand(brand) } key={brand.id}>{brand.name}</DropdownItem>    
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder={"Введите название устройства"}
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder={"Введите стоимость устройства"}
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        onClick={addInfo}
                        variant={"outline-dark"}
                    >Добавить новое свойство</Button>
                    {info.map(i =>
                        <Row className="mt-3" key={i.number}>
                            <Col md={4}>
                                <FormControl
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <FormControl
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button onClick={() => removeInfo(i.number)} variant={"outline-danger"}>Удалить</Button>
                            </Col>
                        </Row>    
                    )}
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"}  onClick={addDevice}>Добавить</Button>
            </ModalFooter>
        </Modal>
    );
});

export default CreateDevice;