import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Row } from "react-bootstrap";
import { Context } from "..";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    let keyVse = 0
    device.types.map((t, i) => keyVse = i + 1)

    return (
        <Row className="d-flex m-0 justify-content-start align-items-center">
            {device.brands.map(brand =>
                <Card
                    key={brand.id}
                    style={{cursor: 'pointer', width: 'auto', display: 'inline-block', margin: '0 1rem 1rem 0'}}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'black'}
                    onClick={() => device.setSelectedBrand(brand)}
                    className="p-2"
                >
                    {brand.name}
                </Card>
            )}
            <Card
                style={{cursor: 'pointer', width: 'auto', display: 'inline-block', margin: '0 1rem 1rem 0'}}
                border={device.selectedBrand === '' ? 'danger' : 'black'}
                onClick={() => device.setSelectedBrand('')}
                key={keyVse}
                className="p-2"
            >
                Все брэнды
            </Card>
        </Row>
    );
});

export default BrandBar;