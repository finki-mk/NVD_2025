class User{
    constructor(id, name, username, email) {
        this.id = id
        this.name = name
        this.username = username
        this.email = email
        this.postsCount = 0
    }

    toString(){
        return `User ${this.name} with username ${this.username} and email ${this.email}`
    }
}

class Post{
    constructor(userId, title, body) {
        this.userId = userId
        this.title = title
        this.body = body
    }

    summary(){
        if(body.length > 30){
            return body.slice(0,30) + '...'
        }
        return body
    }

    toString(){
        return `${this.title} posted by user with id ${this.userId}`
    }
}

async function fetchDataAndTransform(){
    let usersResponse = await fetch('https://jsonplaceholder.typicode.com/users')
    const usersObjs = await usersResponse.json()

    let postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts')
    const postsObjs = await postsResponse.json()

    let users = usersObjs.map(user => new User(user.id, user.name, user.username, user.email))
    let posts = postsObjs.map(post => new Post(post.userId, post.title, post.body))

    let postsWithLongTitles = posts.filter(post => post.title.length > 20)

    postsWithLongTitles.forEach(post => console.log(post.toString()))

    console.log(posts.some(post => post.title.includes('qui') || post.body.includes('qui')))

    let usersId = users.map(user => user.id)
    let usersIdWithPosts = posts.map(post => post.userId)

    console.log(usersId.every(userID => usersIdWithPosts.includes(userID)))

    users.forEach(user => {
        let userPosts = posts.filter(post => user.id==post.userId)
        user.postsCount = userPosts.length
    })

    users.sort((u1, u2) => u2.postsCount-u1.postsCount)

}

fetchDataAndTransform()