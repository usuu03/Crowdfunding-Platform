# Code Documentation Guidelines


## 1. Header  Comments for Files:

Each file should start with a block explaining the following:
- Purpose of the File
- Who authored it 
- Any relevant information
- Date of Creation
- Last Modification

``` 
/*
* Filename: Login.jsx
* Author: Usu Edeaghe
* Date: November 18, 2023
* Description: This file contains the UI implementation of the Login Component
*
*/
```

## 2. Function/Component Comments:

Above each function or component, there should be comments describing its purpose and usage. 
Mention its parameters, what it does and what it returns. 
Also include if it modifies a state

```
/**
* Opens the popup modal.
*/
const openPopup = () =? setShowModal(true);

/**
* Fetches campaign data from the server and sets it in the state.
*/
useEffect(() => {
    //...
}, []);
```

## 3.Inline Comments:

Use inline comments sparingly and only when necessary to explain complex logic or functionality that is not obvious.
Make the code self-explanatory.

```
//Check if the user has selected a category for filtering campaigns.
if(selectedCategory){
    //Filter campaign based on the selected category
    filteredCampaign = filteredCamapaigns.filter(
        (campaign) => campaign.category === selectedCategory
    );
}
```

## 4. Variable Naming:
Choose meaningful and descriptive names for your variables and functions.

```
const filteredCampaigns = campaigns.filter(...);
const selectedCategory = dropdownValue;
```

## 5. Error Handling:

Document how errors are handled.
Also explain how they could be resolved

```
//Handle errors in the Campaign data fetching.
.catch((error) => console.error("Error fetching campaign data:", error));
```

## 5. API Endpoints
Document purpose of API purpose, the expected request and the response formats, and any required parameters.

### Get All Campaign Categories

- Endpoint: `/api/campaigns/categories`
- Method: `GET`
- Purpose: Retrieve all campaign categories

Request 
No request parameters are required.

Response
- Status Code:200 OK
- Format:
    ```["Health", "Education and Learning", "Environment", ....]```