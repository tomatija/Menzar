import axios from 'axios';
import { useState } from 'react';
import {Button, Card} from 'react-bootstrap';
import DinerInfo from './DinerData/DinerInfo';
import FavoriteButton from './Favorite';

const Diner = (props) => {
    const diner = props.diner;
    const dinerInfo = DinerInfo(diner.name);
    const dinerFavorite = diner.favorite === true;
    const displayFavorite = props.displayFavorite;
    const [isFavorite, setIsFavorite] = useState(dinerFavorite);
    
    function handleClick() {
        //TODO: Add authentication
        const changeToFavorite = !isFavorite;
        const apiURL = "http://127.0.0.1:8000/api/v1/favorite/diner";
        const data = {
            diner: diner.name,
            favorite: changeToFavorite
        }
        if(changeToFavorite)
        {
            axios.post(apiURL, data).then((response) => {setIsFavorite(changeToFavorite)});
        }
        else
        {
            axios.delete(apiURL, { data: data }).then((response) => { setIsFavorite(changeToFavorite)});
        }
    };
    
    const favoriteButton = displayFavorite ? (
        <FavoriteButton
            favorite={isFavorite}
            handleClick={handleClick}
        ></FavoriteButton>
    ) : null;
    
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
                    className={displayFavorite ? "mb-2 col-10" : "mb-2 col-12"}>
                    Obišči</Button>
                
                {favoriteButton}
            </Card.Body>
        </Card>
    );
}

export default Diner;