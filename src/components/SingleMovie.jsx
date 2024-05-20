import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieByIdQuery } from '../MovieAPI';

function SingleMovie() {
  const { id } = useParams();
  const { data: movie, error, isLoading } = useGetMovieByIdQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("SINGLE MOVIE DATA:", movie);

  return (
    <div className="single-movie-container">
      <div className="movie-header">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
        />
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p><strong>Tagline:</strong> {movie.tagline}</p>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average} (based on {movie.vote_count} votes)</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p><strong>Status:</strong> {movie.status}</p>
          <p><strong>Homepage:</strong> <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a></p>
          <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      <div className="additional-info">
        <div className="collection">
          <h2>Belongs to Collection</h2>
          {movie.belongs_to_collection && (
            <div>
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.belongs_to_collection.poster_path}`} 
                alt={movie.belongs_to_collection.name}
              />
              <p>{movie.belongs_to_collection.name}</p>
            </div>
          )}
        </div>
        <div className="production">
          <h2>Production Companies</h2>
          <ul>
            {movie.production_companies.map(company => (
              <li key={company.id}>
                {company.logo_path && (
                  <img 
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} 
                    alt={company.name}
                  />
                )}
                <p>{company.name} ({company.origin_country})</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SingleMovie;
