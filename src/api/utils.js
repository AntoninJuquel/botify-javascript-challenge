export function BrowseNeo({ url }) {
    return (
        fetch(url ?? "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY")
            .then(result => result.json())
            .then(res => res)
            .catch(err => err)
    )
}