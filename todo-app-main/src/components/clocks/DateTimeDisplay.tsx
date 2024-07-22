import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';

const DateTimeDisplay: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(moment());
    const [isClient, setIsClient] = useState(false);

    const isNarrow = useMediaQuery({ query: '(max-width: 600px)' });

    useEffect(() => {
        setIsClient(true);
        const timer = setInterval(() => {
            setCurrentTime(moment());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!isClient) {
        return null;
    }

    const dateFormat = isNarrow ? 'MM/DD/YY' : 'MMMM Do YYYY';
    const timeFormat = isNarrow ? 'h:mm A' : 'h:mm:ss A';

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs="auto">
                    <h5 className='m-0'>{currentTime.format(dateFormat)}</h5>
                </Col>
                <Col xs="auto">
                    <h5 className='m-0'>{currentTime.format(timeFormat)}</h5>
                </Col>
            </Row>
        </Container>
    );
};

export default DateTimeDisplay;
