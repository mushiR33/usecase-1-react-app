import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Button }  from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as regThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as solidThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { sendPostRequest, getCatalogs } from '../../api';
import { useAuthContext } from "@asgardeo/auth-react";
// import PetStoreNav from '../../App.js';


// Component to render the item list
const PetItemList = () => {
    const { state, getAccessToken, getBasicUserInfo, getIDToken, getDecodedIDToken } = useAuthContext();
    const payload = { query: `query MyQuery { catalogs { itemImage itemName itemDesc itemID price stockDetails { color includes } } }`, operationName: "MyQuery" };

    const [catalogs, setCatalogs] = useState([]);

    useEffect(() => {

      getAccessToken().then((accessToken) => {
        console.log("access token -----------",accessToken);
        getCatalogs(accessToken).then(resp => {
          setCatalogs(resp.data?.data?.catalogs);
          console.log("###use effect variable########", resp.data?.data?.catalogs);
        }).catch(err => console.log(err));
      }).catch((error) => {
        //console.log(error);
      });
  
    }, []);

    console.log("###assigned variable 55555555########",catalogs);
    
    const itemPrice = {
      fontSize: '20px',
      fontWeight: 'bold',
      marginRight: '50px'
    };
    return (
      <>
      <Container>
        <Row>
  
  {/* 
  
  Item list that's displayed on the page follow the following format:
  
          <Col>
            <img src={require('./item-1.png')} width="300" alt="dog"/><br />
            <h4>Title....</h4>
            <p>Description</p>
            <p>
              <b>Includes: </b> 1 Sweater<br />
              <b>Intended For:</b> Dogs<br />
              <b>Color:</b> Red, White, Black<br />
              <b>Material: </b> 100% Acrylic<br />
            </p>
            <br />
            <span style={itemPrice}>$ 14.99</span> <Button variant="danger">Add to cart</Button>
            <br /><br />
            Follow updates &nbsp;&nbsp;<FontAwesomeIcon icon={regThumbsUp} /> 
          </Col>
  
  You can use this as a template to create the other items from data you get from the API.
  
  Displaying a list programmatically in React
  -------------------------------------------
  
  Let's assume the data you get from the API is in the following format:
      [
        {
          itemID: 1,
          itemName: "Top Paw® Valentine's Day Single Dog Sweater",
          itemDesc: "Dress your pup up appropriately ....",
          itemImage: "http://some/path/to/item-1.png",
          stockDetails: {
            includes: "1 Sweater",
            intendedFor: "Dogs",
            color: "Red, White, Black",
            material: "100% Acrylic"
          }
        },
        ...
      ]
  
  In react assign this to variable. You would have to replace the assignment with the API call.
  
  const items = [
    {itemId: 1, itemName: ..., itemDesc: ..., itemImage: ..., ...}
    {itemId: 2, itemName: ..., itemDesc: ..., itemImage: ..., ...}
  ];
  
  Now you can use the items variable to display the list of items.
  
  const listItems = items.map((item) =>
    <Col>
      <img src={item.itemImage} width="300" alt="dog"/><br />
      <h4>{item.itemName}</h4>
      <p>{item.itemDesc}</p>
      <p>
        <b>Includes: </b> {item.stockDetails.includes}<br />
        <b>Intended For:</b> {item.stockDetails.intendedFor}<br />
        ....
    </Col>
  );
  
  return (
    <Row>{listItems}</Row>
  );
  
    */}
         {catalogs.map((item) => (  
          <Col key={item.itemId}> 
            <img src={item.itemImage} width="300" alt="dog"/><br />
            <h4>{item.itemName}</h4>  
            <p>{item.itemDesc}</p>
            <p>
              <b>Includes: </b> {item.stockDetails.includes}<br />
              <b>Intended For:</b> {item.stockDetails.intendedFor}<br />
              <b>Color:</b> {item.stockDetails.color}<br />
              <b>Material: </b> {item.stockDetails.material}<br />
            </p>  
            <br />
            <span style={itemPrice}>$ {item.price}</span> <Button variant="danger">Add to cart</Button>
            <br /><br />
            Follow updates &nbsp;&nbsp;<FontAwesomeIcon icon={regThumbsUp} />
          </Col>
        ))}
        </Row>
      </Container>
    </>
    );
  
  };

  export default function Catalog() {


    useEffect(() => {
        document.title = 'PetStore Catalog';
      }, []);
    return (
      <>
        <PetItemList />
      </>
    );
}