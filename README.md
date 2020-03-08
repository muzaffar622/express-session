# Express-Session

decode/encode/remove jwt data from/to session using express-session

## Getting started

## set secrets
create and save <br/>
SESSION_SECRET=your session secret<br/>
TOKEN_SECRET=your token secret<br/>

to .env file<br/>

using npm
```
npm i
npm run dev
```

## API's for test


```
ENCODE SESSION

POST host:3000/api/encode
body: {
"data": "your input"
}

response 
{
    "data": "eyJhbGciOiJIUzI1NiJ9.eW91ciBpbnB1dA.fD8M6O8Atlz7QaWYjsFXOLtU_C0cdvbfEHWVAwDIpio"
}
```

```
DECODE SESSION

GET localhost:3000/api/decode
query:{
search: "your decoded jwt data"
}

response 
{
    "data": "your input"
}
```

``` 
REMOVE SPECIFIC SESSION

DELETE localhost:3000/api/destroy
body:{
"data": "your decoded jwt data"
}
```

## LICENSE
MIT
