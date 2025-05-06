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

## Request:
### 1. POST http://localhost:3000/api/encode
`` 
Content-Type: application/json
``

```bash
{
"longUrl":"https://example.com/my/long/article?serach=k"
}
```

## Response

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