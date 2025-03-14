/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { FaRegHeart} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link} from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../porvider/AuthProvider";
import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
const MovieCard = ({ movie, movies }) => {
  const { _id, title, rating, genre, duration, year, poster } = movie;
  const [allMovies, setAllMovies] = useState(movies);
  const numberRating = parseInt(rating)
  const {user} = useContext(AuthContext);
  const myStyles = {
     itemShapes: Star ,
     activeFillColor: '#ffb700',
     inactiveFillColor: '#fbf1a9',
  } 

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // delete from the database
        fetch(`https://a10-movie-portal-server.vercel.app/movies/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("delete is done", data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your movie has been deleted.",
                icon: "success",
              });

              const remainingMovie = allMovies.filter(
                (singleMovie) => singleMovie._id !== id
              );
              setAllMovies(remainingMovie);
            }
          });
      }
    });
  };

  return (
    <div>
      <div className="card bg-base-100 shadow-sm transition duration-500 hover:scale-105 overflow-hidden hover:border-[#E4D804] hover:border-2">
        <figure className="h-[400px]">
          <img className="h-full w-full" src={poster} alt="movie images" />
        </figure>
        <div className="f-lato py-4 px-4 text-black">
          {/* 1 row */}
          <div className="flex justify-between items-center">
            <h2 className="md:text-2xl font-bold f-oswald">{title}</h2>
            <p className="font-bold text-gray-600">{year}</p>
          </div>
          {/* 2 row */}
          <div className="flex justify-between items-center mt-2">
            <h3 className="text-xl font-bold text-gray-600">{genre}</h3>
            <p className="font-semibold text-gray-600">{duration} Min</p>
          </div>
          {/* 3 row */}
          <div className="flex justify-between items-center mt-2">
            {/* rating */}
            <Rating 
             style={{maxWidth: 100}}
             value={numberRating}
             itemStyles={myStyles}
             readOnly
            ></Rating>
            <div className="flex items-center">
              <span className=" hover:bg-gray-300 hover:rounded-full p-2 text-2xl text-red-400 cursor-pointer">
                <button onClick={() => handleDelete(_id)}>
                  <MdDelete />
                </button>
              </span>
              <button className="btn rounded-full text-xl hover:bg-[#E4D804] hover:border-black">
                <FaRegHeart></FaRegHeart>
              </button>
            </div>
          </div>
          <Link to="/allMovies">
            <p className="underline font-bold text-[#e2435d] hover:text-black mt-2">
              See All Movies
            </p>
          </Link>
          <div className="mt-10">
            <Link to={
              user ? `/movieDetails/${_id}` : '/login'
            }>
              <button className="btn w-full bg-[#E4D804] hover:bg-black hover:text-white hover:border-[#E4D804]">
                See Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
