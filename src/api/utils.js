export function BrowseNeo({ url }) {
    return (
        fetch(url ?? "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=Cb7ABiryaKAwR1uQk1Y9C4SlgLt33VdV0wlACoRF")
            .then(result => result.json())
            .then(res => res)
            .catch(err => err)
    )
}