import beauty from "../../assets/icons/beautybaylogo.svg"

const Beauty = () => {
  return (
    <div className="w-[1440px] mx-auto mt-10">
        <div className="flex items-center justify-between p-3">
            <div className="w-[500px] h-[2px] bg-gray-400"></div>
            <img src={beauty} alt="beauty" className="w-[300px] h-[300px]" />
            <div className="w-[500px] h-[2px] bg-gray-400"></div>
        </div>
    </div>
  )
}

export default Beauty