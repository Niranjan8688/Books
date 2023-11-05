
# Books

Performing CRUD operation on MongoDb


## API Reference
```
URL : localhost:8080
```
| Headers   | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `String` | **Required**.|



#### Add a Book

```http
  POST /books/addBooks
```


| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `bookId`      | `Number` | **Required**.|
| `title`      | `String` | **Required**.|
| `author`      | `String` | **Required**.|
| `summary`      | `String` | **Required**.|

#### Get all Books


```http
  GET /books/wholeData
```



#### Get Single Book

```http
  POST /books/findById
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `bookId`      | `Number` | **Required**.|


#### Update a Book

```http
  PUT /books/findById
```


| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `bookId`      | `Number` | **Required**.|
| `updateData`      | `JSON` | **Required**.|



#### Delete a Book

```http
  DELETE /books/deleteBook
```


| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `bookId`      | `Number` | **Required**.|

## Features

- Error Handling
- Validation
- Authentication and Authorization



## Authors
- [@Niranjan8688](https://github.com/Niranjan8688)
