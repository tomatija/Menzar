/*
const Diner = (props) => {
    const diner = props.diner;
    const date = props.date;
    
    return (
        <Button
            href={"/diner/" + diner.name + "/"}
            size="lg"
            variant="dark"
            className="mb-2 col-12"
        >
        {diner.display_name}
        </Button>
    )
}
*/

import {Button, Card} from 'react-bootstrap';
import DinerInfo from './DinerData/DinerInfo';

const Diner = (props) => {
    const diner = props.diner;
    const dinerInfo = DinerInfo(diner.name);
    console.log(diner.name)
    console.log(dinerInfo)
    return (
        <Card
            className="col-5 mx-2 my-2"
            style={{ width: '18rem' }}>
            <Card.Img variant="top" src={dinerInfo.image} />
            <Card.Body>
            <Card.Title>{diner.display_name}</Card.Title>
            <Card.Text>
                {dinerInfo.description}
            </Card.Text>
                    <Button
                        href={"/diner/" + diner.name + "/"}
                        size="lg"
                        variant="dark"
                        className="mb-2 col-12">
                        Obišči</Button>
            </Card.Body>
        </Card>
    );
}

export default Diner;