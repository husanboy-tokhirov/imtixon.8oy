import formen from "../../assets/images/formen.png"
import cerave from "../../assets/images/cerave.png"
import lauder from "../../assets/images/louder.png"
import avene from "../../assets/images/avene.png"
import hairbust from "../../assets/images/hairbust.png"
import hairmax from "../../assets/images/hairmax.png"

const Brand = () => {
  return (
    <div className=" w-[1440px] mx-auto mt-10">
        <h1 className="text-[40px] font-bold text-center text-black">SHOP MY BRANDS</h1>
        <div className="flex justify-between gap-10 mt-10">
            <div className="w-[300px] h-[250px] bg-gray-300 overflow-hidden rounded-[40px]">
                <div className="w-[300px] h-[80px] bg-pink-300 ">
                    <h2 className="text-[25px] font-bold pl-3 pt-5">UP TO 40% OFF</h2>
                </div>
                <img src={formen} alt="formen" className="w-[300px] h-[220px]" />
            </div>
            <div className="w-[300px] h-[250px] bg-gray-300 overflow-hidden rounded-[40px]">
                <div className="w-[300px] h-[80px] bg-pink-300 ">
                    <h2 className="text-[25px] font-bold pl-12 pt-5">20% OFF</h2>
                </div>
                <img src={cerave} alt="formen" className="w-[300px] h-[220px]" />
            </div>
            <div className="w-[300px] h-[250px] bg-gray-300 overflow-hidden rounded-[40px]">
                <div className="w-[300px] h-[80px] bg-pink-300 ">
                    <h2 className="text-[25px] font-bold pl-14 pt-5">15% OFF</h2>
                </div>
                <img src={lauder} alt="formen" className="w-[300px] h-[220px]" />
            </div>
            <div className="w-[300px] h-[250px] bg-gray-300 overflow-hidden rounded-[40px]">
                <div className="w-[300px] h-[80px] bg-pink-300 ">
                    <h2 className="text-[25px] font-bold pl-14 pt-5">20% OFF</h2>
                </div>
                <img src={avene} alt="formen" className="w-[300px] h-[220px]" />
            </div>
            <div className="w-[300px] h-[250px] bg-gray-300 overflow-hidden rounded-[40px]">
                <div className="w-[300px] h-[80px] bg-pink-300 ">
                    <h2 className="text-[25px] font-bold pl-14 pt-5">20% OFF</h2>
                </div>
                <img src={hairbust} alt="formen" className="w-[300px] h-[220px]" />
            </div>
            <div className="w-[300px] h-[250px] bg-gray-300 overflow-hidden rounded-[40px]">
                <div className="w-[300px] h-[80px] bg-pink-300 ">
                    <h2 className="text-[25px] font-bold pl-14 pt-5">20% OFF</h2>
                </div>
                <img src={hairmax} alt="formen" className="w-[300px] h-[220px]" />
            </div>
        </div>
    </div>
  )
}

export default Brand
