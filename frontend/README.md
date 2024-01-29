# Project Initialization and Setup

- Run
```bash
npm run dev
```
## Problems Faced

During the development process, two main challenges were encountered:

### 1. Saving Favorite Blogs in IndexDB

Storing favorite blogs in the browser's IndexDB presented an initial hurdle. After exploration, a decision was made to opt for a simpler solution: saving only the blog IDs in the local storage.

### 2. Caching Blog Comments

Efficiently caching blog comments was another challenge. To address this, a strategy was implemented to cache comments for a duration of 2 hours. Additionally, when making a request, the system checks if the requested data is available in the cache. If present, the data is served from the cache; otherwise, a new request is made.

## Solutions Implemented

### 1. Saving Favorites in Local Storage

Rather than using the complex IndexDB, a straightforward approach was taken. Only the IDs of favorite blogs are stored in the local storage. This simplifies the implementation and provides a practical solution for tracking user preferences.

### 2. Caching Blog Comments

To optimize the retrieval of blog comments, a caching mechanism was introduced. Comments are cached for a period of 2 hours. During subsequent requests, the system first checks the cache. If the requested data is found in the cache and within the valid timeframe, it is served directly. Otherwise, a new request is made to fetch the latest comments.

These solutions ensure a smoother and more user-friendly experience, addressing the initial challenges faced during development.
