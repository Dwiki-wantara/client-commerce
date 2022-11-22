import { Link } from "react-router-dom";
import { useQuery } from 'react-query';
import convertRupiah from "rupiah-format";
import Square from "../Timbul.module.css"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// API config
import { API } from '../../config/api';

export default function UserHome() {
  document.title = 'Home';

  let { data: products } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data;
  });

    const settings = {
      fade: true,
      cssEase: 'linear',
      dots: true,
      autoplay: true,
      autoplaySpeed: 7000,
      speed: 1500,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };

  return (
    <div className='bg-white'>
      <div style={{marginTop:"49px"}}>
       
          <Slider {...settings} style={{minWidth:"100%",maxWidth:"100%"}}>
             <img src={`https://storage.googleapis.com/eraspacelink/pmp/production/banners/images/hJGlNMZSkP41NfSGnwTv32sfLr60OXriSpR5prCe.jpg`} style={{width:"100%"}}></img>
             <img src={`https://storage.googleapis.com/eraspacelink/pmp/production/banners/images/SnHgYWnGz51SPanCNSrgKbaUC6vRMv55GJxFOLyF.jpg`} style={{width:"100%"}}></img>
             <img src={`https://storage.googleapis.com/eraspacelink/pmp/production/banners/images/hnaFLfmCNjHM9pJbkQvt6B6L8uVd2IC128KXDx7a.jpg`} style={{width:"100%"}}></img>
             <img src={'https://storage.googleapis.com/eraspacelink/pmp/production/banners/images/ifCe8DUBJmlcg00HdvwKfla4k8OQDmI94EBDlwjJ.jpg'} style={{width:"100%"}}></img>
          </Slider>

        
        <h1 className="m-3">Product List</h1>
        
        <div style={{display: "grid", gridTemplateColumns:"repeat(6,2fr)"}} >
        {products?.map((item, index) => (
            <Link to={`/user/product-detail/` + item.id} width={"100%"} style={{textAlign:"center",color:"white"}} className="m-3"  >
              <div  key={index} className={Square.Square} style={{ backgroundColor:"white", borderRadius:"5px",height:"100%", boxShadow:"0px 0px 2px black"}}>
                
                <div>
                 <img src={item?.image} alt="" style={{boxShadow:"0px 0px 5px black",minHeight:"100%", maxHeight:"100%",minWidth:"100%",maxWidth:"100%",borderTopLeftRadius:"5px", borderTopRightRadius:"5px"}} />
                </div>
                <div style={{marginTop:"5px"}}>
                  <div style={{display:"flex", textAlign:"left",paddingLeft:"20px"}}>
                    <h4 style={{textDecoration:"none", flex:"70%",color:"black", fontFamily:"serif"}}>{item.name.length> 15
                  ? item.name.substring(0, 15) + "..."
                  : item.name}</h4>
                  </div>
                  <div style={{textAlign:"left", paddingLeft:"15px",color:"black", fontFamily:"unset"}}>
                  <p style={{flex:"30%",padding:"5px 0px 0px 5px"}}>{convertRupiah.convert(item.price)}</p>
                  </div>
                  <div style={{textAlign:"left", paddingLeft:"20px", color:"black"}}>
                  <p>Stock : {item?.qty}</p>
                  </div>
                  
                </div>
              </div>
            </Link>
          ))}
        </div>
        </div>



    </div>
  );
}
