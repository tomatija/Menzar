import { useState } from 'react';
import {Button, Card} from 'react-bootstrap';
import DinerInfo from './DinerData/DinerInfo';
import FavoriteButton from './Favorite';

const Diner = (props) => {
    const diner = props.diner;
    const dinerInfo = DinerInfo(diner.name);
    const dinerFavorite = diner.favorite === true;
    const [isFavorite, setIsFavorite] = useState(dinerFavorite);
    
    function handleClick() {
        //TODO: Add authentication
        const changeToFavorite = !isFavorite;
        const apiURL = "http://127.0.0.1:8000/api/v1/users/favorite/";
        const data = {
            diner: diner.name,
            favorite: changeToFavorite
        }
        const requestOptions = {
            method: changeToFavorite ? 'POST' : 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(apiURL, requestOptions).then((response) => { console.log(response) });        
        setIsFavorite(changeToFavorite);
    };

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
                    className="mb-2 col-10">
                    Obišči</Button>
                
                <FavoriteButton
                    favorite={isFavorite}
                    handleClick={handleClick}
                ></FavoriteButton>
            </Card.Body>
        </Card>
    );
}

export default Diner;