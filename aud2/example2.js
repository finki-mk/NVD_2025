class Character {
    constructor(id, name, status, species, origin, episodes) {
        this.id = id
        this.name = name
        this.status = status
        this.species = species
        this.origin = origin
        this.episodes = episodes
        this.episodeCount = episodes.length
        this.pilotEpisodeCode = null
    }

    firstEpisodeCode() {
        if (this.pilotEpisodeCode === null || this.pilotEpisodeCode === undefined) {
            return "Unknown"
        }
        return this.pilotEpisodeCode;
    }
}

async function fetchRickAndMortyCharacters() {

    let response = await fetch("https://rickandmortyapi.com/api/character");
    let payload = await response.json();
    if (!payload || !payload.results || payload.results.length === 0) {
        console.log("Empty characters payload.");
        return;
    }

    let characters = payload.results.map(c => new Character(
        c.id,
        c.name,
        c.status,
        c.species,
        c.origin.name,
        c.episode
    ));

    let firstEpisodeUrls = [];
    characters.forEach(ch => {
        let firstUrl = ch.episodes[0];
        if (firstUrl) {
            let alreadyExists = false;
            for (let i = 0; i < firstEpisodeUrls.length; i++) {
                if (firstEpisodeUrls[i] === firstUrl) {
                    alreadyExists = true;
                    break;
                }
            }
            if (!alreadyExists) {
                firstEpisodeUrls.push(firstUrl);
            }
        }
    });

    let fetchPromises = firstEpisodeUrls.map(url => fetch(url));
    let responses = await Promise.all(fetchPromises);

    let firstEpisodeCodeByUrl = {};
    for (let i = 0; i < responses.length; i++) {
        let r = responses[i];
        let url = firstEpisodeUrls[i];
        let code = "Unknown";
        let ep = await r.json();
        if (ep && ep.episode) {
            code = ep.episode;
        }
        firstEpisodeCodeByUrl[url] = code;
    }

    characters.forEach(ch => {
        let firstUrl = ch.episodes[0];
        if (firstUrl && firstEpisodeCodeByUrl[firstUrl]) {
            ch.pilotEpisodeCode = firstEpisodeCodeByUrl[firstUrl];
        } else {
            ch.pilotEpisodeCode = "Unknown";
        }
    });

    let alive = characters.filter(ch => ch.status === "Alive");

    let uniqueAliveSpecies = [];
    alive.forEach(ch => {
        if (uniqueAliveSpecies.indexOf(ch.species) === -1) {
            uniqueAliveSpecies.push(ch.species);
        }
    });
    uniqueAliveSpecies.sort((a, b) => a.localeCompare(b));

    let topByAppearances = characters
        .slice()
        .sort((a, b) => b.episodeCount - a.episodeCount)
        .slice(0, 5);

    let anyEarthOrigin = characters.some(ch => ch.origin.includes("Earth"));

    console.log("=== Unique species among Alive characters (alphabetical) ===");
    if (uniqueAliveSpecies.length === 0) console.log("(none)");
    else uniqueAliveSpecies.forEach((s, i) => console.log(`${i + 1}. ${s}`));

    console.log("\n=== Top 5 characters by number of appearances ===");
    topByAppearances.forEach((ch, i) => {
        console.log(`${i + 1}. ${ch.name} — episodes: ${ch.episodeCount} — firstEpisode: ${ch.firstEpisodeCode()}`);
    });

    console.log("\n=== Any origin includes 'Earth'? ===");
    console.log(anyEarthOrigin ? "Yes" : "No");

    console.log("\n=== Full Character Summary (first 20) ===");
    let tableRows = characters.map(ch => ({
        id: ch.id,
        name: ch.name,
        status: ch.status,
        species: ch.species,
        origin: ch.origin,
        episodeCount: ch.episodeCount,
        firstEpisodeCode: ch.firstEpisodeCode()
    }));
    console.log(tableRows);

    return {
        characters,
        alive,
        uniqueAliveSpecies,
        topByAppearances,
        anyEarthOrigin
    };
}

fetchRickAndMortyCharacters();
