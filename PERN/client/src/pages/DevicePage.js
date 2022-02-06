import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import bigStar from '../assets/star.jpg';
import { useParams } from "react-router-dom";
import { fetchOneDevices } from "../http/deviceApi";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()

    useEffect(() =>{
        fetchOneDevices(id).then(data => setDevice(data))
    }, [id])

    return (
        <Container className="mt-3">
          <Row>
            <Col md={4}>
                <Image style={{width: '100%', height: '100%'}} src={(device.img) ? ('http://localhost:5000/') + device.img : ''} />
            </Col>
            <Col md={4}>
                <Row className="d-flex align-items-center flex-column">
                    <h2>{device.name}</h2>
                    <div
                      style={{position: 'relative'}}
                      rating={device.rating}
                      className="d-flex justify-content-center align-items-center rating-star"
                    >
                        <Image src={bigStar} style={{width: '100%'}} />
                    </div>
                </Row>
            </Col>
            <Col md={4}>
                <Card
                style={{height: '100%'}}
                  className="d-flex flex-column align-items-center justify-content-around p-2"
                >
                    <h3>От: {device.price} грн.</h3>
                    <Button variant={"outline-dark"}>Добавить в корзину</Button>
                </Card>
            </Col>
          </Row>
          <Row className="d-flex flex-column mt-3" style={{marginLeft: '13px'}}>
              <h3>Характеристики:</h3>
              {device.info.map( (info, index) =>
                <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: '10px'}}>
                    {info.title}: {info.description}
                </Row>
              )}
          </Row>
        </Container>
    );
};

export default DevicePage;