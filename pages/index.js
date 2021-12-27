import { useEffect, useState } from "react";
import Link from "next/link";
import Seo from "../components/Seo";
import { useRouter } from "next/router";

const API_KEY = process.env.API_KEY;

export default function Home({results}) { //<--getServerSideProps에서 수행한 props가 여기에 전달된다. serverside로 수행하고 싶은경우
  /*
   => 모든 데이터가 다 보여주고 나서 데이터를 보여주고 싶을때
   즉시 페이지를 렌더링하는 경우,
  */

  const router = useRouter();
  const onClick = (id, title) =>{
    router.push({
      pathname: `/movies/${id}`,
      query:{
        id,
        title
      },
    },`/movies/${id}`);//클라이언트엔 마스킹되서 나오고, 라우터에선 해당 정보가 보인다.
    //해당 url로 정보를 숨기고 전달하는 방법
  }

  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
              <div onClick={()=>onClick(movie.id,movie.original_title)} className="movie" key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                <h4>
                  <Link href={{
                    pathname : `/movies/${movie.id}`,
                    query: {
                      title: movie.original_title,
                    }
                  }} as={`movies/${movie.id}`}>
                    <a>{movie.original_title}</a>
                  </Link>
                </h4>
              </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(){
  //함수명은 고정형, api키를 숨시기 좋음 절대로 client에선 이 함수를 접근할수 없음
  /*
    frontend에선 /api/movies
    backend에선 전체 url을 붙여준다.
    ==> api가 응답받기 전까지 화면상에서 보여주지 않는다.
  */
  const { results } = await ( await fetch(`http://localhost:3000/api/movies`)).json();
  return {
    props :{
      results,
    }
  }
}

//movies/:id
