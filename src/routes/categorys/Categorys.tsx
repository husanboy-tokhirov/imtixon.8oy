import { useGetProductsByBrandQuery } from "../../redux/api";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Category from "../../components/cotegory/Cotegory";

const Categorys = () => {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useGetProductsByBrandQuery(id!);

    useEffect(() => {
        if (id) {
        }
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data</div>;
    }

    return (
        <>
            <Header />
            <Category />
            <div>
                <span className="text-2xl font-bold">
                    {id}
                </span>
                <div>
                    {data?.map((product: any) => (
                        <div key={product.id}>
                            <h2>{product.name}</h2>
                            <img src={product.image} alt={product.name} />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Categorys;
