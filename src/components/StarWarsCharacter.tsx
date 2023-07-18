import React, { useEffect, useState } from "react";

interface Character {
  name: string;
}

const StarWarsCharacter: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/1/");
        if (!response.ok) {
          setErrorCode(response.status);
          throw new Error("API request failed");
        }
        const data = (await response.json()) as Character;
        setCharacter(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorCode === 500) {
    return <div>Oops... something went wrong, try again 🤕</div>;
  }

  if (errorCode === 418) {
    return <div>418 I'm a tea pot 🫖, silly</div>;
  }

  return (
    <div>
      <h1>Star Wars Character: {character?.name}</h1>
    </div>
  );
};

export default StarWarsCharacter;
