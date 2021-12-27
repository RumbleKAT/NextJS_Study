import { useRouter } from "next/router"
import Seo from "../../components/Seo";

//movie/123412345 Dynamic Routes
/*
  라우터로 전달하는것은 클라이언트에서만 가능하지만, 아래 방법으로 정보를 가져올수있다.
*/

export default function Detail({params}){
    const router = useRouter();
    console.log(router);
    //query를 배열단위로 받아 올수 있음
    const [title, id] = params || []; //서버에서 미리 처리된 페이지이므로, 
    
    return <div>
      <Seo title={title}/>
        <h4>{title}</h4>
    </div>
 /*
   네비게이터에서 전달한 정보로 유저한테 더 로딩이 더 빨라보이는 효과가 있음
 */  
}

export async function getServerSideProps({params:{params}}){
  return {
    props :{
      params,
    }
  }
}
