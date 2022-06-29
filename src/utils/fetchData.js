
// obtained from the RapidAPI: ExerciseDB
export const exerciseOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  }

// obtained from the RapidAPI: YouTube Search and Download
export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'fcaf406e1dmsh0971a9d442fe41bp1e3b21jsn01af646900c6',
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  }
}

export async function fetchData(url, options) {
    const response = await fetch(url, options)
    const data = await response.json()
    return data
}