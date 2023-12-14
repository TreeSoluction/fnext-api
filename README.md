# Fnext Api

A api for all features of fnext app.

# Documentation

## Owner

#### Register a new Owner

```http
  POST /owner
```

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `name`     | `string` | **Obligatory**. name of the owner      |
| `email`    | `string` | **Obligatory**. email of the owner     |
| `birtdate` | `string` | **Obligatory**. birthdate of the owner |

### Request Example

```
{
  "name" : "Guilherme Vianna", 
  "email" : "mataveli91@gmail.com",
  "birthdate" : "2023-07-28" 
}
```
### Response
If email is already taken return **409** status code

```http
{
	"statusCode": 409,
	"message": "Email already in use"
}
```

If not return **201** status code
