// Union Types
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') return Array(padding + 1).join(' ') + value;
  if (typeof padding === 'string') return padding + value;
}

// Unions with Common Fields -------------------------------------
// If we have a value that is a union type, we can only
// access members that are common to all types in the union.
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs();

// pet.swim(); // // Only available in one of the two possible types

// Discriminating Unions ------------------------------------
type NetworkLoadingState = { state: 'loading' };
type NetworkFailureState = { state: 'failed'; code: number };
type NetworkSuccessState = {
  state: 'success';
  response: { title: string; duration: string; summary: string };
};

// Create a type which represents only one of the above types
// but you aren't sure which it is yet.
type NetworkState =
  | NetworkLoadingState
  | NetworkFailureState
  | NetworkSuccessState;

// we can only access the common fields
function logger(state: NetworkState): string {
  // state.code // raises errors
  switch (state.state) {
    case 'loading':
      return 'Downloading...........';
    case 'failed':
      return `Error ${state.code} downloading`;
    case 'success':
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}

// Intersection Types
// An intersection type combines multiple types into one.
interface ErrorHandling {
  success: boolean;
  error: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }
  console.log(response.artists);
};
