import ProductSearchForm from "@/app/components/products/ProductSearchForm";
import ProductTable from "@/app/components/products/ProductTable";
import Heading from "@/app/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string){
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })

    return products
}

export default async function searchPage({searchParams} : {searchParams: {search: string}}) {
    
    const products = await searchProducts(searchParams.search)

    return (
        <>
            <Heading>Resultados de busquedas: {searchParams.search}</Heading>
            <div className="flex flex-col gap-5 lg:flex-row justify-between">
                <ProductSearchForm/>
            </div>

            {products.length ? (
                <ProductTable
                products={products}
            />
            ) : <p className="text-center text-lg">No hay Resultados</p>}
            
        </>
    )
}