import React, {useEffect, useState} from 'react';
import { Container, Button, Table }  from 'react-bootstrap';
import { useAuthContext } from "@asgardeo/auth-react";
import { getCatalogs, updateCatalog, deleteCatalog } from '../../api';

export default function Admin() {
    const { state, getAccessToken, httpRequest } = useAuthContext();

    const payload = { query: `query MyQuery { catalogs { itemImage itemName itemDesc itemID price stockDetails { color includes intendedFor material } } }`, operationName: "MyQuery" };

    const [catalogs, setCatalogs] = useState([]);
    const [editing, setEditing] = useState({});
    const [deleting, setDeleting] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const [isRowEditable, setIsRowEditable] = useState(false);

    useEffect(() => {
        document.title = 'Admin | PetStore';
        getAccessToken()
          .then((accessToken) => {
            console.log('access token -----------', accessToken);
            getCatalogs(accessToken)
              .then((resp) => {
                setCatalogs(resp.data?.data?.catalogs);
                console.log('###use effect variable########', resp.data?.data?.catalogs);
              })
              .catch((err) => console.log(err));
          })
          .catch((error) => {
            //console.log(error);
          });
      }, []);

      const handleEditClick = (itemID) => {
        setIsRowEditable(true);
        setEditing((prev) => ({ ...prev, [itemID]: true }));
      };
    
    //   const handleSaveClick = async () => {
    //     try {
    //       const accessToken = await getAccessToken();
    //       await updateCatalog(accessToken, itemID, updatedCatalog);
    //       setCatalogs((prev) => prev.map((catalog) => (catalog.itemID === itemID ? { ...catalog, ...updatedCatalog } : catalog)));
    //       setEditing((prev) => ({ ...prev, [itemID]: false }));
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     setIsRowEditable(false);
    //   };
    
      const handleEdit = (itemID) => {
        //setEditing((prev) => ({ ...prev, [itemID]: true }));
        setIsRowEditable(true);
      };

      const handleSave = async (itemId, catalog) => {
        const updatedCatalog = {
            ...catalog,
            itemName: document.getElementById(`itemName_${itemId}`).textContent,
            itemDesc: document.getElementById(`itemDesc_${itemId}`).textContent,
            stockDetails: {
              includes: document.getElementById(`stockIncludes_${itemId}`).textContent,
              intendedFor: document.getElementById(`stockIntendedFor_${itemId}`).textContent,
              color: document.getElementById(`stockColor_${itemId}`).textContent,
              material: document.getElementById(`stockMaterial_${itemId}`).textContent,
              quantity: parseInt(document.getElementById(`stockQuantity_${itemId}`).textContent)
            },
            price: parseFloat(document.getElementById(`price_${itemId}`).textContent)
        };
        try {
          console.log("Updated Catalog: " + JSON.stringify(updatedCatalog));
          const accessToken = await getAccessToken();
          await updateCatalog(accessToken, updatedCatalog);
      
          const updatedCatalogs = catalogs.map((catalog) => {
            if (catalog.itemID === itemId) {
              return updatedCatalog;
            } else {
              return catalog;
            }
          });
          setCatalogs(updatedCatalogs);
          setIsRowEditable(false);
          setEditing((prev) => ({ ...prev, [itemId]: false }));
        } catch (error) {
          console.log(error);
        }
      };
    
    //   const handleCancel = (itemID) => {
    //     setEditing((prev) => ({ ...prev, [itemID]: false }));
    //     setIsEditable(false);
    //   };
    
      const handleDelete = async (itemID) => {
        setDeleting((prev) => ({ ...prev, [itemID]: true }));
        try {
          const accessToken = await getAccessToken();
          await deleteCatalog(accessToken, itemID);
          setCatalogs((prev) => prev.filter((catalog) => catalog.itemID !== itemID));
        } catch (error) {
          console.log(error);
        }
        setDeleting((prev) => ({ ...prev, [itemID]: false }));
      };

      return (
        <>
        <Container className="mt-5">
            <Table bordered hover>
                <thead>
                    <tr>
                        <th scope="col" width="150px">Title</th>
                        <th scope="col" width="400px">Description</th>
                        <th scope="col">Includes</th>
                        <th scope="col">Intended For</th>
                        <th scope="col" width="50px">Color</th>
                        <th scope="col">Material</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">&nbsp;</th>
                    </tr>
                    {catalogs.map((catalog) => (
                        <tr className="align-middle" key={catalog.itemID}>
                            <td contentEditable={isRowEditable} id={`itemName_${catalog.itemID}`}>{catalog.itemName}</td>
                            <td contentEditable={isRowEditable} id={`itemDesc_${catalog.itemID}`}>{catalog.itemDesc}</td>
                            <td contentEditable={isRowEditable} id={`stockIncludes_${catalog.itemID}`}>{catalog.stockDetails.includes}</td>
                            <td contentEditable={isRowEditable} id={`stockIntendedFor_${catalog.itemID}`}>{catalog.stockDetails.intendedFor}</td>
                            <td contentEditable={isRowEditable} id={`stockColor_${catalog.itemID}`}>{catalog.stockDetails.color}</td>
                            <td contentEditable={isRowEditable} id={`stockMaterial_${catalog.itemID}`}>{catalog.stockDetails.material}</td>
                            <td contentEditable={isRowEditable} id={`price_${catalog.itemID}`}>{catalog.price}</td>
                            <td contentEditable={isRowEditable} id={`stockQuantity_${catalog.itemID}`}>{catalog.stockDetails.quantity}</td>
                            {isRowEditable ? (
                            <td>
                                <Button variant="primary" size="sm" onClick={() => handleSave(catalog.itemID, catalog)}>Save</Button>
                            </td>
                            ) : (
                            <td>
                                <Button variant="primary" size="sm" onClick={() => handleEditClick(catalog.itemID)}>Edit</Button>
                            </td>
                            )}
                        </tr>
                    ))}
                    <tr className="text-end">
                        <td colSpan="8"><Button variant="primary" className="float-right">Add New Product</Button></td>
                    </tr>
                </thead>
            </Table>
        </Container>
        </>
    );
}