const API_KEY = process.env.API_KEY

module.exports = {
  reactStrictMode: true,
  async redirects(){
    return [
      {
        source : "/contact",
        destination : "/form",
        permanent : false
      }
    ]
  },
  async rewrites(){
    return [
      {
        source: "/api/movies",
        destination : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      },
      {
        source :"/api/movies/:id",
        destination : `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`
      }
    ]
  }
}
/*
  api key를 숨기기 위한 조치 => redirect
  설정 후 재시작
  source : old-blog/:path* => 뒤에 패턴 매칭하면 모두 리다이렉트시킨다.
*/
