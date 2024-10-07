import may from "../../assets/icons/beautybaylogo.svg"
import arrow from "../../assets/icons/arrow.svg"
import facebook from "../../assets/icons/facebook.svg"
import instagram from "../../assets/icons/instagram.svg"
import twitter from "../../assets/icons/twitter.svg"
import tiktok from "../../assets/icons/tiktok.svg"
import heading from "../../assets/icons/heading.svg"
import youtube from "../../assets/icons/youtube.svg"
import paypal from "../../assets/icons/paypal.svg"
import klarna from "../../assets/icons/klarna.svg"
import clearpay from "../../assets/icons/clearpay.svg"
import visa from "../../assets/images/visa.png"
import maestro from "../../assets/images/maestro.png"
import mastercard from "../../assets/images/maestro (1).png"
import amex from "../../assets/images/amex.jpg"

const Footer = () => {
    return (
        <div className="w-[1440px] bg-gray-200 mx-auto mt-10">
            <div className="flex items-center py-[70px] justify-between">
                <div className="w-[300px] h-[300px] pl-[40px]">
                    <img src={may} alt="may" />
                </div>
                <div className="flex items-start pr-[30px] gap-[50px]">
                    <div>
                        <ul>
                            <li className="text-[20px] font-extrabold">Help & Information</li>
                            <li className="text-[20px] font-normal">Delivery & Returns</li>
                            <li className="text-[20px] font-normal">Contact Us & FAQ's</li>
                            <li className="text-[20px] font-normal">Haul Pass</li>
                            <li className="text-[20px] font-normal">Gift Cards</li>
                            <li className="text-[20px] font-normal">About Us</li>
                            <li className="text-[20px] font-normal">Careers</li>
                            <li className="text-[20px] font-normal">Affiliates</li>
                            <li className="text-[20px] font-normal">Student Discount</li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center">
                        <ul>
                            <li className="text-[20px] font-extrabold">Legal</li>
                            <li className="text-[20px] font-normal">Terms & Conditions</li>
                            <li className="text-[20px] font-normal">TRIBE Terms</li>
                            <li className="text-[20px] font-normal">Website Terms of Use</li>
                            <li className="text-[20px] font-normal">Privacy</li>
                            <li className="text-[20px] font-normal">Anti-Slavery</li>
                            <li className="text-[20px] font-normal">Cookies</li>
                            <li className="text-[20px] font-normal">Manage Preferences</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-[30px] font-extrabold">Want More from Beauty Bay?</h2>
                        <p className="text-[15px] font-normal mt-[10px]">Let's stay in touch! We promise to send <br /> you the latest news, offers, and the <br /> freshest beauty drops, straight to your <br /> inbox.</p>
                        <div className="flex items-center gap-[10px] mt-[20px] bg-gray-200">
                            <input className="w-[250px] h-[30px] text-black bg-gray-200" type="text" placeholder="Your email" />
                            <img src={arrow} alt="arrow" />
                        </div>
                        <div className="flex items-center gap-[20px] mt-[30px]">
                            <img src={facebook} alt="facebook" />
                            <img src={instagram} alt="instagram" />
                            <img src={twitter} alt="twitter" />
                            <img src={tiktok} alt="tiktok" />
                            <img src={youtube} alt="youtube" />
                            <img src={heading} alt="heading" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h5 className="text-[15px] text-center font-normal">Copyright © 2024 BEAUTY BAY Ltd.</h5>
                <h6 className="text-[15px] text-center font-normal">Registered office address Level 12, 5 Exchange Quay, M5 3EF. Registered in England, company registration number 6427672, VAT number GB 927197591.</h6>
            </div>
            <div className="flex items-center pt-[50px] pb-[50px] justify-center gap-[50px]">
                <img src={paypal} alt="paypal" />
                <img src={klarna} alt="klarna" />
                <img src={clearpay} alt="clearpay" />
                <img className="w-[62px] h-[25px]" src={visa} alt="visa" />
                <img className="w-[62px] h-[25px]" src={amex} alt="amex" />
                <img className="w-[62px] h-[25px]" src={maestro} alt="maestro" />
                <img className="w-[40px] h-[25px]" src={mastercard} alt="mastercard" />
            </div>
        </div>
    )
}

export default Footer