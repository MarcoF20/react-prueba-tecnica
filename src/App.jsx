import { useEffect, useState } from 'react'
import { getRandomFact } from './services/fact'

// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_URL = 'https://cataas.com'
export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }
  useEffect(() => { getRandomFact().then(setFact) }, [])
  useEffect(() => {
    if (!fact) return
    const threeFirstWOrds = fact.split(' ', 3).join(' ')
    fetch(`https://cataas.com/cat/says/${threeFirstWOrds}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        console.log(response)
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])
  return (
    <main>
      <h1>App de gatos</h1>
      <button onClick={handleClick}>Get another fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={`${CAT_PREFIX_URL}${imageUrl}`} alt={`Image extracted from using the three first words of ${fact}`} />}
    </main>
  )
}
