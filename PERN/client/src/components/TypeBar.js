import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Context } from "../index";

const TypeBar = observer(() => {
    const {device} = useContext(Context)

    let keyVse = 0
    device.types.map((t, i) => keyVse = i + 1)

    return (
        <ListGroup>
            {device.types.map(type => 
                <ListGroupItem
                  style={{cursor: 'pointer'}}
                  active={type.id === device.selectedType.id}
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                    {type.name}
                </ListGroupItem>
            )}
            <ListGroupItem
                style={{cursor: 'pointer'}}
                active={device.selectedType === ''}
                onClick={() => device.setSelectedType('')}
                key={keyVse}
            >
                Все типы
            </ListGroupItem>
        </ListGroup>
    );
});

export default TypeBar;