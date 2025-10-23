### Example 1 

Write a function that fetches users and posts from https://
jsonplaceholder.typicode.com/users and https://
jsonplaceholder.typicode.com/posts. Create a User class that stores each
user’s id, name, username and email, and a Post class that stores userId,
title and body with an instance method summary() that returns the first 30
characters of the body followed by ... if it is longer. After fetching and
building arrays of User and Post objects, filter posts to keep only those
whose titles are at least 20 characters long, check whether some posts
contain the word “qui” in either the title or body and whether every user
has at least one post, map the top authors into readable strings that
include the user’s name and post count, and sort those authors by post
count in descending order. Print all results in a clean, readable format and
handle invalid payloads, empty arrays, and network errors gracefully. 

---

### Example 2

Write an asynchronous JavaScript function that fetches the first 20
characters from https://rickandmortyapi.com/api/character (GET
request) and then fetches details for each character’s first episode.
Create a Character class that stores id, name, status, species, origin
(name only), episodeCount (length of the episode array), and a
method firstEpisodecode() that returns the fetched episode’s code
(e.g., “S01E01”) or "Unknown" if missing. After building the array of
Character objects and fetching their first episode codes, filter to keep
only Alive characters, extract the unique set of species and print
them alphabetically, sort the full list by episodeCount in descending
order and show the top five characters by appearances. Check
whether some characters have origin that includes “Earth” and finally
print everything in a clean, readable format while handling network
errors and empty payloads gracefully. 