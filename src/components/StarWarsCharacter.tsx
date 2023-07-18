import React, { useEffect, useState } from "react";

interface Character {
  name: string;
}

const StarWarsCharacter: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/1/");
        const data = (await response.json()) as Character;
        setCharacter(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };
    fetchCharacter();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Star Wars Character: {character?.name}</h1>
    </div>
  );
};

export default StarWarsCharacter;
