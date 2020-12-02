async function getData(){
    var result = await axios({
        method: "post",
        url: "http://localhost:4001/graphql",
        data: {
            query:`
            {
                tracks{
                name
                releaseYear
                artist{
                  name
                }
              }
            }
            `
        }
    })

    return result.data.data.tracks
}

var playlistElement = document.querySelector("#list")



getData().then((tracks) => {
    tracks.forEach((track) => {
        var listItem = document.createElement("li")
        listItem.innerText = `${track.artist.name} - ${track.name} (${track.releaseYear})`
        playlistElement.appendChild(listItem)
    })
})