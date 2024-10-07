import { brands } from "../../data";
import { Link } from "react-router-dom";

const Category: React.FC = () => {
    return (
        <section>

            <div className="w-[1440px] mb-[20px] mx-auto p-[20px]">
                <h1 className="text-[60px] mb-[20px] text-center font-extrabold">Category</h1>
                <div className="flex item-center justify-between">
                    {brands.map((product, index) => (
                        <Link key={index} to={`/category/${product.name}`}>
                            <span className="text-[20px] font-normal cursor-pointer">
                                {product.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default Category;