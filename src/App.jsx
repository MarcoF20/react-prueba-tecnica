import { useEffect, useState } from 'react'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_URL = 'https://cataas.com'
export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
        const threeFirstWOrds = fact.split(' ', 3).join(' ')
        fetch(`https://cataas.com/cat/says/${threeFirstWOrds}?size=50&color=red&json=true`)
          .then(res => res.json())
          .then(response => {
            console.log(response)
            const { url } = response
            setImageUrl(url)
          })
      })
  }, [])
  return (
    <main>
      <h1>App de gatos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={`${CAT_PREFIX_URL}${imageUrl}`} alt={`Image extracted from using the three first words of ${fact}`} />}
    </main>
  )
}
