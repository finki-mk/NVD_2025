
class Movie{
    constructor(title, genre, duration, capacity, ticketPrice, lastShowDate) {
        this.title = title
        this.genre = genre
        this.id = this.title.slice(0, 3).toUpperCase()
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
    constructor(title, genre, duration, capacity, ticketPrice, lastShowDate, requiresSubtitles, isRestricted) {
        super(title, genre, duration, capacity, ticketPrice, lastShowDate);
        this.isRestricted = isRestricted
        this.requiresSubtitles = requiresSubtitles
    }

    getRestrictionLevel(){
        if(!this.requiresSubtitles){
            if(this.capacity > 100){
                return 'Moderate'
            }

            if(this.duration > 150){
                return 'Low'
            }

            return 'Very Low'
        }
        else{
            if(this.isRestricted)
                return 'Very High'

            if(this.capacity > 100){
                return 'High'
            }
            return 'Moderate'
        }
    }

    toString(){
        return `Movie ${this.id} titled "${this.title}" is an international movie which ${this.requiresSubtitles ? "requires" : "doesn't require"} subtitles and ${this.isRestricted ? 'is' : "isn't"} restricted.`
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
        let basicMovies = this.movies.filter(movie => movie instanceof Movie)
        let internationalMovies = this.movies.filter(movie => movie instanceof InternationalMovie)

        let currentDate = new Date()
        basicMovies.forEach(movie => {
            if((currentDate - movie.lastShowDate) / (1000*60*60*24) > 7){
                movie.isActive = false
            }
        })

        internationalMovies.forEach(movie => {
            if((currentDate - movie.lastShowDate) / (1000*60*60*24) > 28){
                movie.isActive = false
                console.log(`International ${movie.id} has a ${movie.getRestrictionLevel()} restriction level.`)
            }
        })
    }

    internationalPercentage(genre) {
        const activeMovies = this.movies.filter(movie => movie.isActive && movie.genre.toLowerCase() === genre.toLowerCase());
        const activeInternationalMovies = activeMovies.filter(movie => movie instanceof InternationalMovie);

        if (activeMovies.length === 0) return 0;

        return (activeInternationalMovies.length / activeMovies.length) * 100;
    }


    printMovies(){
        this.movies
            .sort((a, b) => b.duration - a.duration)
            .forEach(movie => console.log(movie.toString()));
    }
}