import { useRouter } from "next/router"

//movie/123412345 Dynamic Routes
export default function Detail(){
    const router = useRouter();
    console.log(router);

    return <div>
        <h4>{router.query.title || `Loading....` }</h4>
    </div>
 /*
   네비게이터에서 전달한 정보로 유저한테 더 로딩이 더 빨라보이는 효과가 있음
 */

   
}