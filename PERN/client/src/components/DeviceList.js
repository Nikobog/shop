import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "..";
import DeviceItem from "./DeviceItem";

const DeviceList = observer( () => {
    const {device} = useContext(Context)
    let typesName = []
    let brandsName = []
    device.types.map(b => typesName.push( {id: b.id, name: b.name} ))
    device.brands.map(b => brandsName.push( {id: b.id, name: b.name} ))

    return (
        <Row className="d-flex">
            {device.devices.map(device =>
                <DeviceItem key={device.id} device={device} brands={brandsName} types={typesName} />
            )}
        </Row>
    )
});

export default DeviceList;