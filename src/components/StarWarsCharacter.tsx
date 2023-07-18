import React, { useEffect, useState } from "react";

interface Character {
  name: string;
}

const StarWarsCharacter: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/1/");
        if (!response.ok) {
          throw new Error("API request failed");
        }
        const data = (await response.json()) as Character;
        setCharacter(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(true);
        setLoading(false);
      }
    };
    fetchCharacter();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops... something went wrong, try again 🤕</div>;
  }

  return (
    <div className="background_image">
      <h1>Star Wars Character: {character?.name}</h1>
    </div>
  );
};

export default StarWarsCharacter;
