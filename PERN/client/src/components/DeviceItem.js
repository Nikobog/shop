import React from "react";
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png';
import {useNavigate} from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({device, brands, types}) => {
    const navigate = useNavigate()
    /* let typeName = '';
    types.find(type => (type.id === device.typeId) ? typeName = type.name : typeName = '') */
    let brandName = '';
    brands.find(brand => (brand.id === device.brandId) ? brandName = brand.name : brandName = '')

    return(
        <Col md={4} className="mb-3" onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card
              style={{width: '100%', height: '100%', cursor: 'pointer'}}
              border={"blue"}
              className="p-2 justify-content-end"
            >
                <Image 
                  style={{width: '90%', margin: '10px 5% 0'}}
                  src={'http://localhost:5000/' + device.img}
                />
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center" style={{padding: '5%'}}>
                    <div>{brandName}</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image width={16} height={16} src={star} style={{background: '#fff'}}/>
                    </div>
                </div>
                <div style={{padding: '0 5%', marginBottom: '20px'}}>{device.name}</div>
                <div style={{padding: '0 5%', marginBottom: '20px', textAlign: 'right'}}>{device.price} грн.</div>
                {/*<div style={{padding: '0 5%', marginBottom: '20px'}}>{typeName}</div> */}
            </Card>
        </Col>
    )
}

export default DeviceItem;