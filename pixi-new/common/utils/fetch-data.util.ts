export const fetchData = async (url:string) => {
    return await fetch(url)
        .then((res) => res.json())
        .catch(e => console.error(e))
}