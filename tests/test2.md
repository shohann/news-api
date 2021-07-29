
# Adding a news (publiher + admin only):

POST request link :  http://localhost:3001/news/admin/add

POST request linkj:  http://localhost:3001/news/publisher/add

Authorizartion Bearer TOKEN

Response:

{
    "status": false,
    "_id": "60fe4178eba2cd7e52885e1a",
    "header": "These 13-year-olds are fearless",
    "newsText": "Liam Ansell gets on the end of Phil Roper's shot across goal to tap home his second of the day for Great Britain and secure this key win over Canada.",
    "imageLink": "https://ichef.bbci.co.uk/news/976/cpsprodpb/17F75/production/_119556189_gettyimages-1328608946.jpg",
    "category": "Sports",
    "author": "Rahim Mia",
    "publishTime": "2021-07-26T05:00:40.832Z",
    "__v": 0
}


# Geting all news

Get Request Link: http://localhost:3001/news/

Response: Give all news inside an array of objects.

# Getting letest news(ALL type user can see.)

Get Request Link: http://localhost:3001/news/letest

Response: Give an array with 5 objects based on letest time.only the news whose status is true

# Getting Categpry wise news

Get Request Link: http://localhost:3001/news//:category

* We need to give category name in the parameter

Response: Give Category wise news .only the news whose status is true

# Getting news by searching

Get Request Link: http://localhost:3001/news/:search

only the news whose status is true

https://masteringjs.io/tutorials/mongoose/find


https://stackoverflow.com/questions/41503756/how-to-filter-documents-in-mongoose-model-with-data-from-another-models



# updating news and aprroving(Admin Only)

* admin can update any news (published or unpublished -> status : true or status : false)

* admin may update the status field or may not

* if admin update the status as true then a view document will be created

Put request link: http://localhost:3001/news/admin/:id

id example: 60fe421deba2cd7e52885e23

headers:

content-type : application/json
Authrization: Bearer Token

Put request body:

* select raw JSON(application/json)

type 1:



{
    "status": true,
    "header":"Jurassic Pompeii' yields thousands of 'squiggly wiggly",
    "newsText": "The misfortune that struck this place 167 million years ago has delivered to him an extraordinary collection of fossil animals in what is unquestionably one of the most important Jurassic dig sites ever discovered in the UK.",
    "imageLink": "https://ichef.bbci.co.uk/news/976/cpsprodpb/17F75/production/_119556189_gettyimages-1328608946.jpg",
    "category": "World",
    "author": "Mukul Mia"   
}

type 2: (When admin would not change the status)

{
    "header":"Jurassic Pompeii' yields thousands of 'squiggly wiggly",
    "newsText": "The misfortune that struck this place 167 million years ago has delivered to him an extraordinary collection of fossil animals in what is unquestionably one of the most important Jurassic dig sites ever discovered in the UK.",
    "imageLink": "https://ichef.bbci.co.uk/news/976/cpsprodpb/17F75/production/_119556189_gettyimages-1328608946.jpg",
    "category": "World",
    "author": "Mukul Mia"   
}

type 3: (admin can set the status false by hard codig)

{
	
    "status": false,
    "header":"Jurassic Pompeii' yields thousands of 'squiggly wiggly",
    "newsText": "The misfortune that struck this place 167 million years ago has delivered to him an extraordinary collection of fossil animals in what is unquestionably one of the most important Jurassic dig sites ever discovered in the UK.",
    "imageLink": "https://ichef.bbci.co.uk/news/976/cpsprodpb/17F75/production/_119556189_gettyimages-1328608946.jpg",
    "category": "World",
    "author": "pappu"   
}

# Deleteting a news (admin only)

* admin can delete any news (published or unpublished -> status : true or status : false)

DELETE request link: http://localhost:3001/news/admin/:id

id example: 60fe41eaeba2cd7e52885e21

headers:

content-type : application/json
Authrization: Bearer Token


# Getting most popular news (All type of user even anonymous)

GET request link: http://localhost:3001/news/popular

response: 

[
    {
        "view": 7,
        "_id": "610230794fcd7f71f1a35618",
        "newsId": "60fe421deba2cd7e52885e23",
        "__v": 0
    }
]
