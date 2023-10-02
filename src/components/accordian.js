import Accordion from 'react-bootstrap/Accordion';
import { useState, useEffect } from 'react';
import React from 'react';
import $ from 'jquery';


function DoAccordian({ results }) {

    console.log("Results Prop in Accordian", results);
    const [resultsSet, setResultsSet] =  useState([]);

    const makeResultsSet = (() => {
        let Arr = [];
        for (let result of results) {
            
            let [anchor, content, title] = makeResultsParts(result);
            Arr.push( {"anchor": anchor, "content": content, "title": title} );           
        }
         
        setResultsSet(Arr);
    });

    const makeResultsParts = (result) => {
            
        let anchor = $('<a></a>');
        anchor.attr('href', result['formattedUrl']);
        anchor.attr('target','_blank');
        anchor.addClass('title');
        anchor.text(result['formattedUrl']);

        const span = document.createElement('span');    
        span.innerHTML = ' ' + result['htmlTitle'];                   
                  
        const content = result['snippet'];
        const title = result['title'];           

        // Return UI elements
        return [$(anchor).html(), content, title];                 
    };
    


    useEffect(() => {
        makeResultsSet();
    },[]);


  return (
    <Accordion defaultActiveKey="0" className="fadeIn moveUp w-80 h-80" >
    
      {
        resultsSet.length > 0 && resultsSet.map(( resultItem, index ) => 
        {
            {                     
                return  <Accordion.Item  key={index.toString()}  eventKey={index}>
                            <Accordion.Header>{resultItem.title}</Accordion.Header>
                            <Accordion.Body>                                
                                <p>{resultItem.content}</p>
                                <a className="gotosite" href={ resultItem.anchor } target="_blank">Go To Site</a>
                            </Accordion.Body>
                        </Accordion.Item> 
            }})
      }      

    </Accordion>
  );
}

export default DoAccordian;