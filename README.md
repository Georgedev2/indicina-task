This is a nextjs project, that allows user to enter a URL such as `https://indicina.co/sbg/standard-bank-group/careers/apply/jobs/view-all-jobs/job-detail?jobID=744000056709993` and it returns a
short URL such as `http://short.est/GeAi9K` Visiting the shortened URL should redirect the user to the long
URL. Using the example above, visiting `http://short.est/GeAi9K` should redirect the user to
`https://indicina.co/sbg/standard-bank-group/careers/apply/jobs/view-all-jobs/job-detail?jobID=744000056709993`


## Getting Started
first clone the project by running 

```bash
git clone https://github.com/Georgedev2/indicina-task.git

```

install the project dependencies by running:

```bash
npm install 

```
To run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

###  1. POST http://localhost:3000/api/encode
`` 
Content-Type: application/json
``

```bash
{
"longUrl":"https://example.com/my/long/article?serach=k"
}
```

#### Response

```bash
{
  urlDetail: {
    longUrl: 'https://example.com/my/long/article?serach=k',
    shortUrl: 'https://example.com/NDg',
    visits: 0,
  },
  success: true
}
```

### 2. POST http://localhost:3000/api/decode
`` 
Content-Type: application/json
``

```bash
{
"shortUrl":"https://example.com/NDg"
}
```

#### Response

```bash
{
  "longUrl": "https://example.com/my/long/article?serach=k",
  "success": true
}
```

### 3. GET  http://localhost:3000/api/list


#### Response

```bash
{
  "data": [
    {
      "longUrl": "https://example.com/my/long/article?serach=k",
      "shortUrl": "https://example.com/NDg",
      "shortUrlId": "NDg",
      "createdAt": "2025-05-06T20:19:49.666Z",
      "visits": 0
    },
    {
      "longUrl": "https://www.standardbank.com/sbg/standard-bank-group/careers/apply/jobs/view-all-jobs/job-detail?jobID=744000056709993",
      "shortUrl": "https://www.standardbank.com/NDc",
      "shortUrlId": "NDc",
      "createdAt": "2025-05-06T18:18:27.055Z",
      "visits": 1
    }
    ...
    ]
}   
```

###  4. GET  http://localhost:3000/api/list?search=bamboohr

#### Response

```bash
{
  "data": [
    {
      "longUrl": "https://duplo.bamboohr.com/careers/110?utm_source=",
      "shortUrl": "https://duplo.bamboohr.com/NDY",
      "shortUrlId": "NDY",
      "createdAt": "2025-05-06T18:15:59.773Z",
      "visits": 0
    }
  ],
  "success": true
}  
```

###  5. GET  GET  http://localhost:3000/api/NDg

#### Response

```bash
Redirected to the long URL  
```


###  6. GET  GET GET  http://localhost:3000/api/statistic/NDg

#### Response

```bash
{
  "urlStats": {
    "visits": 3,
    "createdAt": "2025-05-06T20:19:49.666Z"
  },
  "success": true
} 
```