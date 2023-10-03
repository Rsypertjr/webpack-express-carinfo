//import { React, useEffect, useState } from 'react';
import React from 'react';
import { useEffect, useState } from 'react';
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import Spinner from 'react-bootstrap/Spinner';
import Col from "react-bootstrap/Col";
import $ from "jquery";
import carsjson from '../assets/data/cars.json';
import car_search_items from '../assets/data/carsearchitems.json';
import DoAccordian from './accordian.js';
import DoCarousel from './carousel.jsx';
import DoCard from './card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import cargurus from '../assets/images/cargurus.png';
import autotrader from '../assets/images/autotrader.png';
import carmax from '../assets/images/carmax.png';
import carvana from '../assets/images/carvana.png';
import truecar from '../assets/images/truecar.png';
import usnews from '../assets/images/us_news_&_world_reports.png';
import DoDropdown from './dropdown';

const car_site_display_items = [ 
    {"image": cargurus,"link": "https://www.cargurus.com", "alt": "Car Gurus", "cardTitle": "CarGurus ?", "cardText":`CarGurus Inc (CarGurus) is a marketplace to buy and sell cars. The company offers new cars and used and certified 
    pre‑owned cars and also helps owners merchandise their vehicles through sell my car. It offers sports utility vehicles, new and used 
    passenger cars, vans, hatchbacks, convertibles, and pickup trucks.` },
    {"image": carmax,"link": "https://www.carmax.com", "alt":"Car Max", "cardTitle": "CarMax ?", "cardText": `CarMax, Inc. is a holding company, which engages in the retail of used vehicles and wholesale vehicle 
    auction operator. It operates through the CarMax Sales Operations and CarMax Auto Finance (CAF) segments. 
    The CarMax Sales Operations segment consists of all aspects of its auto merchandising and service operations.`},
    {"image": usnews,"link": "https://cars.usnews.com", "alt": "US News & World Reports", "cardTitle": "US News & World Reports ?", "cardText": `U.S. News & World Report (USNWR) is an American media company that publishes news, consumer advice, rankings, and analysis.
    It was launched in 1948 as the merger of domestic-focused weekly newspaper U.S. News and international-focused weekly magazine World Report.`},
    {"image":carvana,"link": "https://carvana.com", "alt": "Carvana", "cardTitle": "CARVANA ?","cardText":`What is TrueCar? TrueCar is an information and technology platform that enables its users to communicate with TrueCar 
    Certified Dealers for a great car buying experience. Our mission is simple: make the car buying process simple, fair and fun.` },
    {"image":autotrader,"link": "https://autotrader.com", "alt": "Autotrader", "cardTitle": "Autotrader ?", "cardText": `Autotrader.com, Inc. is an online marketplace for car buyers and sellers, founded in 1997. It aggregates new, used, 
    and certified second-hand cars from dealers and private sellers. The site also provides users with automotive reviews, shopping advice, 
    and comparison tools for car financing and insurance information.` },
    {"image":truecar,"link": "https://truecar.com", "alt":"TrueCar", "cardTitle":"TrueCar, Inc. ?", "cardText":`What is TrueCar? TrueCar is an information and technology platform that enables its users to communicate with TrueCar 
    Certified Dealers for a great car buying experience. Our mission is simple: make the car buying process simple, fair and fun.`}
];


const site_instructions = [
    {"image": "","link": "", "alt": "", "cardTitle": "What Can You Do?", "cardText":'Get Car Info from Different Sites!',"headerBgColor":"lightBlue","bodyBgColor":"beige" },
    {"image": "","link": "", "alt": "", "cardTitle": "From Where?", "cardText":'Sites like: CarMax, Cargurus, US News and Reports, and others',"headerBgColor":"lightBlue","bodyBgColor":"beige"},
    {"image": "","link": "", "alt": "", "cardTitle": "How?", "cardText":'Use Dropdowns to Sites like: CarMax, Cargurus, US News and Reports, and othersSelect Car Site, Car Make, Car Model, Year of Model, and Location.  The Dropdowns will appear once you begin.',"headerBgColor":"lightBlue","bodyBgColor":"beige"},
    {"image": "","link": "", "alt": "", "cardTitle": "How Again?", "cardText":'Panel Above gives Status Info.  When done making Selection, Just Click (Search) button to See Results.',"headerBgColor":"lightBlue","bodyBgColor":"beige"},
    {"image": "","link": "", "alt": "", "cardTitle": "Say Results?", "cardText":`Accordian Display should have appeared (and tried to get your attention).  Each Panel is a different search
     result.  Just click Arrow on Panel to open it.`,"headerBgColor":"lightBlue","bodyBgColor":"white"},
    {"image": "","link": "", "alt": "", "cardTitle": "What Else?", "cardText":`You can also Take a (Look a Previous Searches)`,"headerBgColor":"lightBlue","bodyBgColor":"beige"}, 
];

