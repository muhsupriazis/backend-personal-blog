# RestFull API

## Auth API

### findAllBlogs
`findAllBlogs` adalah function yang digunakan untuk menghandle `REQUEST` method `GET` 

`{BASE_URL}/api/blogs`

Function ini akan mengembalikan `RESPONSE` berupa object 

```js
[
    {
        _id: "string",
        title: "string",
        slug: "string",
        content: "string",
        published: "boolean",
        thumbnail: "string",
        createdAt: "date",
        updatedAt: "date"
    },
    {
        _id: "string",
        title: "string",
        slug: "string",
        content: "string",
        published: "boolean",
        thumbnail: "string",
        createdAt: "date",
        updatedAt: "date"
    },
    ....
]
```

### findBlogById
`findBlogById` adalah function yang digunakan untuk menghandle `REQUEST` method `GET` 

`{BASE_URL}/api/blogs/:id`

`REQUEST` yang dibutuhkan adalah `PARAMS`

Function ini akan mengembalikan `RESPONSE` berupa object 

```js
{
    _id: "string",
    title: "string",
    slug: "string",
    content: "string",
    published: "boolean",
    thumbnail: "string",
    createdAt: "date",
    updatedAt: "date"
}
```

### findBlogCount
`findBlogCount` adalah function yang digunakan untuk menghandle `REQUEST` method `GET` 

`{BASE_URL}/api/blogs/:count`

Function ini akan mengembalikan `RESPONSE` berupa object 

```js
[
    {
        _id: "string",
        title: "string",
        slug: "string",
        content: "string",
        published: "boolean",
        thumbnail: "string",
        createdAt: "date",
        updatedAt: "date"
    },
    {
        _id: "string",
        title: "string",
        slug: "string",
        content: "string",
        published: "boolean",
        thumbnail: "string",
        createdAt: "date",
        updatedAt: "date"
    },
    ....
]
```

### saveBlog
`saveBlog` adalah function yang digunakan untuk menghandle `REQUEST` method `POST` 

`{BASE_URL}/api/blogs`

`REQUEST` yang dibutuhkan adalah `BODY`

Function ini akan mengembalikan `RESPONSE` berupa object 

```js
{
    message: "successfuly save data"
}
```

### updateBlog
`updateBlog` adalah function yang digunakan untuk menghandle `REQUEST` method `POST` 

`{BASE_URL}/api/blogs`

`REQUEST` yang dibutuhkan adalah `BODY & ID`

Function ini akan mengembalikan `RESPONSE` berupa object 

```js
{
    message: "successfuly updated data"
}
```

### deleteBlog
`deleteBlog` adalah function yang digunakan untuk menghandle `REQUEST` method `DELETE` 

`{BASE_URL}/api/blogs/:id`

`REQUEST` yang dibutuhkan adalah `PARAMS`

Function ini akan mengembalikan `RESPONSE` berupa object 

```js
{
    message: "successfuly deleted data"
}
```

## Public API

### findAllBlogs
`findAllBlogs` adalah function yang digunakan untuk menghandle `REQUEST` method `GET` 

`{BASE_URL}/api/blogs`

Function ini akan mengembalikan `RESPONSE` berupa object 

```js
[
    {
        _id: "string",
        title: "string",
        slug: "string",
        content: "string",
        published: "boolean",
        thumbnail: "string",
        createdAt: "date",
        updatedAt: "date"
    },
    {
        _id: "string",
        title: "string",
        slug: "string",
        content: "string",
        published: "boolean",
        thumbnail: "string",
        createdAt: "date",
        updatedAt: "date"
    },
    ....
]
```

### findBlogById
`findBlogById` adalah function yang digunakan untuk menghandle `REQUEST` method `GET` 

`{BASE_URL}/api/blogs/:id`

`REQUEST` yang dibutuhkan adalah `PARAMS`

Function ini akan mengembalikan `RESPONSE` berupa object 

```js
{
    _id: "string",
    title: "string",
    slug: "string",
    content: "string",
    published: "boolean",
    thumbnail: "string",
    createdAt: "date",
    updatedAt: "date"
}
```

### findBlogCount
`findBlogCount` adalah function yang digunakan untuk menghandle `REQUEST` method `GET` 

`{BASE_URL}/api/blogs/:count`

Function ini akan mengembalikan `RESPONSE` berupa object 

```js
[
    {
        _id: "string",
        title: "string",
        slug: "string",
        content: "string",
        published: "boolean",
        thumbnail: "string",
        createdAt: "date",
        updatedAt: "date"
    },
    {
        _id: "string",
        title: "string",
        slug: "string",
        content: "string",
        published: "boolean",
        thumbnail: "string",
        createdAt: "date",
        updatedAt: "date"
    },
    ....
]
```