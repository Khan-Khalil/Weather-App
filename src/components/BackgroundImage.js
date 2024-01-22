

async function  getBackgroundImage(weatherDescription) {
    try {
        const response = await fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${weatherDescription}`)
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
       return `url(${data.urls.regular})`
    } catch (error) {
       return `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
      )`
    }
}
export default getBackgroundImage