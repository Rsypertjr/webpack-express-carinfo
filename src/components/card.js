import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function DoCard( { item, performPreviousSearch=null } ) {
   //console.log("Item inside Card component: ", item);
   //console.log("Image inside of Card: ", item.image);     

    return (
        <Card style={{ backgroundColor:"lightGrey" }} className="m-2">
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
                <Card.Title style={item.headerBgColor ? { backgroundColor: item.headerBgColor} : {}} className="p-1 rounded-1 text-center">{item.cardTitle}</Card.Title>
                <Card.Text style={item.bodyBgColor ? { backgroundColor: item.bodyBgColor} : {}}  className="p-2 rounded-1 text-center">
                    {item.cardText}
                </Card.Text>
                { performPreviousSearch != null && <Button variant="primary" value={JSON.stringify(item)} onClick={ (e) => performPreviousSearch(e) }>Perform Search</Button>}
            </Card.Body>
        </Card>
    );
}