const car_site_links = [
    {"link": cargurus,"title": "CarGurus"},
    {"link": autotrader,"title":"Auto Trader"},  
    {"link": carmax,"title":"CarMax" },
    {"link": carvana,"title": "Carvana" },
    {"link": truecar, "title": "True Car" },
    {"link": usnews, "title": "US News & World Reports" }
];



const carDropdownItems = [
    {"link": "https://www.cargurus.com", "title": "Car Gurus"},
    {"link": "https://www.carmax.com", "title": "Car Max"},
    {"link": "https://cars.usnews.com", "title": "US News and Reports"},
    {"link": "https://carvana.com", "title": "CARVANA"},
    {"link": "https://truecar.com", "title": "TrueCar, Inc"},
    {"link": "https://autotrader.com", "title": "Autotrader"}
];



export default function Display() {
       
    const [imgArr, setImgArr] = useState([]);
    const [carouselItems, setCarouselItems ] = useState([]);
    const [siteUrl, setSiteUrl] = useState('');
    const [ carSiteLabel, SetCarSiteLabel] = useState("Choose a Site");
    const [ showCarSiteInfo, setShowCarSiteInfo ] = useState(false);
    const [ showCarImages, setShowCarImages ] = useState(false);
    const [ showCarSiteIcons, setShowCarSiteIcons] = useState(false);
    const [ carSiteMatch, setCarSiteMatch] = useState({});
    const [ carMakeLabel, setCarMakeLabel] = useState("Car Makes");
    const [ carModelLabel, setCarModelLabel] = useState("Car Models"); 
    const [ carInfoSelection, SetCarInfoSelection ] = useState([]);
    const [ carSearchItems, setCarSearchItems] = useState([]);
    const [ previousSearchItems, setPreviousSearchItems ] = useState([]);
    const [ previousSearchCardItems, setPreviousSearchCardItems ] = useState([]);
    const [ showPreviousSearches, setShowPreviousSearches] = useState(false);
    const [ carMakes, setCarMakes ] = useState([]);
    const [ carModels, setCarModels ] = useState([]);
    const [ infoDisplay, setInfoDisplay ] = useState("Please Select a Car Site!");
    const [ searchString, setSearchString ] = useState("");
    const [ years, setYears] = useState([]);
    const [ yearLabel, setYearLabel] = useState("Model Year");
    const [ location, setLocation ] = useState("Input Location of Zip Code or Address");
    const [ yearSelected, setYearSelected ] = useState(false);
    const [ locationSubmitted, setLocationSubmitted] = useState(false);
    const [ performSearch, setPerformSearch ] = useState(false);
    const [ showSearchButton, setShowSearchButton ] = useState(false);
    const [ carsiteUrl, setCarsiteUrl ] = useState("");


   //let searchString = '';           
   let count = 0;
   let prior3 = "";
   let cargurus_url =  "https://www.cargurus.com";
   let carmax_url = "https://www.carmax.com";
   let us_news_world_report_url = "https://cars.usnews.com";
   let carvana_url = "https://carvana.com";


    useEffect(() => {
       
     function initialize(){
       // SetCarSiteLabel('Choose a Site');
       setShowCarImages(false);
       setShowCarSiteIcons(false);
       setShowCarSiteInfo(false);
     }
     initialize();
     setInfoDisplay("Please Choose a Site! or do 'Previous Searches'");

        
    },[]);

    useEffect(() => {
        function setUpCarModels(carsjson){
            let car = carsjson.filter((car) => {  return car.make.name === carMakeLabel; } );
           
            if(car.length > 0 ){
               console.log("Selected Car: ", car[0].make.models);
               setCarModels(car[0].make.models);
               console.log("Car Models: ", carModels);
            }            
           }

        setUpCarModels(carsjson);     
       
       
        return () => {          
            setCarModels([]);
            setCarModelLabel('Car Models');
       }   

    },[carMakeLabel]);



    const getResultsImages = (results) => {
        console.log("Results", results)
        let imgs = [];
        setImgArr([]);
        results.length > 0 && results.map((result) => {
            if( typeof(result.pagemap) !== 'undefined' && typeof(result.pagemap.cse_image) !== 'undefined' && result.pagemap.cse_image.length > 0){
                if( typeof(result['formattedUrl']) !== 'undefined' && 
                    // Try to filter out pre-existing thumbnails from Global imgArr object
                    !imgs.find((carimage) => {
                        return carimage.link === result['formattedUrl']
                        }))
                    {
                    console.log("gets here");
                    let carimage =  {"link":result.pagemap.cse_image[0].src,"search":searchString,"carsite":carsiteUrl,"title":result['title']};   
                    imgs.push(carimage);
                }  
            }       
        });
     
        return imgs;            
    };   

    
    function setUpYears(){
        let yrs = [];
        let count = 0;
        for(let i = 1950;i <= new Date().getFullYear();i++){
            yrs[count] = i;
            count++;
        }
        setYears(yrs.reverse());
    }



  const onCarSiteSelection = (selection) => {
    console.log("Car Info Selection: ",selection.title);
    SetCarInfoSelection(selection.title)
    SetCarSiteLabel(selection.title);
    setSearchString(selection.title);
    setInfoDisplay("(Select a Car Maker) for searching (" + selection.title + ")");

    let droptext = selection.title;
    setCarsiteUrl(selection.link);
    console.log("Carsite Url: ", selection.link);
    let match = car_site_display_items.find((link) => link.link === selection.link);
    console.log("Match: ", match);
    if(match)
        setCarSiteMatch(match);

    setShowCarSiteInfo(true);
    setLocationSubmitted(false);
    setYearSelected(false);
    setPerformSearch(false);
    setShowSearchButton(false);    
    setShowPreviousSearches(false);
    setShowCarImages(false); 
    //setCarSearchItems([]);
    //setYears([]);
    setCarMakeLabel("Select a Car Maker");
    setCarMakes(carsjson);
  
   
   
};

const onCarMakeSelection = ( selection ) => {
     
    console.log("Car Make Selection: ", selection.title);
    setCarMakeLabel(selection.title);
    setLocationSubmitted(false); 
    setCarSearchItems([]);
    setPerformSearch(false);
    setShowSearchButton(false);
    setShowCarImages(false); 
    setSearchString(searchString + " " + selection.title); 
    setInfoDisplay("Select (Car Model) to search (" + searchString + ") for (" + selection.title + ")");
    setYears([]);   
    let car = carsjson.filter((car) => {  return car.make.name === carMakeLabel; } );
    if(car.length > 0 ){
        console.log("Selected Car: ", car[0].make.models);
        setCarModels(car[0].make.models);
        //console.log("Car Models: ", carModels);
     }             
   
   
    
   
};

const onCarModelSelection = ( selection ) => {
    console.log("Car Model Selection: ", selection.title);
    setCarModelLabel(selection.title);   
    setUpYears();
    setYearLabel("Select Model Year");
    setLocationSubmitted(false); 
    setPerformSearch(false);
    setShowSearchButton(false);
    setShowCarImages(false); 
    setSearchString(searchString + " " + selection.title);
    setInfoDisplay("(Select Model Year) to search (" + carSiteLabel + ") for (" + carMakeLabel + " " + selection.title + ")");
   
};


const onYearSelection = (selection ) => {
    console.log("Year Selection", selection.title);
    setYearLabel(selection.title);
    setSearchString(selection.title + " " + searchString);
    setInfoDisplay("Input (Zip Code) to search (" + carSiteLabel + ") for (" + selection.title + " "  + carMakeLabel + " " + carModelLabel +")" );
   
  
    // replace previous two lines
    // w/ doProgrammableGoogleSearch()

    setShowCarSiteInfo(false);
    setLocationSubmitted(false);
    setYearSelected(true);
    setPerformSearch(false);
    setShowSearchButton(true);
    setShowCarImages(false); 
   
    
};

const onLocationSubmit = () => {
    setSearchString(yearLabel + " " + carMakeLabel + " " + carModelLabel + " " + location);
    setInfoDisplay("Use (Search) button to get Results from (" + carSiteLabel + ") for (" + yearLabel + " " + carMakeLabel + " " + carModelLabel + " @ " + location + ")");
    setShowSearchButton(true);
    setShowCarImages(false); 
    setLocationSubmitted(true);
    $("#locationInput").css("opacity","0.3").on("click",function(){$(this).css("opacity","1.0")});

};


function doProgrammableGoogleSearch(){
    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyAXk-p9BChtYA5YH9WIhkt1V7lGMa6HfGE&cx=b630a27665b454523&siteSearch=${carsiteUrl}&q=${searchString}`)
    .then(response => response.json())
    .then(response => {
        console.log(response);

        setCarSearchItems(response.items);
    });
}
 
const doSearch = () => {
    setPerformSearch(true); 
    setYearSelected(false);
    setCarSearchItems([]);    
    setShowCarImages(true);
    setShowSearchButton(false);
    setYears([]);  
    setShowSearchButton(false);
    console.log("Final Search String: ",searchString);


    fetch(`https://www.googleapis.com/customsearch/v1?cx=b630a27665b454523&key=AIzaSyAW63X0dJajeiFazMTwo6Tih3MXkClSgnM&siteSearch=${carsiteUrl}&q=${searchString}}`)
    .then(response => response.json())
    .then(response => {
        console.log("Response from Server: ",response);
            if(typeof(response.items) !== 'undefined' && response.items.length > 0){
                setCarSearchItems(response.items);
                
                let images = getResultsImages(response.items);
                console.log("Images in Search:", images);
                setImgArr(images);                 
                setShowCarImages(true);
                setShowCarSiteInfo(false);
                postCarSearch(carsiteUrl,searchString, response.items, carSiteLabel, carMakeLabel, carModelLabel, yearLabel, location);  
                setInfoDisplay(`See Results in Accordian Display below:\nfor: ${yearLabel} ${carMakeLabel} ${carModelLabel} ${location} on ${carSiteLabel}`);
            } else 
                alert("No Results returned for this search.")
     
    });
};

const doPreviousSearch = (results) => {

    console.log("Previous Search Results: ", results);
    setCarSearchItems(results);
    
    // Set up Car Images Carousel
    let images = getResultsImages(results);
    console.log("Previous Car Images: ", images);
    setImgArr(images);
    setPerformSearch(true);
    setShowCarSiteIcons(false);
    setShowCarImages(true);
};

const setUpPreviousSearches = () => {
      
    setCarMakes([]);
    setCarModels([]);
    setYears([]);
    fetch('http://159.65.100.7:3000/api/carsearch')
    .then(response => response.json())
    .then(response => {
        console.log("Response from Server for Get: ",response);
        let cards = [];
       
        typeof response !== 'undefined' && response != null && response.length > 0 && response.map((carRecord) => {
            if( typeof(carRecord.results) !== 'undefined' && typeof(carRecord.results[0].pagemap) !== 'undefined' && 
                typeof(carRecord.results[0].pagemap.cse_image) !== 'undefined' && carRecord.results[0].pagemap.cse_image.length > 0){
                
                if( typeof(carRecord.results[0]['formattedUrl']) !== 'undefined' && 
                    // Try to filter out pre-existing thumbnails from Global imgArr object
                    !cards.find((carimage) => {
                        return carimage.link === carRecord.results[0]['formattedUrl']
                        }))
                    {
                     
                    let carditem =  {"image":carRecord.results[0].pagemap.cse_image[0].src, "link":carRecord.link, "searchString":carRecord.searchString, 
                    "carSiteLabel": carRecord.carSiteLabel, "carMakeLabel": carRecord.carMakeLabel, "yearLabel": carRecord.carMakeLabel, "results": carRecord.results,
                    "carModelLabel":carRecord.carModelLabel,"location":carRecord.location, "carsite":carRecord.results[0].displayLink,"cardTitle":carRecord.results[0].title,"cardText":carRecord.results[0].snippet};   
                    cards.push(carditem);
                }  
            }    
            console.log("Card Items: ",cards);   
        });
        setShowPreviousSearches(true);
        SetCarSiteLabel("Choose a Site");
       
        setLocationSubmitted(false);
        setShowSearchButton(false);
        setPerformSearch(false);
        setShowCarSiteInfo(false);
        setShowCarSiteIcons(true);
        setShowCarImages(false);

        setPreviousSearchCardItems(cards);


        setPreviousSearchItems(response);
        setInfoDisplay("Use (Perform Search) Button on a displayed item to repeat a (Previously-Stored-Search)");
       
    });
};

const performPreviousSearch = (e) => {    
     
    console.log("Previous Search Item to be Reloaded: ",JSON.parse(e.target.value));
    let item = JSON.parse(e.target.value);
    setCarsiteUrl("https://" + item.carsite);
    SetCarSiteLabel(item.carSiteLabel);
    setCarMakeLabel(item.carMakeLabel);
    setCarModelLabel(item.carModelLabel);
    setYearLabel(item.yearLabel);
    setLocation(item.location);
    let search_string = item.carSiteLabel + " for: " + item.yearLabel + " " + item.carMakeLabel + " " + item.carModelLabel + " " + item.location;
    setSearchString(search_string);   
    setInfoDisplay(`See Results in Accordian Display below:\nfor: ${item.yearLabel} ${item.carMakeLabel} ${item.carModelLabel} ${item.location} on ${item.carSiteLabel}`);
    doPreviousSearch(item.results);
    setPreviousSearchCardItems([]);
    
   
      

};

const doNewSearch = () => {
    setCarMakes([]);
    setCarModels([]);
    setYears([]);
    setLocationSubmitted(false);
    setYearSelected(false);
    setLocation(false);
    setShowCarSiteInfo(false);
    setPerformSearch(false);
    setShowSearchButton(false);    
    setShowPreviousSearches(false);
    setShowCarImages(false); 
    SetCarSiteLabel("Choose a Site");
    

};


const exitPreviousSearch = () => {
    setShowPreviousSearches(false);
    setShowCarImages(false);
    setShowCarSiteIcons(false);
    setPerformSearch(false);
    setCarModels([]);
    SetCarSiteLabel('Choose a Site');
    setInfoDisplay("Please Choose a Site! or do 'Previous Searches'");
};


const postCarSearch = ( url, searchString, searchItems, carSiteLabel, carMakeLabel, carModelLabel, yearLabel, location) => {
    fetch('http://159.65.100.7/api/carsearch', {
        method: 'POST',
        body: JSON.stringify({
            carsite_url: url,
            searchString: searchString,
            searchItems: searchItems,
            carSiteLabel: carSiteLabel,
            carMakeLabel: carMakeLabel,
            carModelLabel: carModelLabel,
            yearLabel: yearLabel,
            location: location

        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
        }).then(function(response){ 
            return response.json()
        }).then(function(data){
            console.log(data);
            if(data.message && data.message.includes('Exists'))  {

               // setCarSearchItems(data.record[0]);
              //  setPerformSearch(true);
            }    
        }).catch(error => console.error('Error:', error));  
};




     
    return (   
        <div>
         <Container className="w-100 mt-5 mb-5" fluid>
            <div id="jumbo" className="p-2 text-white rounded container" style={{backgroundColor:"#6699CC"}}>
                <div id="carinfo_header" className="row">
                    <div id="get_car_info" className="row text-center justify-content-center w-100 m-1">
                        <h1>Get Car Info</h1>
                    </div>
                   
                </div>

               
                <div className="row text-center justify-content-center p-3 rounded-3 m-2" style={{backgroundColor:"#E5E4E2", color:"black"}}>   
                    <h2 id="site_selected" style={{whiteSpace: "pre-wrap" }}>{ infoDisplay }</h2>
                </div>  
            </div>
               
         </Container>
        
        <Container  className="p-2" style={{ zIndex:"-1",backgroundColor:"#3366CC" }}>
            <Row>
            {!showPreviousSearches && 
            <Col className="w-60 rounded-3 d-flex justify-content-center" style={{backgroundColor:"lightBlue",margin:"5%"}} >
                    <ButtonGroup className="btn-group-vertical p-2 pt-4" aria-label="Basic example" >
                        <DoDropdown items={carDropdownItems} label={carSiteLabel} id="carinfo_dropdown" onSelection={onCarSiteSelection}/> 
                      
                   
                        {
                            carMakes.length > 0  && !showPreviousSearches &&
                        
                            <DoDropdown className="mt-3" items={ carMakes.map((make) => { return {"link":"","title":make.make.name} }) } label={carMakeLabel} id="make_dropdown" onSelection={onCarMakeSelection}/>
                        
                        }
                  
                        {
                            carModels.length > 0 && !showPreviousSearches &&
                        
                            <DoDropdown className="mt-3" items={ carModels.map((model) => { return { "link":"", "title":model} }) } label={carModelLabel} id="model_dropdown" onSelection={onCarModelSelection}/>
                        
                        }
                
                        {
                            years.length > 0 &&
                            <DoDropdown items={  years.map((year) => { return { "link":"", "title":year} }) } label={yearLabel} id="year_dropdown" onSelection={onYearSelection}/>
                        }
                    

                
                    
                       
                        <Container className="p-1 rounded-3 mb-1" >
                            {  yearSelected &&
                            <div id="locationInput">
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>@</InputGroup.Text>
                                        <Form.Control 
                                            onChange={(e) => setLocation(e.target.value)}
                                            id="input_location" 
                                            placeholder="Input Zip Code" 
                                            aria-label="Input Location" 
                                            aria-describedby="input_location"
                                        />
                                    </InputGroup>
                                </Row>
                        
                                <Row className="w-80">
                                    <ButtonGroup aria-label="Submit Location">
                                        <Button onClick={onLocationSubmit} variant="primary" className="w-80">Submit Location</Button>
                                    </ButtonGroup>
                                </Row>
                            </div>
                                
                            }

                            <Row className="w-90 p-1 d-flex justify-content-center"> 
                                <ButtonGroup className="p-1">
                                    { locationSubmitted && showSearchButton &&  
                                        <Button id="dosearch" onClick={doSearch} variant="primary">Search</Button> 
                                    }
                                    { locationSubmitted && !showSearchButton && 
                                        <Button id="newsearch" onClick={doNewSearch} variant="primary">New Search</Button>
                                    }
                                    <Button id="reset" onClick={() => window.location.reload()} variant="secondary">Reset</Button>
                               
                                </ButtonGroup>                               
                            </Row>
                           
                        </Container>                       
             
                    </ButtonGroup>                 
                </Col> }
                <Col className="w-40 rounded-3 d-flex align-items-center justify-content-center" style={{backgroundColor:"lightBlue",margin:"5%"}} >
                    <ButtonGroup className="btn-group-horizontal p-3" aria-label="Previous Searches" >
                        <Button onClick={setUpPreviousSearches} variant="success" className="rounded-3">Previous Searches</Button>
                        {showPreviousSearches && <Button onClick={ exitPreviousSearch } variant="danger" className="rounded-3"> End Previous Searches</Button> }
                    </ButtonGroup>   
                </Col>
              
            </Row>          
                
        </Container>
        <Container id="carousel_display" className="p-1 d-flex align-items-center justify-content-center">
            { showCarImages && (
                <Row id="carimage_carousel" style={{height:"50%"}} className="d-flex align-items-center justify-content-center">
                    <DoCarousel id="showCar" images={imgArr} carditems=""/> 
                </Row>
                )  
            }
            { showCarSiteIcons && !showPreviousSearches && (
                <Row id="top_icon_display_carousel"> 
                    <DoCarousel images={car_site_links} carditems="" id="topIconDisplay"/>
                </Row>
                )
            }
            { showCarSiteInfo && (
                <Row id="topCarsiteDisplay">
                    <DoCard item={carSiteMatch} /> 
                </Row>
                )
            }
            
            { !showCarImages && !showCarSiteIcons && !showCarSiteInfo && (
                <Row id="site_instruction_carousel" style={{height:"50%"}} >
                    <DoCarousel images="" className="rounded-2" carditems={site_instructions} id="carouselSiteInstructions"/>               
                </Row>
                )
            }
        </Container>
                   
              
      
        <Container id="accordianContainer" className="mt-4 smooth-scroll p-5 d-flex justify-content-center" style={{backgroundColor:"lightBlue"}}>
            {  
                performSearch && carSearchItems.length > 0 && <DoAccordian results={carSearchItems}/> 
            }
            { 
                !performSearch &&  <DoCarousel images={car_site_links} id="bottomIconDisplay"/>
            }
        </Container> 


        <Container id="previous_searches" className="w-100 d-flex align-content-center flex-wrap">
            {
                showPreviousSearches && previousSearchCardItems.length > 0 && previousSearchCardItems.map((item,index) => {
                    { 
                        return <>                        
                            <div className="fadeIn moveUp w-50 h-50 d-flex" >
                                <DoCard key={index.toString()} item={ item } className="w-90" performPreviousSearch={ performPreviousSearch }/> 
                            </div>
                        </>
                            
                    }
                })
            }   
        </Container> 
           
        </div>
        
    );

}
