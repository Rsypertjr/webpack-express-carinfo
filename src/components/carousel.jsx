import Carousel from "react-bootstrap/Carousel";
import React from 'react';
import DoCard from "./card.js";
import { useState, useEffect } from 'react';

function Image({ src, alt }){

    return (
        <>
            <img src={src} alt={alt} style={{ zIndex:"1"}} className="rounded-5 img-fluid" />     
        </>
        
    );
}
export default function DoCarousel({id=null, images=null, carditems=null }){
    const [ carouselItems, setCarouselItems ] = useState([]);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        console.log(selectedIndex);
        setIndex(selectedIndex);       
        
    };

    useEffect(() => {

        function setUpCarousel(images,carditems) {
            console.log("Inside Carousel Component");
            console.log("Props Car Images:", images);
            console.log("Props Card Items:", carditems);
            let carousel_items;
            if(images != null  && typeof images !== 'undefined')
            {
                if(images.length > 0) {
                    console.log("Building Image carousel");
                    carousel_items = images.map(function(itemimage,indx){
                        
                            return  <Carousel.Item key={indx.toString()} > 
                                        <Image className="w-80 m-1"
                                                
                                                
                                                src={itemimage.link}
                                                alt={itemimage.title}
                                        /> 
                                        <Carousel.Caption></Carousel.Caption>                                          
                                    </Carousel.Item>;
                        });
                }
                
            }
        
        
            
            if(carditems != null  && typeof carditems !== 'undefined')
            {
                if(carditems.length > 0) {
                    carousel_items = carditems.map(function(carditem,indx){
                    
                        return  <Carousel.Item> 
                                        <DoCard item={carditem} />
                                        <Carousel.Caption></Carousel.Caption>                                          
                                </Carousel.Item>;
            }       );
                }
               
            }
            console.log("Carousel Items:",carousel_items);
            setCarouselItems(carousel_items);
        }

      
        
        setUpCarousel(images, carditems);
    },[]);
    
    return (

            <>
                   
                <Carousel activeIndex={index} onSelect={handleSelect} className="d-flex align-items-center justify-content-center">
                    { carouselItems }
                </Carousel>

            </>
    );
}