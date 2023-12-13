# Fnext Api

A api for all features of fnext app.

## Documentation

#### Register a new Owner

```http
  POST /owner
```

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `name`     | `string` | **Obligatory**. name of the owner      |
| `email`    | `string` | **Obligatory**. email of the owner     |
| `birtdate` | `string` | **Obligatory**. birthdate of the owner |

If email is already taken return **409** status code

```http
{
	"statusCode": 409,
	"message": "Email already in use"
}
```

If not return **201** status code
