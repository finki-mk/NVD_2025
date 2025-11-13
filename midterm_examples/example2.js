class Movie{
    constructor(title, genre,duration, capacity, ticketPrice, lastShowDate) {
        this.title = title
        this.genre = genre
        this.id = this.title.slice(0,3).toUpperCase()
        this.duration = duration
        this.capacity = capacity
        this.ticketPrice = ticketPrice
        this.lastShowDate = new Date(lastShowDate)
        this.isActive = true
    }

    toString(){
        return `Movie ${this.id} titled "${this.title}" with a duration of ${this.duration} minutes, a capacity of ${this.capacity} seats, and a ticket price of ${this.ticketPrice} $.`
    }

}

class InternationalMovie extends Movie{
    constructor(title, genre,duration, capacity, ticketPrice, lastShowDate, requiresSubtitles, isRestricted) {
        super(title, genre,duration, capacity, ticketPrice, lastShowDate);
        this.requiresSubtitles = requiresSubtitles
        this.isRestricted = isRestricted
    }

    getRestrictionLevel(){
        if(this.requiresSubtitles){
            if(this.isRestricted)
                return 'Very High'

            if (this.capacity > 100)
                return 'High'

            return 'Moderate'
        }
        else{
            if(this.capacity > 100)
                return 'Moderate'

            if(this.duration > 150)
                return 'Low'

            return 'Very Low'
        }
    }

    toString(){
        return `Movie ${this.id} titled "${this.title}" is an international movie which ${this.requiresSubtitles ? "requires" : "doesn't require"} subtitles and ${this.isRestricted ? "is" : "isn't"} restricted.`
    }

}

class MovieTheater{
    constructor() {
        this.movies = []
    }

    addMovie(movie){
        this.movies.push(movie)
    }

    updateMovies(){
        let currentDate = new Date()

        this.movies.forEach(movie => {
            if(movie instanceof InternationalMovie){
                if((currentDate - movie.lastShowDate) / (1000 * 60 * 60 * 24 ) > 28){
                    movie.isActive = false
                    console.log(`International ${movie.id} has a ${movie.getRestrictionLevel()} restriction level.`)
                }
            }
            else{
                if((currentDate - movie.lastShowDate) / (1000 * 60 * 60 * 24 ) > 7){
                    movie.isActive = false
                }
            }
        })
    }

    internationalPercentage(genre){
        let activeInternationalMoviesInGenre = this.movies
            .filter(movie => movie instanceof InternationalMovie && movie.genre == genre && movie.isActive == true)

        let activeMoviesInGenre = this.movies
            .filter(movie => movie.genre == genre && movie.isActive == true)

        if(activeMoviesInGenre.length == 0)
            return 0

        return (activeInternationalMoviesInGenre.length / activeMoviesInGenre.length) * 100
    }

    printMovies(){
        this.movies
            .sort((a, b) => b.duration - a.duration)
            .forEach(movie => console.log(movie.toString()))
    }

}